import React, { useState, useEffect } from "react";

export default function useDataLoader(loadFn, onError) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(async function loadData() {
        let mounted = true;
        if (!loadFn) return;
        try {
            const result = await loadFn();
            if (!mounted) return;
            setData(result);
            setIsLoading(false);
        } catch (e) {
            onError?.(e);
        }
        return () => {
            mounted = false;
        };
    }, []);
    return { isLoading, data };
}
