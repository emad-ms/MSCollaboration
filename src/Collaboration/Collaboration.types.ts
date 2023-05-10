import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export type Provider = WebsocketProvider;

export interface DocumentProviderProps {
  children: React.ReactNode;
  doc?: Y.Doc;
  folderName?: string;
  documentName?: string;
}
