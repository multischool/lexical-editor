import { ListIcon } from "lucide-react";
import { INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { ComponentPickerOption } from "../../plugins/picker/component-picker-option";
export function BulletedListPickerPlugin() {
    return new ComponentPickerOption('Bulleted List', {
        icon: <ListIcon className="size-4"/>,
        keywords: ['bulleted list', 'unordered list', 'ul'],
        onSelect: (_, editor) => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
    });
}
//# sourceMappingURL=bulleted-list-picker-plugin.jsx.map