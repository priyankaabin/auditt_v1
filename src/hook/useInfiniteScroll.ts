import { useEffect, useCallback } from 'react';

export function useInfiniteScroll(
  callback: () => void,
  isLoading: boolean,
  hasMore: boolean
) {
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Trigger when user has scrolled to the last 20% of the page
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      callback();
    }
  }, [callback, isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}