export const CAN_USE_DOM = typeof window !== "undefined" &&
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    typeof window.document.createElement !== "undefined";
export const IS_IOS = CAN_USE_DOM &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    // // @ts-expect-error window.MSStream
    !window.MSStream;
export const IS_MOBILE = CAN_USE_DOM && window.matchMedia("(pointer: coarse)").matches;
//# sourceMappingURL=environment.js.map