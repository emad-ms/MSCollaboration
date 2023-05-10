import { useEffect, useCallback } from "react";
import * as Y from "yjs";
import { useSharedType } from "./useSharedType";
import { useForceUpdate } from "@mantine/hooks";

export const useMap = <T extends any = any>(
  name: string
): {
  state: { [x: string]: T };
  get: (name: string) => T | undefined;
  set: (name: string, value: T) => void;
} => {
  const map = useSharedType<Y.Map<T>>(name, Y.Map);

  const forceUpdate = useForceUpdate();
  useEffect(() => {
    map.observe(() => forceUpdate());
  }, []);

  return {
    state: map.toJSON(),
    get: useCallback((name: string) => map.get(name), []),
    set: useCallback((name, value) => map.set(name, value), []),
  };
};
