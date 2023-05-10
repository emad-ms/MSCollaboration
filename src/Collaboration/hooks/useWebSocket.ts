import { useMemo } from "react";
import { WebsocketProvider } from "y-websocket";
import { useDoc } from "./useDoc";
import { useProviders } from "./useProvider";

export const useWebSocket = (url: string, room: string): WebsocketProvider => {
  const doc = useDoc();
  const providers = useProviders();

  const existingProvider = providers.get(WebsocketProvider)?.get(room) as
    | WebsocketProvider
    | undefined;

  const provider = useMemo(
    () => new WebsocketProvider(url, room, doc),
    [doc, room]
  );

  if (existingProvider !== undefined) {
    return existingProvider;
  } else {
    if (!providers.has(WebsocketProvider)) {
      providers.set(WebsocketProvider, new Map());
    }

    providers.get(WebsocketProvider)?.set(room, provider);

    return provider;
  }
};
