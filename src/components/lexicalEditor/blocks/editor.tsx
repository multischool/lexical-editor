"use client";

import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, SerializedEditorState } from "lexical";
import { useState, useEffect } from "react";

import { FloatingLinkContext } from "../components/context/floating-link-context";
import { SharedAutocompleteContext } from "../components/context/shared-autocomplete-context";
import { editorTheme } from "../components/themes/editor-theme";
import { TooltipProvider } from "../ui/tooltip";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";
import EditorMethods from "../components/shared/EditorMethods";
import { useTheme } from "next-themes";

// In editor.ts or editor.tsx file
// Add this type declaration at the top of your file, after the imports
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
export interface PluginOptions {
  // Main plugin options
  history?: boolean;
  autoFocus?: boolean;
  richText?: boolean;
  checkList?: boolean;
  horizontalRule?: boolean;
  table?: boolean;
  list?: boolean;
  tabIndentation?: boolean;
  hashtag?: boolean;
  mentions?: boolean;
  draggableBlock?: boolean;
  images?: boolean;
  inlineImage?: boolean;
  excalidraw?: boolean;
  poll?: boolean;
  equations?: boolean;
  autoEmbed?: boolean;
  figma?: boolean;
  twitter?: boolean;
  youtube?: boolean;
  codeHighlight?: boolean;
  markdownShortcut?: boolean;
  autoLink?: boolean;
  link?: boolean;
  componentPicker?: boolean;
  contextMenu?: boolean;
  dragDropPaste?: boolean;
  emojiPicker?: boolean;
  floatingLinkEditor?: boolean;
  floatingTextFormat?: boolean;
  maxIndentLevel?: boolean;
  beautifulMentions?: boolean;
  showToolbar?: boolean;
  showBottomBar?: boolean;

  // Toolbar-specific options
  toolbar?: {
    history?: boolean;
    blockFormat?: boolean;
    codeLanguage?: boolean;
    fontFamily?: boolean;
    fontSize?: boolean;
    fontFormat?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
    };
    subSuper?: boolean;
    link?: boolean;
    clearFormatting?: boolean;
    fontColor?: boolean;
    fontBackground?: boolean;
    elementFormat?: boolean;
    blockInsert?: {
      horizontalRule?: boolean;
      pageBreak?: boolean;
      image?: boolean;
      inlineImage?: boolean;
      collapsible?: boolean;
      excalidraw?: boolean;
      table?: boolean;
      poll?: boolean;
      columnsLayout?: boolean;
      embeds?: boolean;
    };
  };

  // Action bar specific options
  actionBar?: {
    maxLength?: boolean;
    characterLimit?: boolean;
    counter?: boolean;
    speechToText?: boolean;
    shareContent?: boolean;
    markdownToggle?: boolean;
    editModeToggle?: boolean;
    clearEditor?: boolean;
    treeView?: boolean;
  };

  [key: string]: any; // To allow for future extensions
}

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  pluginOptions = {}, // Add the pluginOptions prop with empty default
  maxLength = 5000,
  height = "70vh",
  onMentionSearch,
  onImageUpload,
  onAIGeneration,
  mentionMenu,
  mentionMenuItem,
  theme: initialTheme = "light", // Add theme prop with default value 'light'
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  pluginOptions?: PluginOptions;
  maxLength?: number;
  height?: string;
  showBottomBar?: boolean;
  onMentionSearch?: (trigger: string, query?: string | null) => Promise<any[]>;
  onImageUpload?: (file: File) => Promise<any | { url: string }>;
  onAIGeneration?: (prompt: string, transformType: string) => Promise<{ text: string; success: boolean; error?: string }>;
  mentionMenu?: React.FC<any>;
  mentionMenuItem?: React.FC<any>;
  theme?: "light" | "dark"; // Add theme type definition
}) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(initialTheme);
  const { setTheme } = useTheme();
  useEffect(() => {
    // Add global function for direct theme setting (primary method)
    (window as any).setEditorTheme = (theme: "light" | "dark") => {
      console.log("setEditorTheme called with:", theme);
      setCurrentTheme(theme);
      setTheme(theme);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "THEME_SET_SUCCESS",
            theme: theme,
          })
        );
      }
    };

    // Notify React Native that editor is ready
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "LEXICAL_EDITOR_READY",
        })
      );
    }

    return () => {
      delete (window as any).setEditorTheme;
    };
  }, []);

  // Update theme when prop changes
  useEffect(() => {
    if (initialTheme !== currentTheme) {
      setCurrentTheme(initialTheme);
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  const editorConfig: InitialConfigType = {
    namespace: "Editor",
    theme: {
      ...editorTheme,
      root: currentTheme === "dark" ? "dark" : "light",
    },
    nodes,
    onError: (error: Error) => {
      console.error(error);
    },
  };

  return (
    <div className={`overflow-hidden border shadow flex flex-col bg-background`} style={{ height }}>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {}),
        }}
      >
        <TooltipProvider>
          <EditorMethods serializedEditorState={editorSerializedState} />
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <div className="flex flex-col h-full">
                <Plugins
                  maxLength={maxLength}
                  pluginOptions={pluginOptions}
                  onMentionSearch={onMentionSearch}
                  onImageUpload={onImageUpload}
                  onAIGeneration={onAIGeneration}
                  mentionMenu={mentionMenu}
                  mentionMenuItem={mentionMenuItem}
                />
              </div>

              <OnChangePlugin
                ignoreSelectionChange={true}
                onChange={(editorState) => {
                  onChange?.(editorState);
                  onSerializedChange?.(editorState.toJSON());
                }}
              />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
