import React from "react";

import { Flex, Text, Image } from "@chakra-ui/react";
import { useWindowSize } from "../../utils/useWindowSize";
import Link from "next/link";

export default function Header() {
  const size = useWindowSize();

  return (
    <Flex
      display="flex"
      align="center"
      flexDir="row"
      justify="space-between"
      bg="#000"
      w="100%"
      style={{
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
      }}
    >
      <Image
        mt=""
        src="logo-h.png"
        style={{
          height: 50,
        }}
      />
      <Link href="https://holdmerc.com.br/">
        <Flex
          zIndex="999"
          cursor="pointer"
          px="6"
          borderRadius="full"
          border="3px solid #75fbfd"
          justify="center"
          py="2"
          align="center"
        >
          <Text
            color="#75fbfd"
            fontSize={size.width > 800 ? 18 : 13}
            fontWeight="bold"
          >
            Acesse o nosso site
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
