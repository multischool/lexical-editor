import { ElementNode, } from 'lexical';
import { IS_CHROME } from '../shared/environment';
import { invariant } from '../shared/invariant';
import { domOnBeforeMatch, setDomHiddenUntilFound } from '../utils/collapsible';
import { $isCollapsibleContainerNode } from '../nodes/collapsible-container-node';
export function $convertCollapsibleContentElement(domNode) {
    const node = $createCollapsibleContentNode();
    return {
        node,
    };
}
export class CollapsibleContentNode extends ElementNode {
    static getType() {
        return 'collapsible-content';
    }
    static clone(node) {
        return new CollapsibleContentNode(node.__key);
    }
    createDOM(config, editor) {
        const dom = document.createElement('div');
        dom.classList.add('pt-0', 'pr-1', 'pb-1', 'pl-4');
        if (IS_CHROME) {
            editor.getEditorState().read(() => {
                const containerNode = this.getParentOrThrow();
                invariant($isCollapsibleContainerNode(containerNode), 'Expected parent node to be a CollapsibleContainerNode');
                if (!containerNode.__open) {
                    setDomHiddenUntilFound(dom);
                }
            });
            domOnBeforeMatch(dom, () => {
                editor.update(() => {
                    const containerNode = this.getParentOrThrow().getLatest();
                    invariant($isCollapsibleContainerNode(containerNode), 'Expected parent node to be a CollapsibleContainerNode');
                    if (!containerNode.__open) {
                        containerNode.toggleOpen();
                    }
                });
            });
        }
        return dom;
    }
    updateDOM(prevNode, dom) {
        return false;
    }
    static importDOM() {
        return {
            div: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-collapsible-content')) {
                    return null;
                }
                return {
                    conversion: $convertCollapsibleContentElement,
                    priority: 2,
                };
            },
        };
    }
    exportDOM() {
        const element = document.createElement('div');
        element.classList.add('pt-0', 'pr-1', 'pb-1', 'pl-4');
        element.setAttribute('data-lexical-collapsible-content', 'true');
        return { element };
    }
    static importJSON(serializedNode) {
        return $createCollapsibleContentNode();
    }
    isShadowRoot() {
        return true;
    }
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { type: 'collapsible-content', version: 1 });
    }
}
export function $createCollapsibleContentNode() {
    return new CollapsibleContentNode();
}
export function $isCollapsibleContentNode(node) {
    return node instanceof CollapsibleContentNode;
}
//# sourceMappingURL=collapsible-content-node.js.map