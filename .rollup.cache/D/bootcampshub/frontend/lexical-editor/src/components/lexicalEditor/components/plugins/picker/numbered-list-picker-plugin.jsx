import { ListOrderedIcon } from "lucide-react";
import { INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { ComponentPickerOption } from "../../plugins/picker/component-picker-option";
export function NumberedListPickerPlugin() {
    return new ComponentPickerOption('Numbered List', {
        icon: <ListOrderedIcon className="size-4"/>,
        keywords: ['numbered list', 'ordered list', 'ol'],
        onSelect: (_, editor) => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
    });
}
//# sourceMappingURL=numbered-list-picker-plugin.jsx.map