import{__rest as e,__assign as t}from"../../../node_modules/tslib/tslib.es6.mjs.js";import*as a from"react";import{Root as s,List as r,Trigger as i,Content as n}from"../../../node_modules/@radix-ui/react-tabs/dist/index.mjs.js";import{cn as o}from"../lib/utils.js";function l(r){var i=r.className,n=e(r,["className"]);return a.createElement(s,t({"data-slot":"tabs",className:o("flex flex-col gap-2",i)},n))}function c(s){var i=s.className,n=e(s,["className"]);return a.createElement(r,t({"data-slot":"tabs-list",className:o("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",i)},n))}function d(s){var r=s.className,n=e(s,["className"]);return a.createElement(i,t({"data-slot":"tabs-trigger",className:o("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",r)},n))}function m(s){var r=s.className,i=e(s,["className"]);return a.createElement(n,t({"data-slot":"tabs-content",className:o("flex-1 outline-none",r)},i))}export{l as Tabs,m as TabsContent,c as TabsList,d as TabsTrigger};
//# sourceMappingURL=tabs.js.map
