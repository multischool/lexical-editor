import{useContext as o,createContext as e}from"react";var t=e({activeEditor:{},$updateToolbar:function(){},blockType:"paragraph",setBlockType:function(){},showModal:function(){}});function r(o){var e=o.activeEditor,r=o.$updateToolbar,a=o.blockType,c=o.setBlockType,l=o.showModal,i=o.children;return React.createElement(t.Provider,{value:{activeEditor:e,$updateToolbar:r,blockType:a,setBlockType:c,showModal:l}},i)}function a(){return o(t)}export{r as ToolbarContext,a as useToolbarContext};
//# sourceMappingURL=toolbar-context.js.map
