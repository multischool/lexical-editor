import * as React from 'react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useCollaborationContext } from '@lexical/react/LexicalCollaborationContext';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import { $getNodeByKey, $getSelection, $isNodeSelection, $isRangeSelection, $setSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW, DRAGSTART_COMMAND, KEY_BACKSPACE_COMMAND, KEY_DELETE_COMMAND, KEY_ENTER_COMMAND, KEY_ESCAPE_COMMAND, ParagraphNode, RootNode, SELECTION_CHANGE_COMMAND, TextNode, createCommand, } from 'lexical';
import { $isImageNode } from '../nodes/image-node';
// import brokenImage from '@/registry/default/editor/images/image-broken.svg';
import { ContentEditable } from '../editor-ui/content-editable';
import { ImageResizer } from '../editor-ui/image-resizer';
const imageCache = new Set();
export const RIGHT_CLICK_IMAGE_COMMAND = createCommand('RIGHT_CLICK_IMAGE_COMMAND');
function useSuspenseImage(src) {
    if (!imageCache.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageCache.add(src);
                resolve(null);
            };
            img.onerror = () => {
                imageCache.add(src);
            };
        });
    }
}
function LazyImage({ altText, className, imageRef, src, width, height, maxWidth, onError, }) {
    useSuspenseImage(src);
    return (<img className={className || undefined} src={src} alt={altText} ref={imageRef} style={{
            height,
            maxWidth,
            width,
        }} onError={onError} draggable="false"/>);
}
function BrokenImage() {
    return (<img src={''} style={{
            height: 200,
            opacity: 0.2,
            width: 200,
        }} draggable="false"/>);
}
export default function ImageComponent({ src, altText, nodeKey, width, height, maxWidth, resizable, showCaption, caption, captionsEnabled, }) {
    const imageRef = useRef(null);
    const buttonRef = useRef(null);
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const [isResizing, setIsResizing] = useState(false);
    const { isCollabActive } = useCollaborationContext();
    const [editor] = useLexicalComposerContext();
    const [selection, setSelection] = useState(null);
    const activeEditorRef = useRef(null);
    const [isLoadError, setIsLoadError] = useState(false);
    const isEditable = useLexicalEditable();
    const $onDelete = useCallback((payload) => {
        const deleteSelection = $getSelection();
        if (isSelected && $isNodeSelection(deleteSelection)) {
            const event = payload;
            event.preventDefault();
            editor.update(() => {
                deleteSelection.getNodes().forEach((node) => {
                    if ($isImageNode(node)) {
                        node.remove();
                    }
                });
            });
        }
        return false;
    }, [editor, isSelected]);
    const $onEnter = useCallback((event) => {
        const latestSelection = $getSelection();
        const buttonElem = buttonRef.current;
        if (isSelected &&
            $isNodeSelection(latestSelection) &&
            latestSelection.getNodes().length === 1) {
            if (showCaption) {
                // Move focus into nested editor
                $setSelection(null);
                event.preventDefault();
                caption.focus();
                return true;
            }
            else if (buttonElem !== null &&
                buttonElem !== document.activeElement) {
                event.preventDefault();
                buttonElem.focus();
                return true;
            }
        }
        return false;
    }, [caption, isSelected, showCaption]);
    const $onEscape = useCallback((event) => {
        if (activeEditorRef.current === caption ||
            buttonRef.current === event.target) {
            $setSelection(null);
            editor.update(() => {
                setSelected(true);
                const parentRootElement = editor.getRootElement();
                if (parentRootElement !== null) {
                    parentRootElement.focus();
                }
            });
            return true;
        }
        return false;
    }, [caption, editor, setSelected]);
    const onClick = useCallback((payload) => {
        const event = payload;
        if (isResizing) {
            return true;
        }
        if (event.target === imageRef.current) {
            if (event.shiftKey) {
                setSelected(!isSelected);
            }
            else {
                clearSelection();
                setSelected(true);
            }
            return true;
        }
        return false;
    }, [isResizing, isSelected, setSelected, clearSelection]);
    const onRightClick = useCallback((event) => {
        editor.getEditorState().read(() => {
            const latestSelection = $getSelection();
            const domElement = event.target;
            if (domElement.tagName === 'IMG' &&
                $isRangeSelection(latestSelection) &&
                latestSelection.getNodes().length === 1) {
                editor.dispatchCommand(RIGHT_CLICK_IMAGE_COMMAND, event);
            }
        });
    }, [editor]);
    useEffect(() => {
        let isMounted = true;
        const rootElement = editor.getRootElement();
        const unregister = mergeRegister(editor.registerUpdateListener(({ editorState }) => {
            if (isMounted) {
                setSelection(editorState.read(() => $getSelection()));
            }
        }), editor.registerCommand(SELECTION_CHANGE_COMMAND, (_, activeEditor) => {
            activeEditorRef.current = activeEditor;
            return false;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(CLICK_COMMAND, onClick, COMMAND_PRIORITY_LOW), editor.registerCommand(RIGHT_CLICK_IMAGE_COMMAND, onClick, COMMAND_PRIORITY_LOW), editor.registerCommand(DRAGSTART_COMMAND, (event) => {
            if (event.target === imageRef.current) {
                // TODO This is just a temporary workaround for FF to behave like other browsers.
                // Ideally, this handles drag & drop too (and all browsers).
                event.preventDefault();
                return true;
            }
            return false;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_DELETE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_BACKSPACE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ENTER_COMMAND, $onEnter, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ESCAPE_COMMAND, $onEscape, COMMAND_PRIORITY_LOW));
        rootElement === null || rootElement === void 0 ? void 0 : rootElement.addEventListener('contextmenu', onRightClick);
        return () => {
            isMounted = false;
            unregister();
            rootElement === null || rootElement === void 0 ? void 0 : rootElement.removeEventListener('contextmenu', onRightClick);
        };
    }, [
        clearSelection,
        editor,
        isResizing,
        isSelected,
        nodeKey,
        $onDelete,
        $onEnter,
        $onEscape,
        onClick,
        onRightClick,
        setSelected,
    ]);
    const setShowCaption = () => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isImageNode(node)) {
                node.setShowCaption(true);
            }
        });
    };
    const onResizeEnd = (nextWidth, nextHeight) => {
        // Delay hiding the resize bars for click case
        setTimeout(() => {
            setIsResizing(false);
        }, 200);
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isImageNode(node)) {
                node.setWidthAndHeight(nextWidth, nextHeight);
            }
        });
    };
    const onResizeStart = () => {
        setIsResizing(true);
    };
    const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
    const isFocused = (isSelected || isResizing) && isEditable;
    return (<Suspense fallback={null}>
      <>
        <div draggable={draggable}>
          {isLoadError ? (<BrokenImage />) : (<LazyImage className={`max-w-full cursor-default ${isFocused
                ? `${$isNodeSelection(selection) ? 'draggable cursor-grab active:cursor-grabbing' : ''} focused ring-2 ring-primary ring-offset-2`
                : null}`} src={src} altText={altText} imageRef={imageRef} width={width} height={height} maxWidth={maxWidth} onError={() => setIsLoadError(true)}/>)}
        </div>

        {showCaption && (<div className="image-caption-container absolute bottom-1 left-0 right-0 m-0 block min-w-[100px] overflow-hidden border-t bg-white/90 p-0">
            <LexicalNestedComposer initialEditor={caption} initialNodes={[
                RootNode,
                TextNode,
                ParagraphNode,
            ]}>
              <AutoFocusPlugin />
              <HistoryPlugin />
              <RichTextPlugin contentEditable={<ContentEditable className="ImageNode__contentEditable user-select-text word-break-break-word relative block min-h-5 w-[calc(100%-20px)] cursor-text resize-none whitespace-pre-wrap border-0 p-2.5 text-sm caret-primary outline-none" placeholderClassName="ImageNode__placeholder text-sm text-muted-foreground overflow-hidden absolute top-2.5 left-2.5 pointer-events-none text-ellipsis user-select-none whitespace-nowrap inline-block" placeholder="Enter a caption..."/>} ErrorBoundary={LexicalErrorBoundary}/>
            </LexicalNestedComposer>
          </div>)}
        {resizable && $isNodeSelection(selection) && isFocused && (<ImageResizer showCaption={showCaption} setShowCaption={setShowCaption} editor={editor} buttonRef={buttonRef} imageRef={imageRef} maxWidth={maxWidth} onResizeStart={onResizeStart} onResizeEnd={onResizeEnd} captionsEnabled={!isLoadError && captionsEnabled}/>)}
      </>
    </Suspense>);
}
//# sourceMappingURL=image-component.jsx.map