import { useMemo, useRef } from 'react';
import { debounce } from 'lodash-es';
export function useDebounce(fn, ms, maxWait) {
    const funcRef = useRef(null);
    funcRef.current = fn;
    return useMemo(() => debounce((...args) => {
        if (funcRef.current) {
            funcRef.current(...args);
        }
    }, ms, { maxWait }), [ms, maxWait]);
}
//# sourceMappingURL=use-debounce.js.map