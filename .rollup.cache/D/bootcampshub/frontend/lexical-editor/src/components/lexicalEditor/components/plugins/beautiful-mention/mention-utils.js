import { $createRangeSelection, $getEditor, $getRoot, $getSelection, $isDecoratorNode, $isElementNode, $isRangeSelection, $isTextNode, $nodesOfType, $setSelection, } from "lexical";
import { BeautifulMentionNode } from "./MentionNode";
import { $isZeroWidthNode } from "./ZeroWidthNode";
import { CustomBeautifulMentionNode } from "./createMentionNode";
export const DEFAULT_PUNCTUATION = "\\.,\\*\\?\\$\\|#{}\\(\\)\\^\\[\\]\\\\/!%'\"~=<>_:;";
// Makes it possible to use brackets before the trigger: (@mention)
export const PRE_TRIGGER_CHARS = "\\(";
// Strings that can trigger the mention menu.
export const TRIGGERS = (triggers) => "(?:" + triggers.join("|") + ")";
// Chars we expect to see in a mention (non-space, non-punctuation).
export const VALID_CHARS = (triggers, punctuation) => {
    const lookahead = triggers.length === 0 ? "" : "(?!" + triggers.join("|") + ")";
    return lookahead + "[^\\s" + punctuation + "]";
};
export const LENGTH_LIMIT = 75;
export function isWordChar(char, triggers, punctuation) {
    return new RegExp(VALID_CHARS(triggers, punctuation)).test(char);
}
export function $getSelectionInfo(triggers, punctuation) {
    const selection = $getSelection();
    if (!selection || !$isRangeSelection(selection)) {
        return;
    }
    const anchor = selection.anchor;
    const focus = selection.focus;
    const [node] = selection.getNodes();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (anchor.key !== focus.key || anchor.offset !== focus.offset || !node) {
        return;
    }
    const isTextNode = $isTextNode(node) && node.isSimpleText();
    const type = anchor.type;
    const offset = anchor.offset;
    const textContent = getTextContent(node);
    const cursorAtStartOfNode = offset === 0;
    const cursorAtEndOfNode = textContent.length === offset;
    const charBeforeCursor = textContent.charAt(offset - 1);
    const charAfterCursor = textContent.charAt(offset);
    const wordCharBeforeCursor = isWordChar(charBeforeCursor, triggers, punctuation);
    const wordCharAfterCursor = isWordChar(charAfterCursor, triggers, punctuation);
    const spaceBeforeCursor = /\s/.test(charBeforeCursor);
    const spaceAfterCursor = /\s/.test(charAfterCursor);
    const prevNode = getPreviousSibling(node);
    const nextNode = getNextSibling(node);
    const parentNode = node.getParent();
    const props = {
        node,
        type,
        offset,
        isTextNode,
        textContent,
        selection,
        prevNode,
        nextNode,
        parentNode,
        cursorAtStartOfNode,
        cursorAtEndOfNode,
        wordCharBeforeCursor,
        wordCharAfterCursor,
        spaceBeforeCursor,
        spaceAfterCursor,
    };
    if (isTextNode) {
        return Object.assign(Object.assign({}, props), { isTextNode: true, node });
    }
    else {
        return Object.assign(Object.assign({}, props), { isTextNode: false, node });
    }
}
/**
 * TODO replace with Node#getPreviousSibling after ZeroWidthNode was removed.
 */
export function getNextSibling(node) {
    let nextSibling = node.getNextSibling();
    while (nextSibling !== null && $isZeroWidthNode(nextSibling)) {
        nextSibling = nextSibling.getNextSibling();
    }
    return nextSibling;
}
/**
 * TODO replace with Node#getPreviousSibling after ZeroWidthNode was removed.
 */
export function getPreviousSibling(node) {
    let previousSibling = node.getPreviousSibling();
    while (previousSibling !== null && $isZeroWidthNode(previousSibling)) {
        previousSibling = previousSibling.getPreviousSibling();
    }
    return previousSibling;
}
/**
 * TODO replace with Node#getTextContent after ZeroWidthNode was removed.
 */
export function getTextContent(node) {
    if ($isZeroWidthNode(node)) {
        return "";
    }
    return node.getTextContent();
}
export function getCreatableProp(creatable, trigger) {
    if (typeof creatable === "string" || typeof creatable === "boolean") {
        return creatable;
    }
    if (trigger === null) {
        return false;
    }
    if (typeof creatable === "object") {
        return creatable[trigger];
    }
    return false;
}
export function getMenuItemLimitProp(menuItemLimit, trigger) {
    if (typeof menuItemLimit === "number" || menuItemLimit === false) {
        return menuItemLimit;
    }
    if (typeof menuItemLimit === "undefined") {
        return 5;
    }
    if (trigger === null) {
        return false;
    }
    if (typeof menuItemLimit === "object") {
        return menuItemLimit[trigger];
    }
    return 5;
}
function getLastNode(root) {
    const descendant = root.getLastDescendant();
    if ($isElementNode(descendant) || $isTextNode(descendant)) {
        return descendant;
    }
    if ($isDecoratorNode(descendant)) {
        return descendant.getParent();
    }
    return root;
}
export function $selectEnd() {
    const root = $getRoot();
    const lastNode = getLastNode(root);
    const key = lastNode === null || lastNode === void 0 ? void 0 : lastNode.getKey();
    const offset = $isElementNode(lastNode)
        ? lastNode.getChildrenSize()
        : $isTextNode(lastNode)
            ? getTextContent(lastNode).length
            : 0;
    const type = $isElementNode(lastNode) ? "element" : "text";
    if (key) {
        const newSelection = $createRangeSelection();
        newSelection.anchor.set(key, offset, type);
        newSelection.focus.set(key, offset, type);
        $setSelection(newSelection);
    }
}
export function $findBeautifulMentionNodes(editor) {
    editor = editor !== null && editor !== void 0 ? editor : $getEditor();
    if (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    CustomBeautifulMentionNode &&
        editor.hasNodes([CustomBeautifulMentionNode])) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return $nodesOfType(CustomBeautifulMentionNode);
    }
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return $nodesOfType(BeautifulMentionNode);
}
//# sourceMappingURL=mention-utils.js.map