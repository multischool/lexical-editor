'use client';
import { ListChecksIcon } from 'lucide-react';
import { useToolbarContext } from '../../../context/toolbar-context';
import { SelectItem } from '../../../../ui/select';
import { InsertPollDialog } from '../../../plugins/poll-plugin';
export function InsertPoll() {
    const { activeEditor, showModal } = useToolbarContext();
    return (<SelectItem value="poll" onPointerUp={() => showModal('Insert Poll', (onClose) => (<InsertPollDialog activeEditor={activeEditor} onClose={onClose}/>))} className="">
      <div className="flex items-center gap-1">
        <ListChecksIcon className="size-4"/>
        <span>Poll</span>
      </div>
    </SelectItem>);
}
//# sourceMappingURL=insert-poll.jsx.map