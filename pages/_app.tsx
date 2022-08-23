import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "../contexts/ContextProvider";
import { useRouter } from "next/router";

declare const window: any;

export const pageview = () => {
  window.fbq("track", "PageView");
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (window.fbq) {
      pageview();

      const handleRouteChange = () => {
        pageview();
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <ContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  );
}

export default MyApp;
