import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { UPDATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import UserAboutInput from "./UserAboutInput";
import UserStatusInput from "./UserStatusInput";
import { useWebSocket as useCollaborationWebSocket } from "../Collaboration/hooks/useWebSocket";
import { useCollaborativeUser } from "./hooks/useCollaborativeUser";

export default function User({ id }) {
  // Collaboration hooks
  useCollaborationWebSocket("ws://localhost:1234", "collaboration");
  const { userStatus, setUserStatus } = useCollaborativeUser({ id });

  // Abort controller per mutation endpoint for instant saving
  const abortController = useRef<AbortController>();
  const abortLatestSignal = () =>
    abortController.current && abortController.current.abort();

  // GraphQL query
  const { data: userData, loading: isLoadingUser } = useQuery(GET_USER, {
    variables: { id },
    onCompleted(data) {
      setUserStatus(data.User.status);
    },
  });
  const user = userData?.User;

  useEffect(() => {
    console.log("Apollo cache: ", user?.status);
  }, [user?.status]);

  // GraphQL mutation
  const [updateUser] = useMutation(UPDATE_USER);

  // user.about change handler
  const handleChangeAbout = (value) => {
    abortController.current = new window.AbortController();
    updateUser({
      variables: { about: value },
      context: { fetchOptions: { signal: abortController.current.signal } },
      optimisticResponse: {
        UpdateUser: {
          id,
          about: value,
        },
      },
    });
  };

  // user.status change handler
  const handleChangeStatus = (value) => {
    setUserStatus(value);
  };

  return (
    <div>
      <h1>Collaboration example</h1>
      {isLoadingUser ? (
        "loading..."
      ) : (
        <>
          <UserAboutInput
            value={user.about}
            onChange={abortLatestSignal}
            onChangeEnd={handleChangeAbout}
          />
          <br />
          <br />
          <UserStatusInput value={userStatus} onChange={handleChangeStatus} />
        </>
      )}
    </div>
  );
}
