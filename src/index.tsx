import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import User from "./User/User";
import { CollaborationProvider } from "./Collaboration/Collaboration.provider";
import "./style.css";

const ID = 6272859;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CollaborationProvider>
        <User id={ID} />
      </CollaborationProvider>
    </ApolloProvider>
  </StrictMode>
);
