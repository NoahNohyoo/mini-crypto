import React, { useState, useEffect } from 'react';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import Spinner from './Spinner';
import * as config from "../config";
const headers = { withCredentials: true };

const MyAssets = () => {
    const cryptosCode = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'LUNAUSDT', 'DOTUSDT', 'DOGEUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT'];
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState({});
    const [price, setPrice] = useState([]);
    const [cryptos, setCryptos] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceNum, setTotalPriceNum] = useState(0);
    const [usdPrice, setUsdPrice] = useState(0);
    const [btcPrice, setBtcPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
    const [bnbPrice, setBnbPrice] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    const [adaPrice, setAdaPrice] = useState(0);
    const [xrpPrice, setXrpPrice] = useState(0);
    const [lunaPrice, setLunaPrice] = useState(0);
    const [dotPrice, setDotPrice] = useState(0);
    const [dogePrice, setDogePrice] = useState(0);
    const [maticPrice, setMaticPrice] = useState(0);
    const [linkPrice, setLinkPrice] = useState(0);
    const [uniPrice, setUniPrice] = useState(0);

    const amountCommas = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const amountFixed = (amount) => {
        return Number.parseFloat(amount).toFixed(2);
    }

    const checkLoading = (price) => {
        return loading ? <Spinner /> : '$' + price;
    }

    // default cyber money is $1,000,000
    const defaultCyber = 1000000;

    const checkRevenue = (price) => {
        const val = (price - defaultCyber);

        if (val < 0) {
            $("#revenue-amount").removeClass().addClass("text-danger");
        } else if (val > 0) {
            $("#revenue-amount").removeClass().addClass("text-success");
        } else {
            $("#revenue-amount").removeClass();
        }

        return loading ? <Spinner /> : '$' + amountCommas(amountFixed(val));
    }

    // default cyber money is $1,000,000
    const checkRate = (price) => {
        let val = ((price - defaultCyber) / defaultCyber) * 100;

        if (val < 0) {
            $("#revenue-rate").removeClass().addClass("text-danger");
            val = Math.floor(val * 100);
            val = val / 100;
        } else if (val > 0) {
            $("#revenue-rate").removeClass().addClass("text-success");
            val = Math.ceil(val * 100);
            val = val / 100;
        } else {
            $("#revenue-rate").removeClass();
        }

        return loading ? <Spinner /> : amountFixed(val) + '%';
    }

    const refreshPrice = async () => {
        if (assets && price.length > 0) {

            const usd = assets.usd;
            const btc = assets.btc * price[0].price;
            const eth = assets.eth * price[1].price;
            const bnb = assets.bnb * price[2].price;
            const sol = assets.sol * price[3].price;
            const ada = assets.ada * price[4].price;
            const xrp = assets.xrp * price[5].price;
            const luna = assets.luna * price[6].price;
            const dot = assets.dot * price[7].price;
            const doge = assets.doge * price[8].price;
            const matic = assets.matic * price[9].price;
            const link = assets.link * price[10].price;
            const uni = assets.uni * price[11].price;
            const total = usd + btc + eth + bnb + sol + ada + xrp + luna + dot + doge + matic + link + uni;

            setTotalPriceNum(total);
            setTotalPrice(amountCommas(amountFixed(total)));
            setBtcPrice(amountCommas(amountFixed(btc)));
            setUsdPrice(amountCommas(amountFixed(usd)));
            setEthPrice(amountCommas(amountFixed(eth)));
            setBnbPrice(amountCommas(amountFixed(bnb)));
            setSolPrice(amountCommas(amountFixed(sol)));
            setAdaPrice(amountCommas(amountFixed(ada)));
            setXrpPrice(amountCommas(amountFixed(xrp)));
            setLunaPrice(amountCommas(amountFixed(luna)));
            setDotPrice(amountCommas(amountFixed(dot)));
            setDogePrice(amountCommas(amountFixed(doge)));
            setMaticPrice(amountCommas(amountFixed(matic)));
            setLinkPrice(amountCommas(amountFixed(link)));
            setUniPrice(amountCommas(amountFixed(uni)));
            setLoading(false);
        }
    }

    const retrieveAssets = async () => {

        const userSeq = $.cookie("login_seq");
        const send_param = {
            headers,
            userSeq: userSeq,
        };
        await axios
            .post(`${config.SERVER_URL}/miniAssets/retrieveAssets`, send_param)
            .then(returnData => {
                if (returnData.data.message) {
                    // console.log(returnData.data.message);
                    setAssets(returnData.data.message);
                } else {
                    console.log(returnData.data.message);
                }

            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                'https://api.binance.com/api/v1/ticker/allPrices'
            );
            const cryptoListPrice = [];
            cryptosCode.map((crypto) => {
                const data = (response.data).find(ele => ele.symbol === crypto);
                data.price = amountFixed(data.price);
                data.symbol = (data.symbol).replace("USDT", "");
                data.symbolLower = data.symbol.toLowerCase();
                data.imgUrl = `/images/icons/icon_${data.symbol}.png`;
                cryptoListPrice.push(data);
            })
            setCryptos(cryptoListPrice);
            setPrice(cryptoListPrice);

        } catch (e) {
            console.log(e);
        }
    };

    const drawList = () => {
        return (
            cryptos.map((info) => (
                <div className="assets-item" key={info.symbol} >
                    <span>
                        <img className="icon-symbol" src={info.imgUrl} />
                        <br />{info.symbol} : {amountFixed(assets[info.symbolLower])}
                        <br />({checkLoading(eval(`${info.symbolLower}Price`))})
                    </span>
                </div >
            ))
        )
    }

    useEffect(() => {
        retrieveAssets();
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchUsers();
            refreshPrice();
        }, 1000);
        return () => clearTimeout(timerId);
    }, [cryptos]);


    return (
        <div>
            {/* My Assets */}
            <section className="page-section bg-primary">
                <div className="container px-7 px-lg-5">
                    <div className="row gx-7 gx-lg-1 justify-content-center">
                        <div className="col-lg-7 text-center">
                            <div className="assets">
                                <h2 className="text-white">My Assets in Mini Crypto</h2>
                                <div className="assets-total-item">
                                    <div className="wrap-bold mt-3"><ins><span>Total Asset Value : </span><span id="total-value" className="text-default">{checkLoading(totalPrice)}</span></ins></div>
                                    <div className="mt-3">(<span>Current Cyber Cash : </span><span className="text-primary">{checkLoading(usdPrice)}</span>)</div>
                                    <div className="wrap-bold mt-3"><span>Total Return : </span><span id="revenue-amount">{checkRevenue(totalPriceNum)}</span></div>
                                    <div className="wrap-bold mt-3"><span>Rate of Return : </span><span id="revenue-rate">{checkRate(totalPriceNum)}</span></div>
                                </div>
                                <div className="assets-list">
                                    {drawList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyAssets;