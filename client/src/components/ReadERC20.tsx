// src/components/ReadERC20.tsx
import React, { useEffect, useState } from "react";
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

  //call when currentAccount change
  useEffect(() => {
    if (!window.ethereum) return;
    if (!currentAccount) return;

    queryTokenBalance(window);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20: Contract = new ethers.Contract(addressContract, abi, provider);

    // listen for changes on an Ethereum address
    console.log(`listening for Mint...`);

    const toMe = erc20.filters.Transfer(null, currentAccount);
    erc20.on(toMe, (from, to, amount, event) => {
      console.log("Mint|received", { from, to, amount, event });
      queryTokenBalance(window);
    });

    // remove listener when the component is unmounted
    return () => {
      erc20.removeAllListeners(toMe);
    };
  });

  async function queryTokenBalance(window: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20: Contract = new ethers.Contract(addressContract, abi, provider);

    erc20
      .balanceOf(currentAccount)
      .then((result: string) => {
        SetBalance(Number(ethers.utils.formatEther(result)));
      })
      .catch((e: Error) => console.log(e));
  }

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
