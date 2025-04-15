'use client';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { useToolbarContext } from '../../../context/toolbar-context';
import { SelectItem } from '../../../../ui/select';
import { EmbedConfigs } from '../../../plugins/embeds/auto-embed-plugin';
export function InsertEmbeds() {
    const { activeEditor } = useToolbarContext();
    return EmbedConfigs.map((embedConfig) => (<SelectItem key={embedConfig.type} value={embedConfig.type} onPointerUp={() => {
            activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type);
        }} className="">
      <div className="flex items-center gap-1">
        {embedConfig.icon}
        <span>{embedConfig.contentName}</span>
      </div>
    </SelectItem>));
}
//# sourceMappingURL=insert-embeds.jsx.map