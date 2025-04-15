import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";
import { EmbedConfigs } from "../../plugins/embeds/auto-embed-plugin";
import { ComponentPickerOption } from "../../plugins/picker/component-picker-option";
export function EmbedsPickerPlugin({ embed }) {
    const embedConfig = EmbedConfigs.find((config) => config.type === embed);
    return new ComponentPickerOption(`Embed ${embedConfig.contentName}`, {
        icon: embedConfig.icon,
        keywords: [...embedConfig.keywords, 'embed'],
        onSelect: (_, editor) => editor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type),
    });
}
//# sourceMappingURL=embeds-picker-plugin.jsx.map