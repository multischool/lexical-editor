import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, AlignLeftIcon } from "lucide-react";
import { ComponentPickerOption } from "../../plugins/picker/component-picker-option";
export function AlignmentPickerPlugin({ alignment }) {
    return new ComponentPickerOption(`Align ${alignment}`, {
        icon: <AlignIcons alignment={alignment}/>,
        keywords: ['align', 'justify', alignment],
        onSelect: (_, editor) => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
    });
}
function AlignIcons({ alignment, }) {
    switch (alignment) {
        case 'left':
            return <AlignLeftIcon className="size-4"/>;
        case 'center':
            return <AlignCenterIcon className="size-4"/>;
        case 'right':
            return <AlignRightIcon className="size-4"/>;
        case 'justify':
            return <AlignJustifyIcon className="size-4"/>;
    }
}
//# sourceMappingURL=alignment-picker-plugin.jsx.map