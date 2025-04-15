"use client";
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import { $isRangeSelection, $isRootOrShadowRoot } from 'lexical';
import { useToolbarContext } from '../../context/toolbar-context';
import { useUpdateToolbarHandler } from '../../editor-hooks/use-update-toolbar';
import { Select, SelectContent, SelectGroup, SelectTrigger, } from '../../../ui/select';
import { blockTypeToBlockName } from '../../plugins/toolbar/block-format/block-format-data';
export function BlockFormatDropDown({ children, }) {
    const { activeEditor, blockType, setBlockType } = useToolbarContext();
    function $updateToolbar(selection) {
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            let element = anchorNode.getKey() === 'root'
                ? anchorNode
                : $findMatchingParent(anchorNode, (e) => {
                    const parent = e.getParent();
                    return parent !== null && $isRootOrShadowRoot(parent);
                });
            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }
            const elementKey = element.getKey();
            const elementDOM = activeEditor.getElementByKey(elementKey);
            if (elementDOM !== null) {
                // setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList
                        ? parentList.getListType()
                        : element.getListType();
                    setBlockType(type);
                }
                else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    if (type in blockTypeToBlockName) {
                        setBlockType(type);
                    }
                }
            }
        }
    }
    useUpdateToolbarHandler($updateToolbar);
    return (<Select value={blockType} onValueChange={(value) => {
            setBlockType(value);
        }}>
      <SelectTrigger className="h-8 w-min gap-1">
        {blockTypeToBlockName[blockType].icon}
        <span>{blockTypeToBlockName[blockType].label}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>);
}
//# sourceMappingURL=block-format-toolbar-plugin.jsx.map