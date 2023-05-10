import React from "react";
import { DocumentContext } from "../Collaboration.context";
import { Provider } from "../Collaboration.types";

export const useProviders = (): Map<
  new (...args: any) => Provider,
  Map<string, Provider>
> => {
  const { providers } = React.useContext(DocumentContext);

  if (providers !== null) {
    return providers;
  } else {
    throw new Error(
      "Could not retrieve a set of providers. Please wrap in a DocumentProvider."
    );
  }
};
