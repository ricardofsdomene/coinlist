export function coinAsc(a: any, b: any) {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

export function coinDec(a: any, b: any) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function symbolAsc(a: any, b: any) {
  if (a.symbol > b.symbol) {
    return -1;
  }
  if (a.symbol < b.symbol) {
    return 1;
  }
  return 0;
}

export function symbolDec(a: any, b: any) {
  if (a.symbol < b.symbol) {
    return -1;
  }
  if (a.symbol > b.symbol) {
    return 1;
  }
  return 0;
}

export function oneHourAsc(a: any, b: any) {
  if (
    a.market_data.price_change_percentage_1h_in_currency.usd >
    b.market_data.price_change_percentage_1h_in_currency.usd
  ) {
    return -1;
  }
  if (
    a.market_data.price_change_percentage_1h_in_currency.usd <
    b.market_data.price_change_percentage_1h_in_currency.usd
  ) {
    return 1;
  }
  return 0;
}

export function oneHourDec(a: any, b: any) {
  if (
    a.market_data.price_change_percentage_1h_in_currency.usd <
    b.market_data.price_change_percentage_1h_in_currency.usd
  ) {
    return -1;
  }
  if (
    a.market_data.price_change_percentage_1h_in_currency.usd >
    b.market_data.price_change_percentage_1h_in_currency.usd
  ) {
    return 1;
  }
  return 0;
}

export function oneDayAsc(a: any, b: any) {
  if (
    a.market_data.price_change_percentage_24h >
    b.market_data.price_change_percentage_24h
  ) {
    return -1;
  }
  if (
    a.market_data.price_change_percentage_24h <
    b.market_data.price_change_percentage_24h
  ) {
    return 1;
  }
  return 0;
}

export function oneDayDec(a: any, b: any) {
  if (
    a.market_data.price_change_percentage_24h <
    b.market_data.price_change_percentage_24h
  ) {
    return -1;
  }
  if (
    a.market_data.price_change_percentage_24h >
    b.market_data.price_change_percentage_24h
  ) {
    return 1;
  }
  return 0;
}

export function oneWeekAsc(a: any, b: any) {
  if (
    a.market_data.price_change_percentage_7d >
    b.market_data.price_change_percentage_7d
  ) {
    return -1;
  }
  if (
    a.market_data.price_change_percentage_7d <
    b.market_data.price_change_percentage_7d
  ) {
    return 1;
  }
  return 0;
}

export function oneWeekDec(a: any, b: any) {
  if (
    a.market_data.price_change_percentage_7d <
    b.market_data.price_change_percentage_7d
  ) {
    return -1;
  }
  if (
    a.market_data.price_change_percentage_7d >
    b.market_data.price_change_percentage_7d
  ) {
    return 1;
  }
  return 0;
}

export function toknAsc(a: any, b: any) {
  if (a.Tokn > b.Tokn) {
    return -1;
  }
  if (a.Tokn < b.Tokn) {
    return 1;
  }
  return 0;
}

export function toknDec(a: any, b: any) {
  if (a.Tokn < b.Tokn) {
    return -1;
  }
  if (a.Tokn > b.Tokn) {
    return 1;
  }
  return 0;
}

export function govrAsc(a: any, b: any) {
  if (a.Govr > b.Govr) {
    return -1;
  }
  if (a.Govr < b.Govr) {
    return 1;
  }
  return 0;
}

export function govrDec(a: any, b: any) {
  if (a.Govr < b.Govr) {
    return -1;
  }
  if (a.Govr > b.Govr) {
    return 1;
  }
  return 0;
}

export function qualAsc(a: any, b: any) {
  if (a.Govr > b.Govr) {
    return -1;
  }
  if (a.Govr < b.Govr) {
    return 1;
  }
  return 0;
}

export function qualDec(a: any, b: any) {
  if (a.Govr < b.Govr) {
    return -1;
  }
  if (a.Govr > b.Govr) {
    return 1;
  }
  return 0;
}

export function SegurançaAsc(a: any, b: any) {
  if (a.Risco > b.Risco) {
    return -1;
  }
  if (a.Risco < b.Risco) {
    return 1;
  }
  return 0;
}

export function SegurançaDec(a: any, b: any) {
  if (a.Risco < b.Risco) {
    return -1;
  }
  if (a.Risco > b.Risco) {
    return 1;
  }
  return 0;
}

export function mediaAsc(a: any, b: any) {
  if (a.Media > b.Media) {
    return -1;
  }
  if (a.Media < b.Media) {
    return 1;
  }
  return 0;
}

export function mediaDec(a: any, b: any) {
  if (a.Media < b.Media) {
    return -1;
  }
  if (a.Media > b.Media) {
    return 1;
  }
  return 0;
}

export function marketcapAsc(a: any, b: any) {
  if (a.market_data.market_cap.usd > b.market_data.market_cap.usd) {
    return -1;
  }
  if (a.market_data.market_cap.usd < b.market_data.market_cap.usd) {
    return 1;
  }
  return 0;
}

export function marketcapDec(a: any, b: any) {
  if (a.market_data.market_cap.usd < b.market_data.market_cap.usd) {
    return -1;
  }
  if (a.market_data.market_cap.usd > b.market_data.market_cap.usd) {
    return 1;
  }
  return 0;
}

export function priceAsc(a: any, b: any) {
  if (a.market_data.current_price.usd > b.market_data.current_price.usd) {
    return -1;
  }
  if (a.market_data.current_price.usd < b.market_data.current_price.usd) {
    return 1;
  }
  return 0;
}

export function priceDec(a: any, b: any) {
  if (a.market_data.current_price.usd < b.market_data.current_price.usd) {
    return -1;
  }
  if (a.market_data.current_price.usd > b.market_data.current_price.usd) {
    return 1;
  }
  return 0;
}

export function IndexDec(a: any, b: any) {
  if (a.Index < b.Index) {
    return -1;
  }
  if (a.Index > b.Index) {
    return 1;
  }
  return 0;
}

export function IndexAsc(a: any, b: any) {
  if (a.Index > b.Index) {
    return -1;
  }
  if (a.Index < b.Index) {
    return 1;
  }
  return 0;
}
