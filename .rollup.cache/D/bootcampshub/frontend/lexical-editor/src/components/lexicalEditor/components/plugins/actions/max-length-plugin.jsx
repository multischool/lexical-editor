'use client';
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $trimTextContentFromAnchor } from '@lexical/selection';
import { $restoreEditorState } from '@lexical/utils';
import { $getSelection, $isRangeSelection, RootNode, } from 'lexical';
export function MaxLengthPlugin({ maxLength }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        let lastRestoredEditorState = null;
        return editor.registerNodeTransform(RootNode, (rootNode) => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
                return;
            }
            const prevEditorState = editor.getEditorState();
            const prevTextContentSize = prevEditorState.read(() => rootNode.getTextContentSize());
            const textContentSize = rootNode.getTextContentSize();
            if (prevTextContentSize !== textContentSize) {
                const delCount = textContentSize - maxLength;
                const anchor = selection.anchor;
                if (delCount > 0) {
                    // Restore the old editor state instead if the last
                    // text content was already at the limit.
                    if (prevTextContentSize === maxLength &&
                        lastRestoredEditorState !== prevEditorState) {
                        lastRestoredEditorState = prevEditorState;
                        $restoreEditorState(editor, prevEditorState);
                    }
                    else {
                        $trimTextContentFromAnchor(editor, anchor, delCount);
                    }
                }
            }
        });
    }, [editor, maxLength]);
    return null;
}
//# sourceMappingURL=max-length-plugin.jsx.map