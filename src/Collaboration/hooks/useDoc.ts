import { useContext } from "react";
import * as Y from "yjs";
import { DocumentContext } from "../Collaboration.context";

export const useDoc = (): Y.Doc => {
  const { doc } = useContext(DocumentContext);

  if (doc !== null) {
    return doc;
  } else {
    throw new Error(
      "Could not retrieve a document. Please wrap in a DocumentProvider."
    );
  }
};
