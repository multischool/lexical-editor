import{useLexicalComposerContext as e}from"../../../../../node_modules/@lexical/react/LexicalComposerContext.mjs.js";import{useLexicalNodeSelection as t}from"../../../../../node_modules/@lexical/react/useLexicalNodeSelection.mjs.js";import{mergeRegister as r}from"@lexical/utils";import{$isNodeSelection as n,$getSelection as a,$getNodeByKey as o,$isElementNode as i,$isTextNode as l,$isDecoratorNode as s,$setSelection as c,CLICK_COMMAND as u,COMMAND_PRIORITY_LOW as m,KEY_DELETE_COMMAND as f,KEY_BACKSPACE_COMMAND as d,KEY_ARROW_LEFT_COMMAND as v,KEY_ARROW_RIGHT_COMMAND as p,BLUR_COMMAND as g,SELECTION_CHANGE_COMMAND as N}from"lexical";import{useRef as x,useMemo as j,useCallback as C,useEffect as E}from"react";import{$isBeautifulMentionNode as R}from"./MentionNode.js";import{IS_IOS as S}from"./environment.js";import{getPreviousSibling as F,getNextSibling as b}from"./mention-utils.js";import{useIsFocused as D}from"./useIsFocused.js";function h(h){var y=h.value,K=h.trigger,L=h.data,P=h.className,_=h.classNameFocused,I=h.classNames,M=h.nodeKey,k=h.component,q=e()[0],w=D(),z=t(M),A=z[0],B=z[1],G=z[2],H=x(null),J=K+y,O=j((function(){if(P){var e=[P];return A&&w&&_&&e.push(_),e.join(" ").trim()||void 0}return""}),[A,P,_,w]),Q=C((function(e){if(A&&n(a())){e.preventDefault();var t=o(M);R(t)&&t.remove()}return!1}),[A,M]),T=C((function(e){var t=o(M);if(!(null==t?void 0:t.isSelected()))return!1;var r=!1,n=F(t);return i(n)&&(n.selectEnd(),r=!0),l(n)&&(n.select(),r=!0),s(n)&&(n.selectNext(),r=!0),null===n&&(t.selectPrevious(),r=!0),r&&e.preventDefault(),r}),[M]),U=C((function(e){var t=o(M);if(!(null==t?void 0:t.isSelected()))return!1;var r=!1,n=b(t);return i(n)&&(n.selectStart(),r=!0),l(n)&&(n.select(0,0),r=!0),s(n)&&(n.selectPrevious(),r=!0),null===n&&(t.selectNext(),r=!0),r&&e.preventDefault(),r}),[M]),V=C((function(e){var t;return!(e.target!==H.current&&!(null===(t=H.current)||void 0===t?void 0:t.contains(e.target)))&&(e.shiftKey||G(),B(!0),!0)}),[G,B]),W=C((function(){var e=o(M);if(!(null==e?void 0:e.isSelected()))return!1;var t=a();return!!n(t)&&(c(null),!1)}),[M]),X=C((function(){return!(!S||!A)&&(B(!1),!0)}),[A,B]);return E((function(){var e=r(q.registerCommand(u,V,m),q.registerCommand(f,Q,m),q.registerCommand(d,Q,m),q.registerCommand(v,T,m),q.registerCommand(p,U,m),q.registerCommand(g,W,m),q.registerCommand(N,X,m));return function(){e()}}),[q,T,U,V,Q,W,X]),k?React.createElement(k,{ref:H,trigger:K,value:y,data:L,className:O,"data-beautiful-mention":J},J):I?React.createElement("span",{ref:H,className:A&&I.containerFocused?I.containerFocused:I.container,"data-beautiful-mention":J},React.createElement("span",{className:I.trigger},K),React.createElement("span",{className:I.value},y)):React.createElement("span",{ref:H,className:O,"data-beautiful-mention":J},J)}export{h as default};
//# sourceMappingURL=MentionComponent.js.map
