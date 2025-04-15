'use client';
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, REDO_COMMAND, UNDO_COMMAND, createCommand, } from 'lexical';
import { MicIcon } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';
import { useReport } from '../../editor-hooks/use-report';
import { CAN_USE_DOM } from '../../shared/can-use-dom';
export const SPEECH_TO_TEXT_COMMAND = createCommand('SPEECH_TO_TEXT_COMMAND');
const VOICE_COMMANDS = {
    '\n': ({ selection }) => {
        selection.insertParagraph();
    },
    redo: ({ editor }) => {
        editor.dispatchCommand(REDO_COMMAND, undefined);
    },
    undo: ({ editor }) => {
        editor.dispatchCommand(UNDO_COMMAND, undefined);
    },
};
export const SUPPORT_SPEECH_RECOGNITION = CAN_USE_DOM &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
function SpeechToTextPluginImpl() {
    const [editor] = useLexicalComposerContext();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSpeechToText, setIsSpeechToText] = useState(false);
    const SpeechRecognition = CAN_USE_DOM &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);
    const recognition = useRef(null);
    const report = useReport();
    useEffect(() => {
        if (isEnabled && recognition.current === null) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.addEventListener('result', (event) => {
                const resultItem = event.results.item(event.resultIndex);
                const { transcript } = resultItem.item(0);
                report(transcript);
                if (!resultItem.isFinal) {
                    return;
                }
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const command = VOICE_COMMANDS[transcript.toLowerCase().trim()];
                        if (command) {
                            command({
                                editor,
                                selection,
                            });
                        }
                        else if (transcript.match(/\s*\n\s*/)) {
                            selection.insertParagraph();
                        }
                        else {
                            selection.insertText(transcript);
                        }
                    }
                });
            });
        }
        if (recognition.current) {
            if (isEnabled) {
                recognition.current.start();
            }
            else {
                recognition.current.stop();
            }
        }
        return () => {
            if (recognition.current !== null) {
                recognition.current.stop();
            }
        };
    }, [SpeechRecognition, editor, isEnabled, report]);
    useEffect(() => {
        return editor.registerCommand(SPEECH_TO_TEXT_COMMAND, (_isEnabled) => {
            setIsEnabled(_isEnabled);
            return true;
        }, COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return (<Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={() => {
            editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
            setIsSpeechToText(!isSpeechToText);
        }} variant={isSpeechToText ? 'secondary' : 'ghost'} title='Speech To Text' aria-label={`${isSpeechToText ? 'Enable' : 'Disable'} speech to text`} className='p-2' size={'sm'}>
                    <MicIcon className='size-4'/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>Speech To Text</TooltipContent>
        </Tooltip>);
}
export const SpeechToTextPlugin = SUPPORT_SPEECH_RECOGNITION
    ? SpeechToTextPluginImpl
    : () => null;
//# sourceMappingURL=speech-to-text-plugin.jsx.map