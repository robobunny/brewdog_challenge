import { useState, useEffect } from "react";

export default function useDataLoader(loadFn, onError) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      if (!loadFn) return;
      try {
        const result = await loadFn();
        if (!mounted) return;
        setData(result);
        setIsLoading(false);
      } catch (e) {
        onError?.(e);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, [loadFn, onError]);
  return { isLoading, data };
}
