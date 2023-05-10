import { useEffect } from "react";
import { useMap as useCollaborativeMap } from "../../Collaboration/hooks/useMap";
import { updateUserStatusInCache } from "../../graphql/cacheUpdater";
import { useApolloClient } from "@apollo/client";
import { usePrevious } from "../../hooks/usePrevious";

const __typename = "User";
const STATUS = "status";

export const useCollaborativeUser = ({
  id,
}: {
  id: number;
}): {
  setUserStatus: (value: string) => void;
  userStatus: string;
} => {
  const key = `${__typename}__${id}`;
  const { set: setUser, state } = useCollaborativeMap(key);
  const previousState = usePrevious(state);

  const { cache } = useApolloClient();

  // Sync collaborative field in Apollo cache
  useEffect(() => {
    if (state?.status !== previousState?.status) {
      updateUserStatusInCache(cache, id, state.status);
    }
  }, [state?.status, previousState?.status, id, cache]);

  return {
    setUserStatus: (value: string) => setUser(STATUS, value),
    userStatus: state.status,
  };
};
