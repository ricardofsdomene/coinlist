import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "../contexts/ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  );
}

export default MyApp;
