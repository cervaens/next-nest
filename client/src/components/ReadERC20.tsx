// src/components/ReadERC20.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { ERC20ABI as abi } from "abi/ERC20ABI";
import { ethers } from "ethers";
import { Contract } from "ethers";

interface Props {
  addressContract: string;
  currentAccount: string | undefined;
}

declare let window: any;

export default function ReadERC20(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [symbol, setSymbol] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [balance, SetBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20: Contract = new ethers.Contract(addressContract, abi, provider);

    provider.getCode(addressContract).then((result: string) => {
      //check whether it is a contract
      if (result === "0x") return;

      erc20
        .symbol()
        .then((result: string) => {
          setSymbol(result);
        })
        .catch((e: Error) => console.log(e));

      erc20
        .name()
        .then((result: string) => {
          console.log(result);
          setName(result);
        })
        .catch((e: Error) => console.log(e));
    });
    //called only once
  });

  const queryTokenBalance = useCallback(
    (window: any) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20: Contract = new ethers.Contract(
        addressContract,
        abi,
        provider
      );
      return fetch(
        `http://localhost:3001/wallet/balance?wallet_address=${currentAccount}&token_symbol=${symbol}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.log(
            `We dont want to stop here if we cant read the API ${err}`
          );
        })
        .then((res) => {
          return erc20.balanceOf(currentAccount).then((result: string) => {
            const newValue = Number(ethers.utils.formatEther(result));
            SetBalance(newValue);
            if (!res || res.amount !== result.toString()) {
              console.log("Updating balance");
              return fetch("http://localhost:3001/wallet/balance/update", {
                body: JSON.stringify({
                  wallet_address: currentAccount,
                  token_symbol: symbol,
                  amount: result.toString(),
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });
            }
          });
        })
        .catch((e: Error) => console.log(e));
    },
    [currentAccount, addressContract, symbol]
  );

  useEffect(() => {
    if (!window.ethereum) return;
    if (!currentAccount) return;
    queryTokenBalance(window);
  }, [currentAccount, queryTokenBalance, addressContract]);

  return (
    <div>
      <Text>
        <b>Token Name</b>: {currentAccount ? name : ""}
      </Text>
      <Text>
        <b>Token Symbol</b>: {currentAccount ? symbol : ""}
      </Text>
      <Text my={4}>
        <b>User balance</b>: {currentAccount ? balance : ""}
      </Text>
    </div>
  );
}
