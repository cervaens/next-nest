// src/components/layout.tsx
import React, { ReactNode } from "react";
import { Text, Center, Container, useColorModeValue } from "@chakra-ui/react";
import Header from "./header";

type Props = {
  children: ReactNode;
};

export function Layout(props: Props) {
  return (
    <div>
      <Header />
      <Container maxW="container.md" py="8">
        {props.children}
      </Container>
    </div>
  );
}
