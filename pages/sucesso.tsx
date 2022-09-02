import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  Spinner,
  Icon,
  Image,
  Input,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/índex";
import axios from "axios";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import CoinGecko from "coingecko-api";

import nercuriusIndex from "../mi.json";
import { useWindowSize } from "../utils/useWindowSize";
import { validate } from "email-validator";

import {
  coinAsc,
  coinDec,
  govrAsc,
  govrDec,
  mediaAsc,
  mediaDec,
  oneDayAsc,
  oneDayDec,
  oneHourAsc,
  oneHourDec,
  oneWeekAsc,
  oneWeekDec,
  qualAsc,
  qualDec,
  SegurançaAsc,
  SegurançaDec,
  symbolAsc,
  symbolDec,
  toknAsc,
  toknDec,
  marketcapAsc,
  marketcapDec,
  priceDec,
  priceAsc,
  IndexDec,
  IndexAsc,
} from "../utils/filters";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
  AiFillFacebook,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { platform } from "process";
import { Context } from "../contexts/ContextProvider";

export default function Success({ props }: any) {
  const { access, setAccess } = useContext(Context);

  const size = useWindowSize();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("586978001720745");
        ReactPixel.fbq("track", "cadastro");

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  const { src } = router.query;

  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");

  const [tab, setTab] = useState<"Ranking por marketcap" | "Ranking Mercurius">(
    "Ranking Mercurius"
  );
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
  const CoinGeckoClient = new CoinGecko();

  const [arr, setArr] = useState<any[]>([]);

  type CGData = {
    name: string;
    image: {
      small: string;
    };
    symbol: string;
    market_data: {
      price_change_percentage_1h_in_currency: {
        brl: number;
        usd: number;
      };
      price_change_percentage_24h: number;
      price_change_percentage_7d: number;
      price_change_percentage_30d: number;
      market_cap: {
        brl: number;
        usd: number;
      };
      current_price: {
        brl: number;
        usd: number;
      };
    };
  };

  type IData = {
    id?: number;
    name: string;
    Tokn?: number;
    Qual?: number;
    Govr?: number;
    Segurança?: number;
    Media?: number;
    image: {
      small: string;
    };
    symbol: string;
    market_data: {
      price_change_percentage_1h_in_currency: {
        brl: number;
        usd: number;
      };
      price_change_percentage_24h: number;
      price_change_percentage_7d: number;
      price_change_percentage_30d: number;
      market_cap: {
        brl: number;
        usd: number;
      };
      current_price: {
        brl: number;
        usd: number;
      };
    };
  };

  const [data, setData] = useState<[CGData] | []>([]);
  const [indexData, setIndexData] = useState<any[]>([]);

  const [marketcapData, setMarketcapData] = useState<any[]>([]);

  const [refresh, setRefresh] = useState(500);

  const [newsletterSign, setNewsletterSign] = useState<boolean>(false);
  const [LGPDChecked, setLGPDChecked] = useState<boolean>(false);

  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      setIsMobile(true);
    } else {
      setIsDesktop(true);
    }
  }, [size]);

  async function fetchCoinGecko() {
    let data = await CoinGeckoClient.coins.all();

    const cg = data.data;

    const newCgArr: any[] = [];

    cg.map((d: any, i: number) => {
      if (
        d.symbol === "usdt" ||
        d.symbol === "usdc" ||
        d.symbol === "steth" ||
        d.symbol === "busd" ||
        d.symbol === "dai" ||
        d.symbol === "tusd" ||
        d.symbol === "wbtc"
      ) {
      } else {
        newCgArr.push(d);
      }
    });

    setMarketcapData(newCgArr);

    setData(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCoinGecko();

    const fetchLoopInterval = setInterval(fetchCoinGecko, 100000);

    return () => {
      clearInterval(fetchLoopInterval);
    };
  }, [arr]);

  useEffect(() => {
    handleMercuriusIndex();
  }, [data]);

  async function handleMercuriusIndex() {
    let indexArr: any[];
    indexArr = [];

    (await data) &&
      data.map((d, i) => {
        console.log(d.name);
        nercuriusIndex &&
          nercuriusIndex.map((m, im) => {
            if (d.name === m.name) {
              const tempMyObj = Object.assign({}, d);
              const obj = Object.assign(tempMyObj, m);
              indexArr.push(obj);
            }
          });
      });

    setIndexData(indexArr);
  }

  async function handlePostLead() {
    try {
      const base_url: string | undefined = process.env.LL_BASE_URL;
      const endpoint: string = "webapi/Lead";
      const token: string | undefined = `token=${process.env.QUERY_TOKEN}`;
      const url: string = `${base_url}/${endpoint}?${token}`;
      if (!email) {
        toast({
          status: "error",
          description: "Você precisa inserir um email",
        });
      } else {
        const email_validated = validate(email);
        if (!email_validated) {
          toast({
            status: "error",
            description: "Você precisa inserir um email valido",
          });
        }
      }
      if (!LGPDChecked) {
        toast({
          status: "error",
          description: "Você precisa concordar com nossas políticas de LGPD",
        });
      } else if (url && email) {
        const response = await axios.post(url, {
          Email: email,
          MachineCode: 394001,
          EmailSequenceCode: src
            ? src === "youtube-video"
              ? 1509483
              : src === "google-ads"
              ? 1509484
              : src === "face-ads"
              ? 1509485
              : src === "instagram"
              ? 1509486
              : 1509482
            : 1509486,
          SequenceLevelCode: 1,
        });
        if (response.status === 200) {
          router.push("/sucesso");
          setTimeout(() => {
            toast({
              status: "success",
              description: "Relatórios liberados",
            });
            setNewsletterSign(false);
            setEmail("");
            setAccess(true);
          }, 500);
        } else {
          toast({
            status: "error",
            description: "Falha ao se inscrever na newsletter",
          });
        }
      }
    } catch (e) {}
  }

  function Hero() {
    return (
      <Flex
        bg="#000"
        w="100%"
        style={{
          height: 200,
          padding: 20,
        }}
        align="center"
      >
        <Flex flexDir="column" w="100%">
          <Text
            cursor="pointer"
            color="#00F6EF"
            fontWeight="extrabold"
            fontSize={isDesktop ? 26 : 22}
          >
            O Comparador Cripto
          </Text>
          <Text
            cursor="pointer"
            fontWeight="extrabold"
            color="#FFF"
            w={isMobile ? "90%" : "90%"}
            fontSize={isDesktop ? 15 : 12}
          >
            Nós reordenamos o TOP 20 de criptomoedas em ordem de qualidade com
            base em nossas análises fundamentalistas. Veja o nosso ranking!
          </Text>
          <Flex mt="4" w="100%" justify="space-between" align="center">
            <Flex zIndex="9" w="100%">
              <Flex
                mr="2"
                cursor="pointer"
                bg={tab === "Ranking Mercurius" ? "#FF1668" : "gray"}
                px="2"
                py="1"
                justify="center"
                align="center"
                borderRadius="5"
                color="#FFF"
                fontSize={isDesktop ? 13 : 14}
                onClick={() => setTab("Ranking Mercurius")}
              >
                Ranking Mercurius
              </Flex>
              <Flex
                cursor="pointer"
                bg={tab === "Ranking por marketcap" ? "#FF1668" : "gray"}
                px="2"
                py="1"
                justify="center"
                align="center"
                borderRadius="5"
                color="#FFF"
                fontSize={isDesktop ? 13 : 14}
                onClick={() => {
                  setNewsletterSign(false);
                  setTab("Ranking por marketcap");
                }}
              >
                Ranking marketcap
              </Flex>
            </Flex>
            <Flex
              zIndex="9"
              cursor="pointer"
              bg="gray"
              px="2"
              py="1"
              justify="center"
              align="center"
              borderRadius="5"
              color="#FFF"
              fontSize={isDesktop ? 14 : 14}
              onClick={() => {
                currency === "BRL" ? setCurrency("USD") : setCurrency("BRL");
              }}
            >
              <Text color="#FFF" fontSize="xs">
                {currency === "BRL" ? "BRL" : "USD"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function List() {
    const [filter, setFilter] = useState<
      | "Moeda"
      | "Simbolo"
      | "1h"
      | "24h"
      | "7d"
      | "30d"
      | "Tokenomics"
      | "Governança"
      | "Qualidade"
      | "Segurança"
      | "Média"
      | "Ranking por marketcap"
      | "Preço"
      | "Moeda-dec"
      | "Simbolo-dec"
      | "1h-dec"
      | "24h-dec"
      | "7d-dec"
      | "30d-dec"
      | "Tokenomics-dec"
      | "Governança-dec"
      | "Qualidade-dec"
      | "Segurança-dec"
      | "Média-dec"
      | "Ranking por marketcap-dec"
      | "Preço-dec"
      | ""
    >("");

    useEffect(() => {
      if (tab === "Ranking Mercurius") {
        setFilter("Média");
        indexData.sort(IndexDec);
      } else {
        setFilter("Ranking por marketcap");
        indexData.sort(marketcapAsc);
      }
    }, [tab]);

    // Ranking por marketcap vai ser por padrao enumerado em ordem dec (capital_market)

    return (
      <Flex flexDir="column">
        <Flex
          style={{
            marginTop: isMobile ? 20 : 20,
            paddingLeft: 20,
            paddingRight: 20,
            width: "100%",
          }}
        >
          <Flex bg="#FFF" borderRadius="15" w="100%" h="100%">
            {loading ? (
              <Flex h="30vh" w="100%" justify="center" align="center">
                {" "}
                <Spinner color="#75fbfd" size="lg" />
              </Flex>
            ) : (
              <>
                {tab === "Ranking por marketcap" ? (
                  <TableContainer style={{ width: "100%" }}>
                    <Table variant="simple" style={{ width: "100%" }}>
                      <Thead>
                        <Tr
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Th>
                            <Flex align="center">#</Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={200}
                            onClick={() => {
                              if (filter === "Moeda") {
                                setFilter("Moeda-dec");
                                indexData.sort(coinDec);
                              } else {
                                setFilter("Moeda");
                                indexData.sort(coinAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              {currency === "USD" ? "Coin" : "Moeda"}
                              {filter === "Moeda" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Moeda-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={125}
                            onClick={() => {
                              if (filter === "Simbolo") {
                                setFilter("Simbolo-dec");
                                indexData.sort(symbolDec);
                              } else {
                                setFilter("Simbolo");
                                indexData.sort(symbolAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              {currency === "USD" ? "Symbol" : "Simbolo"}
                              {filter === "Simbolo" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Simbolo-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={125}
                            onClick={() => {
                              if (filter === "1h") {
                                setFilter("1h-dec");
                                indexData.sort(oneHourDec);
                              } else {
                                setFilter("1h");
                                indexData.sort(oneHourAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              1h
                              {filter === "1h" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "1h-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={125}
                            onClick={() => {
                              if (filter === "24h") {
                                setFilter("24h-dec");
                                indexData.sort(oneDayDec);
                              } else {
                                setFilter("24h");
                                indexData.sort(oneDayAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              24h
                              {filter === "24h" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "24h-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={125}
                            onClick={() => {
                              if (filter === "7d") {
                                setFilter("7d-dec");
                                indexData.sort(oneWeekDec);
                              } else {
                                setFilter("7d");
                                indexData.sort(oneWeekAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              7d
                              {filter === "7d" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "7d-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={115}
                            onClick={() => {
                              if (filter === "30d") {
                                setFilter("30d-dec");
                                indexData.sort(oneWeekDec);
                              } else {
                                setFilter("30d");
                                indexData.sort(oneWeekAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              30d
                              {filter === "30d" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "30d-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={currency === "BRL" ? 130 : 150}
                            onClick={() => {
                              if (filter === "Ranking por marketcap") {
                                setFilter("Ranking por marketcap-dec");
                                indexData.sort(marketcapDec);
                              } else {
                                setFilter("Ranking por marketcap");
                                indexData.sort(marketcapAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              {currency === "USD" ? "Market Cap" : "Mercado"}
                              {filter === "Ranking por marketcap" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Ranking por marketcap-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={100}
                            onClick={() => {
                              if (filter === "Preço") {
                                setFilter("Preço-dec");
                                indexData.sort(priceDec);
                              } else {
                                setFilter("Preço");
                                indexData.sort(priceAsc);
                              }
                            }}
                          >
                            {currency === "USD" ? "Price (USD)" : "Preço (BRL)"}
                            {filter === "Preço" && (
                              <Icon
                                as={BiChevronUp}
                                ml="1"
                                size={20}
                                color="#000"
                              />
                            )}
                            {filter === "Preço-dec" && (
                              <Icon
                                as={BiChevronDown}
                                ml="1"
                                size={20}
                                color="#000"
                              />
                            )}
                          </Th>
                          <Th
                            cursor="pointer"
                            onClick={() => setFilter("Preço")}
                          ></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {marketcapData &&
                          marketcapData.map((d, i) => {
                            if (i < 20)
                              return (
                                <Tr
                                  _hover={{
                                    backgroundColor: "#EEE",
                                  }}
                                  key={i}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Td color="#000" fontSize={14}>
                                    {i + 1}
                                  </Td>
                                  <Td color="#000" w={200} fontSize={14}>
                                    <Flex align="center">
                                      <Image
                                        style={{
                                          marginRight: 10,
                                          height: 25,
                                          width: 25,
                                        }}
                                        src={d.image.small}
                                      />
                                      {d.name}
                                    </Flex>
                                  </Td>
                                  <Td
                                    color="#000"
                                    w={125}
                                    fontSize={14}
                                    textAlign="left"
                                  >
                                    {d.symbol.toUpperCase()}
                                  </Td>
                                  {currency === "USD" ? (
                                    <Td
                                      w={125}
                                      color={
                                        d.market_data
                                          .price_change_percentage_1h_in_currency
                                          .usd > 0
                                          ? "green"
                                          : "red"
                                      }
                                      fontSize={14}
                                    >
                                      {d.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                        2
                                      )}
                                      %
                                    </Td>
                                  ) : (
                                    <Td
                                      w={125}
                                      color={
                                        d.market_data
                                          .price_change_percentage_1h_in_currency
                                          .brl > 0
                                          ? "green"
                                          : "red"
                                      }
                                      fontSize={14}
                                    >
                                      {d.market_data.price_change_percentage_1h_in_currency.brl.toFixed(
                                        2
                                      )}
                                      %
                                    </Td>
                                  )}
                                  <Td
                                    w={125}
                                    color={
                                      d.market_data
                                        .price_change_percentage_24h > 0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_24h.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                  <Td
                                    w={125}
                                    color={
                                      d.market_data.price_change_percentage_7d >
                                      0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_7d.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                  <Td
                                    w={115}
                                    color={
                                      d.market_data.price_change_percentage_7d >
                                      0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_30d.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                  {currency === "USD" ? (
                                    <Td color="#000" w={150} fontSize={14}>
                                      {d.market_data.market_cap.usd >
                                      1000000000000
                                        ? "U$" +
                                          (
                                            d.market_data.market_cap.usd /
                                            1000000000
                                          ).toFixed(0) +
                                          "B"
                                        : "U$" +
                                          (
                                            d.market_data.market_cap.usd /
                                            1000000
                                          ).toFixed(1) +
                                          "M"}
                                    </Td>
                                  ) : (
                                    <Td color="#000" w={130} fontSize={14}>
                                      {d.market_data.market_cap.brl >
                                      1000000000000
                                        ? "R$" +
                                          (
                                            d.market_data.market_cap.brl /
                                            1000000000
                                          ).toFixed(0) +
                                          "B"
                                        : "R$" +
                                          (
                                            d.market_data.market_cap.brl /
                                            1000000
                                          ).toFixed(0) +
                                          "M"}
                                    </Td>
                                  )}
                                  {currency === "USD" ? (
                                    <Td
                                      color="#000"
                                      w={100}
                                      textAlign="center"
                                      fontSize={14}
                                    >
                                      {d.market_data.current_price.usd.toLocaleString(
                                        "en-US",
                                        {
                                          style: "currency",
                                          currency: "USD",
                                        }
                                      )}
                                    </Td>
                                  ) : (
                                    <Td
                                      color="#000"
                                      w={100}
                                      textAlign="center"
                                      fontSize={14}
                                    >
                                      {d.market_data.current_price.brl.toLocaleString(
                                        "en-US",
                                        {
                                          style: "currency",
                                          currency: "BRL",
                                        }
                                      )}
                                    </Td>
                                  )}
                                  <Td />
                                </Tr>
                              );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <TableContainer
                    style={{ width: "100%", height: access ? "100%" : 300 }}
                  >
                    <Table variant="simple" style={{ width: "100%" }}>
                      <Thead>
                        <Tr
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {/** 5 + 19.3 + 15 + 15  + 28 + 20 */}
                          <Th>
                            <Flex align="center">#</Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={200}
                            onClick={() => {
                              if (filter === "Moeda") {
                                setFilter("Moeda-dec");
                                indexData.sort(coinDec);
                              } else {
                                setFilter("Moeda");
                                indexData.sort(coinAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              {currency === "USD" ? "Coin" : "Moeda"}
                              {filter === "Moeda" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Moeda-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={90}
                            onClick={() => {
                              if (filter === "Simbolo") {
                                setFilter("Simbolo-dec");
                                indexData.sort(symbolDec);
                              } else {
                                setFilter("Simbolo");
                                indexData.sort(symbolAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              {currency === "USD" ? "Symbol" : "Simbolo"}
                              {filter === "Simbolo" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Simbolo-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={70}
                            onClick={() => {
                              if (filter === "1h") {
                                setFilter("1h-dec");
                                indexData.sort(oneHourDec);
                              } else {
                                setFilter("1h");
                                indexData.sort(oneHourAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              1h
                              {filter === "1h" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "1h-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={70}
                            onClick={() => {
                              if (filter === "24h") {
                                setFilter("24h-dec");
                                indexData.sort(oneDayDec);
                              } else {
                                setFilter("24h");
                                indexData.sort(oneDayAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              24h
                              {filter === "24h" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "24h-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={85}
                            onClick={() => {
                              if (filter === "7d") {
                                setFilter("7d-dec");
                                indexData.sort(oneWeekDec);
                              } else {
                                setFilter("7d");
                                indexData.sort(oneWeekAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              7d
                              {filter === "7d" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "7d-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={110}
                            onClick={() => {
                              if (filter === "Tokenomics") {
                                setFilter("Tokenomics-dec");
                                indexData.sort(toknDec);
                              } else {
                                setFilter("Tokenomics");
                                indexData.sort(toknAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              Tokenomics
                              {filter === "Tokenomics" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Tokenomics-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={110}
                            onClick={() => {
                              if (filter === "Governança") {
                                setFilter("Governança-dec");
                                indexData.sort(govrDec);
                              } else {
                                setFilter("Governança");
                                indexData.sort(govrAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              Governança
                              {filter === "Governança" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Governança-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={100}
                            onClick={() => {
                              if (filter === "Qualidade") {
                                setFilter("Qualidade-dec");
                                indexData.sort(qualDec);
                              } else {
                                setFilter("Qualidade");
                                indexData.sort(qualAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              Qualidade
                              {filter === "Qualidade" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Qualidade-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={100}
                            onClick={() => {
                              if (filter === "Segurança") {
                                setFilter("Segurança-dec");
                                indexData.sort(SegurançaDec);
                              } else {
                                setFilter("Segurança");
                                indexData.sort(SegurançaAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              Segurança
                              {filter === "Segurança" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Segurança-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={110}
                            onClick={() => {
                              if (filter === "Média") {
                                setFilter("Média-dec");
                                indexData.sort(IndexAsc);
                              } else {
                                setFilter("Média");
                                indexData.sort(IndexDec);
                              }
                            }}
                          >
                            <Flex align="center">
                              Resultado
                              {filter === "Média" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Média-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={currency === "BRL" ? 100 : 110}
                            onClick={() => {
                              if (filter === "Ranking por marketcap") {
                                setFilter("Ranking por marketcap-dec");
                                indexData.sort(marketcapDec);
                              } else {
                                setFilter("Ranking por marketcap");
                                indexData.sort(marketcapAsc);
                              }
                            }}
                          >
                            <Flex align="center">
                              {currency === "USD" ? "Market Cap" : "Mercado"}
                              {filter === "Ranking por marketcap" && (
                                <Icon
                                  as={BiChevronUp}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                              {filter === "Ranking por marketcap-dec" && (
                                <Icon
                                  as={BiChevronDown}
                                  ml="1"
                                  size={20}
                                  color="#000"
                                />
                              )}
                            </Flex>
                          </Th>
                          <Th
                            cursor="pointer"
                            w={100}
                            onClick={() => {
                              if (filter === "Preço") {
                                setFilter("Preço-dec");
                                indexData.sort(priceDec);
                              } else {
                                setFilter("Preço");
                                indexData.sort(priceAsc);
                              }
                            }}
                          >
                            {currency === "USD" ? "Price (USD)" : "Preço (BRL)"}
                            {filter === "Preço" && (
                              <Icon
                                as={BiChevronUp}
                                ml="1"
                                size={20}
                                color="#000"
                              />
                            )}
                            {filter === "Preço-dec" && (
                              <Icon
                                as={BiChevronDown}
                                ml="1"
                                size={20}
                                color="#000"
                              />
                            )}
                          </Th>
                          <Th
                            cursor="pointer"
                            onClick={() => setFilter("Preço")}
                          ></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {indexData &&
                          indexData.map((d, i) => {
                            return access ? (
                              <Tr
                                _hover={{
                                  backgroundColor: "#EEE",
                                }}
                                key={i}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Td color="#000" fontSize={14}>
                                  {i + 1}
                                </Td>
                                <Td color="#000" w={200} fontSize={14}>
                                  <Flex textAlign="center" align="center">
                                    <Image
                                      style={{
                                        marginRight: 10,
                                        height: 25,
                                        width: 25,
                                      }}
                                      src={d.image}
                                    />
                                    {d.name}
                                  </Flex>
                                </Td>
                                <Td
                                  textAlign="center"
                                  color="#000"
                                  w={90}
                                  fontSize={14}
                                >
                                  {d.symbol.toUpperCase()}
                                </Td>
                                {currency === "USD" ? (
                                  <Td
                                    textAlign="center"
                                    w={70}
                                    color={
                                      d.market_data
                                        .price_change_percentage_1h_in_currency
                                        .usd > 0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                ) : (
                                  <Td
                                    textAlign="center"
                                    w={70}
                                    color={
                                      d.market_data
                                        .price_change_percentage_1h_in_currency
                                        .brl > 0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_1h_in_currency.brl.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                )}
                                <Td
                                  textAlign="center"
                                  w={70}
                                  color={
                                    d.market_data.price_change_percentage_24h >
                                    0
                                      ? "green"
                                      : "red"
                                  }
                                  fontSize={14}
                                >
                                  {d.market_data.price_change_percentage_24h.toFixed(
                                    2
                                  )}
                                  %
                                </Td>
                                <Td
                                  textAlign="center"
                                  w={85}
                                  color={
                                    d.market_data.price_change_percentage_7d > 0
                                      ? "green"
                                      : "red"
                                  }
                                  fontSize={14}
                                >
                                  {d.market_data.price_change_percentage_7d.toFixed(
                                    2
                                  )}
                                  %
                                </Td>

                                <Td
                                  color="#000"
                                  textAlign="center"
                                  w={120}
                                  fontSize={14}
                                >
                                  {d.Tokn__1}
                                </Td>
                                <Td
                                  color="#000"
                                  textAlign="center"
                                  fontSize={14}
                                  w={110}
                                >
                                  {d.Govr__1}
                                </Td>
                                <Td
                                  color="#000"
                                  textAlign="center"
                                  fontSize={14}
                                  w={100}
                                >
                                  {d.Qual__1}
                                </Td>
                                <Td
                                  color="#000"
                                  textAlign="center"
                                  fontSize={14}
                                  w={100}
                                >
                                  {d.Risco__1}
                                </Td>
                                <Td
                                  color="#000"
                                  textAlign="center"
                                  fontSize={14}
                                  w={110}
                                >
                                  {d.Resultado__1}
                                </Td>
                                {currency === "USD" ? (
                                  <Td color="#000" w={110} fontSize={14}>
                                    {d.market_data.market_cap.usd >
                                    1000000000000
                                      ? "U$" +
                                        (
                                          d.market_data.market_cap.usd /
                                          1000000000
                                        ).toFixed(0) +
                                        "B"
                                      : "U$" +
                                        (
                                          d.market_data.market_cap.usd / 1000000
                                        ).toFixed(0) +
                                        "M"}
                                  </Td>
                                ) : (
                                  <Td color="#000" w={100} fontSize={14}>
                                    {d.market_data.market_cap.brl >
                                    1000000000000
                                      ? "R$" +
                                        (
                                          d.market_data.market_cap.brl /
                                          1000000000
                                        ).toFixed(0) +
                                        "B"
                                      : "R$" +
                                        (
                                          d.market_data.market_cap.brl / 1000000
                                        ).toFixed(0) +
                                        "M"}
                                  </Td>
                                )}
                                {currency === "USD" ? (
                                  <Td
                                    color="#000"
                                    w={100}
                                    textAlign="center"
                                    fontSize={14}
                                  >
                                    {d.market_data.current_price.usd.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "USD",
                                      }
                                    )}
                                  </Td>
                                ) : (
                                  <Td
                                    color="#000"
                                    w={100}
                                    textAlign="center"
                                    fontSize={14}
                                  >
                                    {d.market_data.current_price.brl.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    )}
                                  </Td>
                                )}
                                <Td />
                              </Tr>
                            ) : (
                              <Tr
                                _hover={{
                                  backgroundColor: "#EEE",
                                }}
                                key={i}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Td color="#000" fontSize={14}>
                                  {i + 1}
                                </Td>
                                <Td color="#000" w={200} fontSize={14}>
                                  <Flex align="center">
                                    <Image
                                      style={{
                                        marginRight: 10,
                                        height: 25,
                                        width: 25,
                                      }}
                                      src={d.image}
                                    />
                                    {d.name}
                                  </Flex>
                                </Td>
                                <Td
                                  color="#000"
                                  w={90}
                                  fontSize={14}
                                  textAlign="left"
                                >
                                  {d.symbol.toUpperCase()}
                                </Td>
                                {currency === "USD" ? (
                                  <Td
                                    w={70}
                                    color={
                                      d.market_data
                                        .price_change_percentage_1h_in_currency
                                        .usd > 0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                ) : (
                                  <Td
                                    w={70}
                                    color={
                                      d.market_data
                                        .price_change_percentage_1h_in_currency
                                        .brl > 0
                                        ? "green"
                                        : "red"
                                    }
                                    fontSize={14}
                                  >
                                    {d.market_data.price_change_percentage_1h_in_currency.brl.toFixed(
                                      2
                                    )}
                                    %
                                  </Td>
                                )}
                                <Td
                                  w={70}
                                  color={
                                    d.market_data.price_change_percentage_24h >
                                    0
                                      ? "green"
                                      : "red"
                                  }
                                  fontSize={14}
                                >
                                  {d.market_data.price_change_percentage_24h.toFixed(
                                    2
                                  )}
                                  %
                                </Td>
                                <Td
                                  w={85}
                                  color={
                                    d.market_data.price_change_percentage_7d > 0
                                      ? "green"
                                      : "red"
                                  }
                                  fontSize={14}
                                >
                                  {d.market_data.price_change_percentage_7d.toFixed(
                                    2
                                  )}
                                  %
                                </Td>

                                <Td color="#000" w={70} fontSize={14}>
                                  {d.Tokn}
                                </Td>
                                <Td color="#000" fontSize={14} w={70}>
                                  {d.Govr}
                                </Td>
                                <Td color="#000" fontSize={14} w={70}>
                                  {d.Qual}
                                </Td>
                                <Td color="#000" fontSize={14} w={70}>
                                  {d.Segurança}
                                </Td>
                                <Td color="#000" fontSize={14} w={75}>
                                  {d.Media}
                                </Td>

                                {currency === "USD" ? (
                                  <Td color="#000" w={110} fontSize={14}>
                                    {d.market_data.market_cap.usd >
                                    1000000000000
                                      ? "U$" +
                                        (
                                          d.market_data.market_cap.usd /
                                          1000000000
                                        ).toFixed(0) +
                                        "B"
                                      : "U$" +
                                        (
                                          d.market_data.market_cap.usd / 1000000
                                        ).toFixed(0) +
                                        "M"}
                                  </Td>
                                ) : (
                                  <Td color="#000" w={100} fontSize={14}>
                                    {d.market_data.market_cap.brl >
                                    1000000000000
                                      ? "R$" +
                                        (
                                          d.market_data.market_cap.brl /
                                          1000000000
                                        ).toFixed(0) +
                                        "B"
                                      : "R$" +
                                        (
                                          d.market_data.market_cap.brl / 1000000
                                        ).toFixed(0) +
                                        "M"}
                                  </Td>
                                )}
                                {currency === "USD" ? (
                                  <Td
                                    color="#000"
                                    w={100}
                                    textAlign="center"
                                    fontSize={14}
                                  >
                                    {d.market_data.current_price.usd.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "USD",
                                      }
                                    )}
                                  </Td>
                                ) : (
                                  <Td
                                    color="#000"
                                    w={100}
                                    textAlign="center"
                                    fontSize={14}
                                  >
                                    {d.market_data.current_price.brl.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    )}
                                  </Td>
                                )}
                                <Td />
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex flexDir="column" justify="center" align="center">
        {tab === "Ranking por marketcap" && (
          <Image
            src="/favicon.ico"
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
        <Flex flexDir="column" justify="center" mt="7">
          <Text
            cursor="pointer"
            onClick={() => router.push("https://holdmerc.com.br/")}
            color="#FFF"
            ml="2"
            fontSize="xs"
            mr="2"
          >
            ATENÇÃO!!! ESSA LISTA É UM REORDENAMENTO DAS 20 MAIORES CRIPTOS DO MERCADO, COM BASE NA QUALIDADE DOS ATIVOS EM QUESTÃO. POR ISSO, ESSA LISTA POSSUI ALGUNS ATIVOS QUE NÓS NÃO RECOMENDAMOS (COMO, POR EXEMPLO, SHIBA INU E DOGECOIN), POIS O VALOR DE MERCADO DELAS É MUITO GRANDE. NÃO ESTAMOS RECOMENDANDO ESTES 20 ATIVOS, O COMPARADOR É APENAS UM ESTUDO DE COMO A MERCURIUS RECLASSIFICARIA ESSAS 20 MAIORES CRIPTOS.
          </Text>
          <Text
            cursor="pointer"
            onClick={() => router.push("https://holdmerc.com.br/")}
            color="#FFF"
            ml="2"
            fontSize="xs"
            mr="2"
          >
            FONTES: Utilizamos o CoinMarketCap para a composição do top 20 (última atualização: 31/08/2022). Utilizamos o CoinGecko para a atualização dos preços (atualizado automaticamente).
          </Text>
        </Flex>
        <Flex mt="6">
          <Text
            cursor="pointer"
            onClick={() => router.push("https://holdmerc.com.br/")}
            color="#FFF"
            ml="2"
            fontSize="xs"
            mr="2"
          >
            Site
          </Text>
          <Text
            cursor="pointer"
            onClick={() => router.push("https://holdmerc.com.br/blog/")}
            color="#FFF"
            fontSize="xs"
            mr="2"
          >
            Blog
          </Text>
          <Text
            cursor="pointer"
            onClick={() =>
              router.push(
                "https://api.whatsapp.com/send?phone=5511912414903&text=Oi%20Danilo%2C%20tudo%20bem%3F%20Vim%20pelo%20site%20e%20estou%20com%20algumas%20d%C3%BAvidas!"
              )
            }
            color="#FFF"
            fontSize="xs"
            mr="2"
          >
            Contato
          </Text>
        </Flex>
        {tab === "Ranking por marketcap" && (
          <Flex mt="4">
            <Flex
              cursor="pointer"
              onClick={() =>
                router.push("https://www.instagram.com/Mercuriuscrypto")
              }
              mr="2"
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiOutlineInstagram} color="#FFF" fontSize="lg" />
            </Flex>
            <Flex
              mr="2"
              cursor="pointer"
              onClick={() =>
                router.push(
                  "https://www.youtube.com/channel/UClPh8tBlg4-VyHQ7nXX6OSg"
                )
              }
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiOutlineYoutube} color="#FFF" fontSize="lg" />
            </Flex>
            <Flex
              cursor="pointer"
              onClick={() =>
                router.push("https://pt-br.facebook.com/Mercuriuscrypto/")
              }
              mr="2"
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiFillFacebook} color="#FFF" fontSize="lg" />
            </Flex>
            <Flex
              cursor="pointer"
              onClick={() => router.push("https://twitter.com/0xMercurius")}
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiOutlineTwitter} color="#FFF" fontSize="lg" />
            </Flex>
          </Flex>
        )}
        {tab === "Ranking Mercurius" && access && (
          <Flex mt="4">
            <Flex
              cursor="pointer"
              onClick={() =>
                router.push("https://www.instagram.com/Mercuriuscrypto")
              }
              mr="2"
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiOutlineInstagram} color="#FFF" fontSize="lg" />
            </Flex>
            <Flex
              mr="2"
              cursor="pointer"
              onClick={() =>
                router.push(
                  "https://www.youtube.com/channel/UClPh8tBlg4-VyHQ7nXX6OSg"
                )
              }
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiOutlineYoutube} color="#FFF" fontSize="lg" />
            </Flex>
            <Flex
              cursor="pointer"
              onClick={() =>
                router.push("https://pt-br.facebook.com/Mercuriuscrypto/")
              }
              mr="2"
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiFillFacebook} color="#FFF" fontSize="lg" />
            </Flex>
            <Flex
              cursor="pointer"
              onClick={() => router.push("https://twitter.com/0xMercurius")}
              bg="#FF1668"
              borderRadius="full"
              justify="center"
              align="center"
              p="2"
            >
              <Icon as={AiOutlineTwitter} color="#FFF" fontSize="lg" />
            </Flex>
          </Flex>
        )}
        <Flex mt="4" justify="center" align="center">
          <Text color="#FFF" fontSize="sm" mr="2" w="100%" textAlign="center">
            Copyright © 2022. Todos os direitos reservados.
          </Text>
        </Flex>
      </Flex>
    );
  }

  const GoogleTagConversionHTML = `
  <!-- Event snippet for Leads conversion page -->
  <script>
    gtag('event', 'conversion', {'send_to': 'AW-10906897981/VmfKCJOwwdcDEL2c6NAo'});
  </script>
`;

  const GoogleTagConversion = () => (
    <div dangerouslySetInnerHTML={{ __html: GoogleTagConversionHTML }} />
  );

  return (
    <>
      <GoogleTagConversion />
      <div
        style={{
          padding: 0,
          margin: 0,
          width: "100vw",
          maxHeight:
            access && tab === "Ranking por marketcap" ? "auto" : "100vh",
          overflow:
            tab === "Ranking por marketcap"
              ? "auto"
              : access
              ? "auto"
              : newsletterSign
              ? "auto"
              : "auto",
          backgroundColor: "#000",
          color: "#FFF",
          fontSize: 33,
        }}
      >
        <Flex
          flexDir="column"
          style={{
            backgroundColor: "#000",
            color: "#FFF",
            fontSize: 33,
            paddingBottom: 30,
          }}
          mx="auto"
          maxW={1300}
          w="100%"
          h="100vh"
        >
          <Header />
          <Hero />
          {newsletterSign ? (
            <Flex
              style={{
                padding: 20,
              }}
            >
              <Flex
                flexDir="column"
                align="center"
                bg="#FFF"
                h="100%"
                pt="4"
                pb="6"
                px="4"
                w="100%"
                borderRadius="5"
              >
                <Text
                  color="#000"
                  fontWeight="bold"
                  fontFamily="Didact Gothic"
                  fontSize={isMobile ? 18 : 24}
                  w="100%"
                  textAlign="center"
                >
                  Acesse o Ranking!
                </Text>
                <Text
                  color="#000"
                  fontFamily="Didact Gothic"
                  fontSize={isMobile ? 14 : 18}
                  w="100%"
                  textAlign="center"
                >
                  Assine nossa newsletter para desbloquear o ranking
                </Text>
                <Flex
                  maxW={600}
                  mx="auto"
                  w="100%"
                  align="center"
                  mt="2"
                  px="10"
                  justify="center"
                >
                  <Checkbox
                    isChecked={LGPDChecked}
                    onChange={() => setLGPDChecked(!LGPDChecked)}
                  />
                  <Text
                    ml="2"
                    color="#000"
                    fontFamily="Didact Gothic"
                    fontSize={isMobile ? 8 : 12}
                    w="100%"
                  >
                    Conscientizo o uso dos meus dados para fins de distribuição
                    de conteúdo, seguindo normas LGPD
                  </Text>
                </Flex>
                <Flex flexDir={isDesktop ? "row" : "column"} mt="5">
                  <Input
                    onClick={() => {
                      setNewsletterSign(true);
                    }}
                    autoCapitalize="none"
                    type="email"
                    _focus={{
                      boxShadow: "none !important",
                      border: "2px solid #000",
                      backgroundColor: "#FFF",
                    }}
                    outline="none !important"
                    borderRadius="5"
                    placeholder="ex: caio@gmail.com"
                    style={{
                      height: 60,
                      maxWidth: 350,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    bg="#EEE"
                    color="#000"
                  />
                  <Flex
                    onClick={handlePostLead}
                    _hover={{
                      border: "2px solid #000",
                      textDecorationLine: "underline",
                      backgroundColor: "#FFF",
                      color: "#000",
                    }}
                    ml={isDesktop ? "2" : "0"}
                    mt={isMobile ? "2" : "0"}
                    bg="#ff1668"
                    borderRadius="5"
                    cursor="pointer"
                    style={{
                      height: 60,
                      width: 250,
                    }}
                    justify="center"
                    align="center"
                    color="#FFF"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    {isMobile ? "Assinar gratuitamente" : "Assinar"}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <>
              <List />
              {!access && tab === "Ranking Mercurius" && (
                <Flex
                  flexDir="column"
                  zIndex="8"
                  justify="flex-end"
                  position="absolute"
                  w="100%"
                  borderBottomRadius="5"
                  maxW={1300}
                  style={{
                    paddingLeft: 40,
                    paddingRight: 40,
                  }}
                >
                  <Box
                    style={{
                      filter: isDesktop ? "blur(30px)" : "blur(20px)",
                      marginTop: 150 + 160,
                    }}
                    borderBottomRadius="5"
                    display="flex"
                    bg="#FFF"
                    zIndex="5"
                    h={270}
                    mt="180"
                    justifyContent="center"
                    alignItems="center"
                  ></Box>
                </Flex>
              )}
              {!access && tab === "Ranking Mercurius" && (
                <Flex
                  flexDir="column"
                  zIndex="8"
                  justify="flex-end"
                  position="absolute"
                  w="100%"
                  borderBottomRadius="5"
                  maxW={1300}
                  h={250}
                  style={{
                    marginTop: 150 + 105,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <Box
                    p="10"
                    borderBottomRadius="5"
                    display="flex"
                    flexDir="column"
                    zIndex="6"
                    h="40%"
                    mt="180"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      color="#000"
                      fontWeight="bold"
                      fontFamily="Didact Gothic"
                      fontSize={isMobile ? 18 : 24}
                      w="100%"
                      textAlign="center"
                    >
                      Acesse o Ranking!
                    </Text>
                    <Text
                      color="#000"
                      fontFamily="Didact Gothic"
                      fontSize={isMobile ? 14 : 18}
                      w="100%"
                      textAlign="center"
                    >
                      Assine nossa newsletter para desbloquear o ranking
                    </Text>
                    <Flex flexDir={isDesktop ? "row" : "column"} mt="5">
                      <Input
                        onClick={() => {
                          setNewsletterSign(true);
                        }}
                        autoCapitalize="none"
                        type="email"
                        _focus={{
                          boxShadow: "none !important",
                          border: "2px solid #000",
                          backgroundColor: "#FFF",
                        }}
                        outline="none !important"
                        borderRadius="5"
                        placeholder="ex: caio@gmail.com"
                        style={{
                          height: 60,
                          maxWidth: 350,
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value);
                        }}
                        bg="#EEE"
                        color="#000"
                      />
                      <Flex
                        onClick={handlePostLead}
                        _hover={{
                          border: "2px solid #000",
                          textDecorationLine: "underline",
                          backgroundColor: "#FFF",
                          color: "#000",
                        }}
                        ml={isDesktop ? "2" : "0"}
                        mt={isMobile ? "2" : "0"}
                        bg="#ff1668"
                        borderRadius="5"
                        cursor="pointer"
                        style={{
                          height: 60,
                          width: 250,
                        }}
                        justify="center"
                        align="center"
                        color="#FFF"
                        fontSize={16}
                        fontWeight="bold"
                      >
                        {isMobile ? "Assinar gratuitamente" : "Assinar"}
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              )}
            </>
          )}
          <Footer />
        </Flex>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
