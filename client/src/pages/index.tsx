// src/pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ReadERC20 from "components/ReadERC20";
import MintERC20 from "components/MintERC20";
import UserHistory from "components/UserHistory";

declare let window: any;
const addressERC20 = "0x927dfb9e957526e4d40448d6d05a39ea39a2ee6b";

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [mintTo, setMintTo] = useState("");
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;

    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
  }, [currentAccount]);

  //click connect
  const onClickConnect = async () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const chainId = 5; // Goerli Test network

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId) }],
        });
      } catch (err) {
        console.log(err);
      }
    }

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
        return fetch("http://localhost:3001/wallet/connected/save", {
          body: JSON.stringify({
            wallet_address: accounts[0],
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
      })
      .catch((e) => console.log(e));
  };

  //click disconnect
  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  return (
    <>
      <Head>
        <title>Add3</title>
      </Head>

      <VStack>
        {mintTo ? (
          <Box bg="green" w="100%" p={4} color="white">
            Tokens minted to address {mintTo}
          </Box>
        ) : (
          ""
        )}
        <Box w="100%" my={4}>
          {currentAccount ? (
            <Button type="button" w="100%" onClick={onClickDisconnect}>
              Account:{currentAccount}
            </Button>
          ) : (
            <Button type="button" w="100%" onClick={onClickConnect}>
              Connect MetaMask
            </Button>
          )}
        </Box>

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <ReadERC20
            addressContract={addressERC20}
            currentAccount={currentAccount}
          />
        </Box>

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <MintERC20
            addressContract={addressERC20}
            currentAccount={currentAccount}
            onShowEvent={setMintTo}
          />
        </Box>
        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <UserHistory
            addressContract={addressERC20}
            currentAccount={currentAccount}
          />
        </Box>
      </VStack>
    </>
  );
};

export default Home;
