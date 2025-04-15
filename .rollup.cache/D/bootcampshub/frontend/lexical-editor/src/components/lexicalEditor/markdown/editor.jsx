'use client';
import React, { useEffect } from 'react';
import { LexicalComposer, } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { FloatingLinkContext } from '../components/context/floating-link-context';
import { SharedAutocompleteContext } from '../components/context/shared-autocomplete-context';
import { editorTheme } from '../components/themes/editor-theme';
import { TooltipProvider } from '../ui/tooltip';
import { nodes } from './nodes';
import { Plugins } from './plugins';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { CHECK_LIST, ELEMENT_TRANSFORMERS, MULTILINE_ELEMENT_TRANSFORMERS, TEXT_FORMAT_TRANSFORMERS, TEXT_MATCH_TRANSFORMERS, } from '@lexical/markdown';
import { EMOJI } from '../components/transformers/markdown-emoji-transformer';
import { EQUATION } from '../components/transformers/markdown-equation-transofrmer';
import { HR } from '../components/transformers/markdown-hr-transformer';
import { IMAGE } from '../components/transformers/markdown-image-transformer';
import { TABLE } from '../components/transformers/markdown-table-transformer';
import { TWEET } from '../components/transformers/markdown-tweet-transformer';
import { MENTION_MARKDOWN_TRANSFORMER } from '../components/transformers/markdown-mention-transformer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
const editorConfig = {
    namespace: 'Editor',
    theme: editorTheme,
    nodes,
    onError: (error) => {
        console.error(error);
    },
};
/**
 * LoadMarkdownContent is responsible for converting initial markdown to an editor state.
 * Because this conversion must occur within an active editor update callback,
 * we perform this in a child component that uses the LexicalComposer context.
 */
function LoadMarkdownContent({ initialMarkdown, transformers, }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if (initialMarkdown) {
            editor.update(() => {
                $convertFromMarkdownString(initialMarkdown, transformers);
            });
        }
        // We intentionally run only when the editor and initialMarkdown are set.
    }, []);
    return null;
}
/**
 * MarkdownEditor is the main editor component.
 *
 * It initializes the LexicalComposer, loads the initial markdown content (if provided),
 * and uses the OnChangePlugin to trigger updates. The transformer array is memoized
 * to prevent unnecessary re-renders and state resets.
 */
export function MarkdownEditor({ onChange, onSerializedChange, pluginOptions = {}, maxLength = 5000, height = '70vh', onMentionSearch, onImageUpload, onAIGeneration, mentionMenu, mentionMenuItem, onMarkdownChange, initialMarkdown, }) {
    // Memoize transformers so that their reference does not change on every render.
    const TRANSFORMERS = [
        MENTION_MARKDOWN_TRANSFORMER,
        TABLE,
        HR,
        IMAGE,
        EMOJI,
        EQUATION,
        TWEET,
        CHECK_LIST,
        ...ELEMENT_TRANSFORMERS,
        ...MULTILINE_ELEMENT_TRANSFORMERS,
        ...TEXT_FORMAT_TRANSFORMERS,
        ...TEXT_MATCH_TRANSFORMERS,
    ];
    // If using an externally provided editor state, add it here.
    let editorState = undefined;
    let editorSerializedState = undefined;
    return (<div className="overflow-hidden rounded-lg border bg-background shadow flex flex-col" style={{ height }}>
      <LexicalComposer initialConfig={Object.assign(Object.assign(Object.assign({}, editorConfig), (editorState ? { editorState } : {})), (editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}))}>
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              {initialMarkdown && (<LoadMarkdownContent initialMarkdown={initialMarkdown} transformers={TRANSFORMERS}/>)}
              <div className="flex flex-col h-full">
                <Plugins maxLength={maxLength} pluginOptions={pluginOptions} onMentionSearch={onMentionSearch} onImageUpload={onImageUpload} onAIGeneration={onAIGeneration} mentionMenu={mentionMenu} mentionMenuItem={mentionMenuItem}/>
              </div>
              <OnChangePlugin ignoreSelectionChange={true} onChange={(editorState) => {
            onChange === null || onChange === void 0 ? void 0 : onChange(editorState);
            onSerializedChange === null || onSerializedChange === void 0 ? void 0 : onSerializedChange(editorState.toJSON());
            // Convert to Markdown within a read callback.
            let markdown = '';
            editorState.read(() => {
                markdown = $convertToMarkdownString(TRANSFORMERS);
            });
            onMarkdownChange === null || onMarkdownChange === void 0 ? void 0 : onMarkdownChange(markdown);
        }}/>
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>);
}
//# sourceMappingURL=editor.jsx.map