import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection } from 'lexical';
import { useToolbarContext } from '../../../context/toolbar-context';
import { SelectItem } from '../../../../ui/select';
import { blockTypeToBlockName } from '../../../plugins/toolbar/block-format/block-format-data';
export function FormatHeading({ levels = [] }) {
    const { activeEditor, blockType } = useToolbarContext();
    const formatHeading = (headingSize) => {
        if (blockType !== headingSize) {
            activeEditor.update(() => {
                const selection = $getSelection();
                $setBlocksType(selection, () => $createHeadingNode(headingSize));
            });
        }
    };
    return levels.map((level) => (<SelectItem key={level} value={level} onPointerDown={() => formatHeading(level)}>
      <div className="flex items-center gap-1 font-normal">
        {blockTypeToBlockName[level].icon}
        {blockTypeToBlockName[level].label}
      </div>
    </SelectItem>));
}
//# sourceMappingURL=format-heading.jsx.map