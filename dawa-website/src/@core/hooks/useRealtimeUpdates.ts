import { useState, useEffect, useRef, useCallback } from 'react';
import { useMessages } from './useProductData';

const POLLING_INTERVAL = 5000; // 5 seconds

export function useRealtimeUpdates() {
  const { messagesData, mutate, isLoading } = useMessages();
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkForUpdates = useCallback(async () => {
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime >= POLLING_INTERVAL) {
      await mutate();
      setLastUpdateTime(currentTime);
    }
    scheduleNextUpdate();
  }, [lastUpdateTime, mutate]);

  const scheduleNextUpdate = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(checkForUpdates, POLLING_INTERVAL);
  }, [checkForUpdates]);

  useEffect(() => {
    scheduleNextUpdate();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleNextUpdate]);

  return { messagesData, isLoading };
}
