import{__rest as e,__assign as r}from"../../../node_modules/tslib/tslib.es6.mjs.js";import*as l from"react";import{Root as t,Viewport as a,Corner as o,ScrollAreaScrollbar as s,ScrollAreaThumb as n}from"../../../node_modules/@radix-ui/react-scroll-area/dist/index.mjs.js";import{cn as i}from"../lib/utils.js";function c(s){var n=s.className,c=s.children,d=e(s,["className","children"]);return l.createElement(t,r({"data-slot":"scroll-area",className:i("relative",n)},d),l.createElement(a,{"data-slot":"scroll-area-viewport",className:"focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"},c),l.createElement(m,null),l.createElement(o,null))}function m(t){var a=t.className,o=t.orientation,c=void 0===o?"vertical":o,m=e(t,["className","orientation"]);return l.createElement(s,r({"data-slot":"scroll-area-scrollbar",orientation:c,className:i("flex touch-none p-px transition-colors select-none","vertical"===c&&"h-full w-2.5 border-l border-l-transparent","horizontal"===c&&"h-2.5 flex-col border-t border-t-transparent",a)},m),l.createElement(n,{"data-slot":"scroll-area-thumb",className:"bg-border relative flex-1 rounded-full"}))}export{c as ScrollArea,m as ScrollBar};
//# sourceMappingURL=scroll-area.js.map
