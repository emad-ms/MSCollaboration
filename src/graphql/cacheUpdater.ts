import { ApolloCache } from "@apollo/client";
import { userStatusVar } from "../client";

/**
 * Update user status in cache
 * @param cache current Apollo cache
 * @param userId user Id for the snip
 * @param status user status
 */
export function updateUserStatusInCache(
  cache: ApolloCache<any>,
  userId: number,
  status: string
): void {
  // cache.modify({
  //   id: cache.identify({
  //     id: userId,
  //     __typename: "User",
  //   }),
  //   fields: {
  //     status() {
  //       return status;
  //     },
  //   },
  // });

  // simulating cache modification using reactiveVar since status is not provided by server schema
  userStatusVar(status);
}
