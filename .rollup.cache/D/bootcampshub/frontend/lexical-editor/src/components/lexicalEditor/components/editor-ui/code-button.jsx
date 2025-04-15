import * as React from 'react';
import { useState } from 'react';
import { $isCodeNode } from '@lexical/code';
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, } from 'lexical';
import { CircleCheckIcon, CopyIcon } from 'lucide-react';
import { useDebounce } from '../editor-hooks/use-debounce';
export function CopyButton({ editor, getCodeDOMNode }) {
    const [isCopyCompleted, setCopyCompleted] = useState(false);
    const removeSuccessIcon = useDebounce(() => {
        setCopyCompleted(false);
    }, 1000);
    async function handleClick() {
        const codeDOMNode = getCodeDOMNode();
        if (!codeDOMNode) {
            return;
        }
        let content = '';
        editor.update(() => {
            const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
            if ($isCodeNode(codeNode)) {
                content = codeNode.getTextContent();
            }
            const selection = $getSelection();
            $setSelection(selection);
        });
        try {
            await navigator.clipboard.writeText(content);
            setCopyCompleted(true);
            removeSuccessIcon();
        }
        catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
    return (<button className="flex shrink-0 cursor-pointer items-center rounded border border-transparent bg-none p-1 uppercase text-foreground/50" onClick={handleClick} aria-label="copy">
      {isCopyCompleted ? (<CircleCheckIcon className="size-4"/>) : (<CopyIcon className="size-4"/>)}
    </button>);
}
//# sourceMappingURL=code-button.jsx.map