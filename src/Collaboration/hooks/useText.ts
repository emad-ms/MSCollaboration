import * as Y from "yjs";
import { useSharedType } from "./useSharedType";

export const useText = (name: string): Y.Text =>
  useSharedType<Y.Text>(name, Y.Text);
