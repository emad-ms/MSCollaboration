import { useRef, useEffect } from "react";
import * as Y from "yjs";
import { Provider, DocumentProviderProps } from "./Collaboration.types";
import { useDoc } from "./hooks/useDoc";
import { DocumentContext } from "./Collaboration.context";

export const CollaborationProvider = ({
  children,
  doc = new Y.Doc(),
  folderName,
  documentName,
}: DocumentProviderProps): JSX.Element => {
  let superDoc: Y.Doc | null = null;
  try {
    superDoc = useDoc();
  } catch {}

  if (superDoc !== null) {
    superDoc.getMap(folderName ?? "").set(documentName ?? doc.guid, doc);
  }

  const providers = useRef<
    Map<new (...args: any[]) => Provider, Map<string, Provider>>
  >(new Map());

  useEffect(
    () => () => {
      providers.current.forEach((map) => {
        map.forEach((provider) => provider.destroy());
      });
    },
    []
  );

  return (
    <DocumentContext.Provider
      value={{
        doc,
        providers: providers.current,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
