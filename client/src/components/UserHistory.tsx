// src/components/UserHistory.tsx
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props {
  addressContract: string;
  currentAccount: string | undefined;
  mintTo: string | undefined;
  // onUserHistory: Dispatch<SetStateAction<UserHistory[] | undefined>>;
}

declare let window: any;

export default function UserHistory(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const mintTo = props.mintTo;
  const [userHistory, setUserHistory] = useState<
    Array<UserHistory> | undefined
  >();

  const getUserHistory = useCallback(
    (window: any) => {
      if (!window.ethereum) return;

      fetch(
        `http://localhost:3001/wallet/history?wallet_address=${currentAccount}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUserHistory(res);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    },

    [currentAccount]
  );

  useEffect(() => {
    if (!window.ethereum) return;
    if (!currentAccount) return;
    getUserHistory(window);
  }, [currentAccount, getUserHistory, mintTo]);

  return (
    <div>
      {userHistory
        ? userHistory.map((elem) => (
            // eslint-disable-next-line react/jsx-key
            <p style={{ marginLeft: "50px" }}>
              At {elem.timestamp}: Event: {elem.event},
              {elem.extraInfo
                ? "To: " +
                  elem.extraInfo?.to +
                  " Amount: " +
                  elem.extraInfo.amount
                : ""}
            </p>
          ))
        : ""}
    </div>
  );
}
