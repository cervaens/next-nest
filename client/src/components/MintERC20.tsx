// src/components/MintERC20.tsx
import React, { useState } from "react";
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
}

declare let window: any;

export default function MintERC20(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const amount = "1";
  const [toAddress, setToAddress] = useState<string>("");

  async function mint(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20: Contract = new ethers.Contract(addressContract, abi, signer);

    erc20
      .mint(toAddress, parseEther(amount))
      .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`);
        tr.wait().then((receipt: TransactionReceipt) => {
          console.log("mint receipt", receipt);
        });
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
