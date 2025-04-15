import { $applyNodeReplacement, TextNode, } from "lexical";
import { ZERO_WIDTH_CHARACTER } from "./ZeroWidthPlugin";
function convertZeroWidthElement(domNode) {
    return null;
}
/**
 * @deprecated Use `PlaceholderNode` instead. This Node will be removed in a future version.
 */
/* eslint @typescript-eslint/no-unused-vars: "off" */
/* eslint @typescript-eslint/no-deprecated: "off" */
export class ZeroWidthNode extends TextNode {
    static getType() {
        return "zeroWidth";
    }
    static clone(node) {
        return new ZeroWidthNode(node.__textContent, node.__key);
    }
    static importJSON(_) {
        return $createZeroWidthNode();
    }
    constructor(__textContent, key) {
        super(ZERO_WIDTH_CHARACTER, key);
        this.__textContent = __textContent;
    }
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { text: "", type: "zeroWidth" });
    }
    updateDOM() {
        return false;
    }
    static importDOM() {
        return null;
    }
    exportDOM(editor) {
        return { element: null };
    }
    isTextEntity() {
        return true;
    }
    getTextContent() {
        return this.__textContent;
    }
}
export function $createZeroWidthNode(textContent = "") {
    const zeroWidthNode = new ZeroWidthNode(textContent);
    // Prevents that a space that is inserted by the user is deleted again
    // directly after the input.
    zeroWidthNode.setMode("segmented");
    return $applyNodeReplacement(zeroWidthNode);
}
export function $isZeroWidthNode(node) {
    return node instanceof ZeroWidthNode;
}
//# sourceMappingURL=ZeroWidthNode.js.map