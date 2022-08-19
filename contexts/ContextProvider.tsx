import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useToast } from "@chakra-ui/react";

type AuthContextData = {
  loading: boolean;
  setLoading: (value: boolean) => any;
  access: boolean;
  setAccess: (value: boolean) => any;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const Context = createContext({} as AuthContextData);

export function ContextProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);

  const router = useRouter();
  const toast = useToast();

  return (
    <Context.Provider
      value={{
        access,
        setAccess,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}
