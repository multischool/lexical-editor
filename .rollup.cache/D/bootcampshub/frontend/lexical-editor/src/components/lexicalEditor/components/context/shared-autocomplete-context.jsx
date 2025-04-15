import * as React from 'react';
import { createContext, useContext, useEffect, useMemo, useState, } from 'react';
const Context = createContext([
    (_cb) => () => {
        return;
    },
    (_newSuggestion) => {
        return;
    },
]);
export function SharedAutocompleteContext({ children, }) {
    const context = useMemo(() => {
        let suggestion = null;
        const listeners = new Set();
        return [
            (cb) => {
                cb(suggestion);
                listeners.add(cb);
                return () => {
                    listeners.delete(cb);
                };
            },
            (newSuggestion) => {
                suggestion = newSuggestion;
                for (const listener of Array.from(listeners)) {
                    listener(newSuggestion);
                }
            },
        ];
    }, []);
    return <Context.Provider value={context}>{children}</Context.Provider>;
}
export const useSharedAutocompleteContext = () => {
    const [subscribe, publish] = useContext(Context);
    const [suggestion, setSuggestion] = useState(null);
    useEffect(() => {
        return subscribe((newSuggestion) => {
            setSuggestion(newSuggestion);
        });
    }, [subscribe]);
    return [suggestion, publish];
};
//# sourceMappingURL=shared-autocomplete-context.jsx.map