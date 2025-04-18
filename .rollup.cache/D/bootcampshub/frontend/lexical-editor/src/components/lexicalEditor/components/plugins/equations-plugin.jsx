'use client';
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect } from 'react';
import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement } from '@lexical/utils';
import 'katex/dist/katex.css';
import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot, COMMAND_PRIORITY_EDITOR, createCommand, } from 'lexical';
import { $createEquationNode, EquationNode } from '../nodes/equation-node';
import KatexEquationAlterer from '../editor-ui/katex-equation-alterer';
export const INSERT_EQUATION_COMMAND = createCommand('INSERT_EQUATION_COMMAND');
export function InsertEquationDialog({ activeEditor, onClose, }) {
    const onEquationConfirm = useCallback((equation, inline) => {
        activeEditor.dispatchCommand(INSERT_EQUATION_COMMAND, {
            equation,
            inline,
        });
        onClose();
    }, [activeEditor, onClose]);
    return <KatexEquationAlterer onConfirm={onEquationConfirm}/>;
}
export function EquationsPlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if (!editor.hasNodes([EquationNode])) {
            throw new Error('EquationsPlugins: EquationsNode not registered on editor');
        }
        return editor.registerCommand(INSERT_EQUATION_COMMAND, (payload) => {
            const { equation, inline } = payload;
            const equationNode = $createEquationNode(equation, inline);
            $insertNodes([equationNode]);
            if ($isRootOrShadowRoot(equationNode.getParentOrThrow())) {
                $wrapNodeInElement(equationNode, $createParagraphNode).selectEnd();
            }
            return true;
        }, COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}
//# sourceMappingURL=equations-plugin.jsx.map