'use client';
import { useState } from 'react';
import { Editor } from '@/components/lexicalEditor/blocks/editor';
import axios from 'axios';
import { MentionMenu, MentionMenuItem } from '@/components/lexicalEditor/components/editor-ui/MentionMenu';
// Default value for the editor
const initialValue = {
    root: {
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Hello, welcome to the powerful editor!',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
            },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
    },
};
export default function MinimalEditor() {
    const [editorState, setEditorState] = useState(initialValue);
    // Define a minimal set of toolbar options
    const pluginOptions = {
        // Enable only essential features
        history: true,
        autoFocus: true,
        richText: true,
        list: true,
        link: true,
        autoLink: true,
        // Disable features we don't need
        checkList: true,
        horizontalRule: true,
        table: true,
        excalidraw: true,
        poll: true,
        equations: true,
        autoEmbed: true,
        figma: true,
        twitter: true,
        youtube: true,
        draggableBlock: true,
        // Show toolbar but customize which buttons appear
        showToolbar: true,
        showBottomBar: true,
        // Toolbar controls - only show basic formatting
        toolbar: {
            history: true,
            blockFormat: true,
            fontFamily: true, // Hide font family dropdown
            fontSize: true, // Hide font size dropdown
            // Only allow basic text formatting
            fontFormat: {
                bold: true,
                italic: true,
                underline: true, // Hide underline button
                strikethrough: true // Hide strikethrough button
            },
            // Disable these buttons
            subSuper: true,
            clearFormatting: true,
            fontColor: true,
            fontBackground: true,
            elementFormat: true,
            // Only allow inserting basic elements
            blockInsert: {
                horizontalRule: true,
                pageBreak: true,
                image: true, // Allow images
                inlineImage: true,
                collapsible: true,
                excalidraw: true,
                table: true,
                poll: true,
                columnsLayout: true,
                embeds: true
            }
        },
        // Minimal bottom bar
        actionBar: {
            maxLength: true,
            characterLimit: true,
            counter: true,
            speechToText: true,
            shareContent: true,
            markdownToggle: true,
            editModeToggle: true,
            clearEditor: true,
            treeView: true
        }
    };
    // Custom image upload handler
    const handleImageUpload = async (file) => {
        console.log(`Uploading image: ${file.name}`);
        // Demo implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    url: URL.createObjectURL(file)
                });
            }, 1000);
        });
    };
    // Handle AI text generation
    const handleAIGeneration = async (prompt, transformType) => {
        console.log(`AI Generation request: ${transformType}, prompt: ${prompt}`);
        // Example implementation - replace with your actual API call
        try {
            const response = await axios.post('https://staging-api.bootcampshub.ai/api/organization/integration/generate-text', { prompt }, {
                headers: {
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVmNjc2NjY5ZWFmNjM3MGMxMTQyOWMiLCJlbWFpbCI6IjE4Nm1kc2hpbXVsQGdtYWlsLmNvbSIsImJyYW5jaCI6IjY0ZmNiNGU4OTQ0Y2YyMTVkOGQzMmY5NSIsIm9yZ2FuaXphdGlvbiI6IjY0ZmNiMmU2MGQyZjg3N2FhY2NiM2IyNiIsInNvdXJjZSI6ImJyYW5jaCIsImZpcnN0TmFtZSI6IkFzaHJhZnVsIiwibGFzdE5hbWUiOiJJc2xhbSIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly90czR1cG9ydGFsLWFsbC1maWxlcy11cGxvYWQubnljMy5kaWdpdGFsb2NlYW5zcGFjZXMuY29tLzE3MTkzODA2Nzg2MTEtU2NyZWVuc2hvdC0yMDI0IiwiaWF0IjoxNzQ0MDU1MzI4LCJleHAiOjE3NDQ2NjAxMjh9.8T76uwuBuKr_qOCnKAe0b-npvE44RxlvlIbkSVKYxRI',
                    'branch': '64fcb4e8944cf215d8d32f95'
                }
            });
            const data = await response.data;
            if (data.success) {
                return { text: data.text, success: true };
            }
            else {
                console.error('AI generation failed:', data.error);
                return { text: '', success: false, error: data.error };
            }
        }
        catch (error) {
            console.error('Error calling AI generation API:', error);
            return { text: '', success: false, error: 'Failed to connect to AI service' };
        }
    };
    // Custom mention search handler
    const handleMentionSearch = async (trigger, query) => {
        console.log(`Searching for mentions with trigger: ${trigger}, query: ${query}`);
        // You can customize this to fetch from your own API
        const searchQuery = query || '';
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?trigger=${trigger}&query=${searchQuery}`);
        const data = await response.json();
        return data === null || data === void 0 ? void 0 : data.map((x) => ({
            value: x === null || x === void 0 ? void 0 : x.name,
            id: x === null || x === void 0 ? void 0 : x.id,
            avatar: (x === null || x === void 0 ? void 0 : x.avatar) || `https://placehold.co/400`,
        }));
    };
    return (<div className="flex flex-col h-screen">
      <div className="flex-1">
        <Editor onChange={(value) => {
            // Handle changes
        }} height="100%" editorSerializedState={editorState} onSerializedChange={(value) => setEditorState(value)} pluginOptions={pluginOptions} maxLength={50000} onImageUpload={handleImageUpload} onAIGeneration={handleAIGeneration} onMentionSearch={handleMentionSearch} mentionMenu={MentionMenu} mentionMenuItem={MentionMenuItem}/>
      </div>
    </div>);
}
//# sourceMappingURL=page.jsx.map