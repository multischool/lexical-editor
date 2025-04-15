import { JSX } from 'react';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import type { EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
export type SerializedFigmaNode = Spread<{
    documentID: string;
}, SerializedDecoratorBlockNode>;
export declare class FigmaNode extends DecoratorBlockNode {
    __id: string;
    static getType(): string;
    static clone(node: FigmaNode): FigmaNode;
    static importJSON(serializedNode: SerializedFigmaNode): FigmaNode;
    exportJSON(): SerializedFigmaNode;
    constructor(id: string, format?: ElementFormatType, key?: NodeKey);
    updateDOM(): false;
    getId(): string;
    getTextContent(_includeInert?: boolean | undefined, _includeDirectionless?: false | undefined): string;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
}
export declare function $createFigmaNode(documentID: string): FigmaNode;
export declare function $isFigmaNode(node: FigmaNode | LexicalNode | null | undefined): node is FigmaNode;
