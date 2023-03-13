// src/components/MintERC20.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Input,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ERC20ABI as abi } from "abi/ERC20ABI";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";

interface Props {
  addressContract: string;
  currentAccount: string | undefined;
  onShowEvent: Dispatch<SetStateAction<string>>;
}

declare let window: any;

export default function MintERC20(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const onShowEvent = props.onShowEvent;
  const amount = "1";
  const [toAddress, setToAddress] = useState<string>("");

  async function mint(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20: Contract = new ethers.Contract(addressContract, abi, signer);

    fetch("http://localhost:3001/mint/save", {
      body: JSON.stringify({
        wallet_address: currentAccount,
        to: toAddress,
        amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .catch((err) => {
        console.log(`We dont want to stop here, but got an error: ${err}`);
      })
      .then(() => {
        return erc20.mint(toAddress, parseEther(amount));
      })
      .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`);

        return tr.wait();
      })
      .then((receipt: TransactionReceipt) => {
        onShowEvent(receipt.to);
      })
      .catch((e: Error) => console.log(e));
  }

  return (
    <form onSubmit={mint}>
      <FormControl>
        <FormLabel htmlFor="toaddress">Insert user address here: </FormLabel>
        <Input
          id="toaddress"
          type="text"
          required
          onChange={(e) => setToAddress(e.target.value)}
          my={3}
        />
        <Button type="submit" isDisabled={!currentAccount}>
          Mint
        </Button>
      </FormControl>
    </form>
  );
}
