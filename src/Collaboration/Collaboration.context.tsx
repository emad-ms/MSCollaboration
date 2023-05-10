import React from 'react';
import * as Y from 'yjs';
import { Provider } from './Collaboration.types';

export const DocumentContext = React.createContext<{
    doc: Y.Doc | null
    providers: Map<new (...args: any[]) => Provider, Map<string, Provider>> | null
  }>({
        doc: null,
        providers: null
      })