'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

// ----------------------------------------------------------------------

/**
 * 自增 ID Hook
 * 使用 localStorage 来持久化存储当前的 ID 计数器
 * 每次调用 getNextId 时，ID 会自动增加 1
 */
export function useAutoIncrementId(storageKey: string = 'autoIncrementId', initialId: number = 1) {
  const localStorage = useLocalStorage(storageKey, { currentId: initialId });

  const getNextId = useCallback(() => {
    const currentId = localStorage.state.currentId;
    const nextId = currentId + 1;
    
    // 更新存储的 ID
    localStorage.update('currentId', nextId);
    
    // 返回当前使用的 ID
    return currentId;
  }, [localStorage]);

  const getCurrentId = useCallback(() => {
    return localStorage.state.currentId;
  }, [localStorage.state.currentId]);

  const resetId = useCallback((newId: number = initialId) => {
    localStorage.update('currentId', newId);
  }, [localStorage, initialId]);

  return {
    getNextId,
    getCurrentId,
    resetId,
  };
}
