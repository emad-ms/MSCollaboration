import { useEffect, useCallback } from "react";
import * as Y from "yjs";
import { useSharedType } from "./useSharedType";
import { useForceUpdate } from "@mantine/hooks";

export const useArray = <T extends any = any>(
  name: string
): {
  state: T[];
  get: (index: number) => T | undefined;
  insert: (index: number, content: T[]) => void;
  delete: (index: number, length: number) => void;
  push: (content: T[]) => void;
  unshift: (content: T[]) => void;
  slice: (start: number, end?: number) => void;
} => {
  const array = useSharedType<Y.Array<T>>(name, Y.Array);

  const forceUpdate = useForceUpdate();
  useEffect(() => {
    array.observe(() => forceUpdate());
  }, []);

  return {
    state: array.toJSON(),
    get: useCallback((index) => array.get(index), []),
    insert: useCallback((index, content) => array.insert(index, content), []),
    delete: useCallback((index, length) => array.delete(index, length), []),
    push: useCallback((content) => array.push(content), []),
    unshift: useCallback((content) => array.unshift(content), []),
    slice: useCallback((start, end) => array.slice(start, end), []),
  };
};
