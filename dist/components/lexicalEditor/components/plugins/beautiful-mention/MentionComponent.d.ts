import { NodeKey } from "lexical";
import { ElementType } from "react";
import { BeautifulMentionsItemData, BeautifulMentionComponentProps as CustomBeautifulMentionComponentProps } from "./BeautifulMentionsPluginProps";
import { BeautifulMentionsCssClassNames } from "./theme";
interface BeautifulMentionComponentProps {
    nodeKey: NodeKey;
    trigger: string;
    value: string;
    data?: Record<string, BeautifulMentionsItemData>;
    component?: ElementType<CustomBeautifulMentionComponentProps> | null;
    className?: string;
    classNameFocused?: string;
    classNames?: BeautifulMentionsCssClassNames;
}
export default function BeautifulMentionComponent(props: BeautifulMentionComponentProps): import("react").JSX.Element;
export {};
