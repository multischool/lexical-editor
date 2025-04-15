import * as React from 'react';
import { Suspense } from 'react';
import { DecoratorNode } from 'lexical';
const ExcalidrawComponent = React.lazy(() => import('../editor-ui/excalidraw-component'));
function $convertExcalidrawElement(domNode) {
    const excalidrawData = domNode.getAttribute('data-lexical-excalidraw-json');
    const styleAttributes = window.getComputedStyle(domNode);
    const heightStr = styleAttributes.getPropertyValue('height');
    const widthStr = styleAttributes.getPropertyValue('width');
    const height = !heightStr || heightStr === 'inherit' ? 'inherit' : parseInt(heightStr, 10);
    const width = !widthStr || widthStr === 'inherit' ? 'inherit' : parseInt(widthStr, 10);
    if (excalidrawData) {
        const node = $createExcalidrawNode(excalidrawData, width, height);
        return {
            node,
        };
    }
    return null;
}
export class ExcalidrawNode extends DecoratorNode {
    static getType() {
        return 'excalidraw';
    }
    static clone(node) {
        return new ExcalidrawNode(node.__data, node.__width, node.__height, node.__key);
    }
    static importJSON(serializedNode) {
        var _a, _b;
        return new ExcalidrawNode(serializedNode.data, (_a = serializedNode.width) !== null && _a !== void 0 ? _a : 'inherit', (_b = serializedNode.height) !== null && _b !== void 0 ? _b : 'inherit');
    }
    exportJSON() {
        return {
            data: this.__data,
            height: this.__height === 'inherit' ? undefined : this.__height,
            type: 'excalidraw',
            version: 1,
            width: this.__width === 'inherit' ? undefined : this.__width,
        };
    }
    constructor(data = '[]', width = 'inherit', height = 'inherit', key) {
        super(key);
        this.__data = data;
        this.__width = width;
        this.__height = height;
    }
    // View
    createDOM(config) {
        const span = document.createElement('span');
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }
    updateDOM() {
        return false;
    }
    static importDOM() {
        return {
            span: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-excalidraw-json')) {
                    return null;
                }
                return {
                    conversion: $convertExcalidrawElement,
                    priority: 1,
                };
            },
        };
    }
    exportDOM(editor) {
        const element = document.createElement('span');
        element.style.display = 'inline-block';
        const content = editor.getElementByKey(this.getKey());
        if (content !== null) {
            const svg = content.querySelector('svg');
            if (svg !== null) {
                element.innerHTML = svg.outerHTML;
            }
        }
        element.style.width =
            this.__width === 'inherit' ? 'inherit' : `${this.__width}px`;
        element.style.height =
            this.__height === 'inherit' ? 'inherit' : `${this.__height}px`;
        element.setAttribute('data-lexical-excalidraw-json', this.__data);
        return { element };
    }
    setData(data) {
        const self = this.getWritable();
        self.__data = data;
    }
    getWidth() {
        return this.getLatest().__width;
    }
    setWidth(width) {
        const self = this.getWritable();
        self.__width = width;
    }
    getHeight() {
        return this.getLatest().__height;
    }
    setHeight(height) {
        const self = this.getWritable();
        self.__height = height;
    }
    decorate(editor, config) {
        return (<Suspense fallback={null}>
        <ExcalidrawComponent nodeKey={this.getKey()} data={this.__data} width={this.__width} height={this.__height}/>
      </Suspense>);
    }
}
export function $createExcalidrawNode(data = '[]', width = 'inherit', height = 'inherit') {
    return new ExcalidrawNode(data, width, height);
}
export function $isExcalidrawNode(node) {
    return node instanceof ExcalidrawNode;
}
//# sourceMappingURL=excalidraw-node.jsx.map