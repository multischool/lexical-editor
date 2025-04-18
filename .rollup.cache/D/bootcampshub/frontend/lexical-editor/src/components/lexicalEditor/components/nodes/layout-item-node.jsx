import { addClassNamesToElement } from '@lexical/utils';
import { ElementNode } from 'lexical';
export class LayoutItemNode extends ElementNode {
    static getType() {
        return 'layout-item';
    }
    static clone(node) {
        return new LayoutItemNode(node.__key);
    }
    createDOM(config) {
        const dom = document.createElement('div');
        if (typeof config.theme.layoutItem === 'string') {
            addClassNamesToElement(dom, config.theme.layoutItem);
        }
        return dom;
    }
    updateDOM() {
        return false;
    }
    static importDOM() {
        return {};
    }
    static importJSON() {
        return $createLayoutItemNode();
    }
    isShadowRoot() {
        return true;
    }
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { type: 'layout-item', version: 1 });
    }
}
export function $createLayoutItemNode() {
    return new LayoutItemNode();
}
export function $isLayoutItemNode(node) {
    return node instanceof LayoutItemNode;
}
//# sourceMappingURL=layout-item-node.jsx.map