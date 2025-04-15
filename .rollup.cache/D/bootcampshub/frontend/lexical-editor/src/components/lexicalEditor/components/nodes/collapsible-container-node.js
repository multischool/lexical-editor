import { ElementNode, isHTMLElement, } from 'lexical';
import { IS_CHROME } from '../shared/environment';
import { invariant } from '../shared/invariant';
import { setDomHiddenUntilFound } from '../utils/collapsible';
export function $convertDetailsElement(domNode) {
    const isOpen = domNode.open !== undefined ? domNode.open : true;
    const node = $createCollapsibleContainerNode(isOpen);
    return {
        node,
    };
}
export class CollapsibleContainerNode extends ElementNode {
    constructor(open, key) {
        super(key);
        this.__open = open;
    }
    static getType() {
        return 'collapsible-container';
    }
    static clone(node) {
        return new CollapsibleContainerNode(node.__open, node.__key);
    }
    createDOM(config, editor) {
        // details is not well supported in Chrome #5582
        let dom;
        if (IS_CHROME) {
            dom = document.createElement('div');
            dom.setAttribute('open', '');
        }
        else {
            const detailsDom = document.createElement('details');
            detailsDom.open = this.__open;
            detailsDom.addEventListener('toggle', () => {
                const open = editor.getEditorState().read(() => this.getOpen());
                if (open !== detailsDom.open) {
                    editor.update(() => this.toggleOpen());
                }
            });
            dom = detailsDom;
        }
        dom.classList.add('Collapsible__container');
        return dom;
    }
    updateDOM(prevNode, dom) {
        const currentOpen = this.__open;
        if (prevNode.__open !== currentOpen) {
            // details is not well supported in Chrome #5582
            if (IS_CHROME) {
                const contentDom = dom.children[1];
                invariant(isHTMLElement(contentDom), 'Expected contentDom to be an HTMLElement');
                if (currentOpen) {
                    dom.setAttribute('open', '');
                    contentDom.hidden = false;
                }
                else {
                    dom.removeAttribute('open');
                    setDomHiddenUntilFound(contentDom);
                }
            }
            else {
                dom.open = this.__open;
            }
        }
        return false;
    }
    static importDOM() {
        return {
            details: (domNode) => {
                return {
                    conversion: $convertDetailsElement,
                    priority: 1,
                };
            },
        };
    }
    static importJSON(serializedNode) {
        const node = $createCollapsibleContainerNode(serializedNode.open);
        return node;
    }
    exportDOM() {
        const element = document.createElement('details');
        element.classList.add('Collapsible__container');
        element.setAttribute('open', this.__open.toString());
        return { element };
    }
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { open: this.__open, type: 'collapsible-container', version: 1 });
    }
    setOpen(open) {
        const writable = this.getWritable();
        writable.__open = open;
    }
    getOpen() {
        return this.getLatest().__open;
    }
    toggleOpen() {
        this.setOpen(!this.getOpen());
    }
}
export function $createCollapsibleContainerNode(isOpen) {
    return new CollapsibleContainerNode(isOpen);
}
export function $isCollapsibleContainerNode(node) {
    return node instanceof CollapsibleContainerNode;
}
//# sourceMappingURL=collapsible-container-node.js.map