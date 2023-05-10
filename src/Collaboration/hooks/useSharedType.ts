import * as Y from "yjs";
import { useDoc } from "./useDoc";

export const useSharedType = <T extends Y.AbstractType<any>>(
  name: string,
  constructor: Function | undefined
): T => {
  const doc = useDoc();
  return doc.get(name, constructor) as T;
};
