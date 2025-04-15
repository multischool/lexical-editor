'use client';
import { Columns3Icon } from 'lucide-react';
import { useToolbarContext } from '../../../context/toolbar-context';
import { SelectItem } from '../../../../ui/select';
import { InsertLayoutDialog } from '../../../plugins/layout-plugin';
export function InsertColumnsLayout() {
    const { activeEditor, showModal } = useToolbarContext();
    return (<SelectItem value="columns" onPointerUp={() => showModal('Insert Columns Layout', (onClose) => (<InsertLayoutDialog activeEditor={activeEditor} onClose={onClose}/>))} className="">
      <div className="flex items-center gap-1">
        <Columns3Icon className="size-4"/>
        <span>Columns Layout</span>
      </div>
    </SelectItem>);
}
//# sourceMappingURL=insert-columns-layout.jsx.map