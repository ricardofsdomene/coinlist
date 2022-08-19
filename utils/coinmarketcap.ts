import axios from "axios";

export function getCoinMarketCapData() {
    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {
                    'X-CMC_PRO_API_KEY': '617f8925-959c-4aab-8865-fd0d011fe06b',
                },
            });
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            resolve(json);
            return json;
        }
    });
}