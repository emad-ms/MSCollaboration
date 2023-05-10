import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// fake field on user on client schema (we don't need this on prod app)
export const userStatusVar = makeVar("active");

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        status: {
          read() {
            return userStatusVar();
          },
        },
      },
    },
  },
});

// Follow this link to get your access token:
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/oauth/implicit-grant
// use this link to grab accessToken: https://anilist.co/api/v2/oauth/authorize?client_id=12571&response_type=token

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMxMDk1YjhkNmNmMzM2NDkzZjZjM2I3ZTViMzRiMDFmZTlmNjkxMjliYTEwODkwODhkNWQ2Mjk2M2YwZWE1MDA0MjQyMDkzZWRmNjUxNmI3In0.eyJhdWQiOiIxMjU3MSIsImp0aSI6IjMxMDk1YjhkNmNmMzM2NDkzZjZjM2I3ZTViMzRiMDFmZTlmNjkxMjliYTEwODkwODhkNWQ2Mjk2M2YwZWE1MDA0MjQyMDkzZWRmNjUxNmI3IiwiaWF0IjoxNjgzNjU3OTE2LCJuYmYiOjE2ODM2NTc5MTYsImV4cCI6MTcxNTI4MDMxNiwic3ViIjoiNjI3Mjg1OSIsInNjb3BlcyI6W119.so6XUrTZAndlhLg1uCuYpN6Uhz0H5_5cI-2aVjmcWCSf-coI_JHRlDgw5TGUYbiIdO5swD61e5Zykz5M-7rKUce-NBQ6Ql30rNH6sebNeqcb18CkYNPoyB2UqilvyRhhivsGRuXqmfWWYIQ2Rm3tzVZvvA7jYVDTgGoPYKXAhiosRh8HgyffNjG3g33Ex1YmSAtDsmhsKjZFhyYgkw7908bHKngw0H8ChbBTfcnveN9YYKtgpqDDHDawNIIr6Yow4qePFx7pakAJdf_pPUoMtUn_YP1L3B9K08wRmYXge-0bjO_KyXqB7vrMoOoBE7ySUzOpW85eFzCM5fFmOpUwqVompfWwzii1BhSzuM5zR9bOKgOr6mSz5tEDxY0u0h6Hwk7AhQLrHBkhsWLskHJv__gf64oktil0eBcNnDCsd6VGBloz9NpwfoWb1t_qd45MOLc8ZpVZlNhj5xZVKncoJRzZ6qwYX6RU1MGzfuAHCrAMvINlGQimssX6MmuuQLuAviRVAcmSP6paKsImR7MB0nuetIM6rc8ospgZjs74UzlxyiZvaqccSAIK0sLZ5m87pqhMeDSkwWFC8gys1MYWhwBzw8WyAxIItPqlW_4aXsgV7jdcwP2O6y9PVCcm292Qbm8v9kOjfl-LE1zPAe7v500v-7MlJCArUoREzG2roRc";

const httpLink = createHttpLink({
  uri: "https://graphql.anilist.co",
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  };
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});
