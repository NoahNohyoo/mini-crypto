import React, { useState, useEffect } from 'react';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import Spinner from './Spinner';
const headers = { withCredentials: true };

const MyAssets = () => {
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState({});
    const [price, setPrice] = useState([]);
    const cryptosCode = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'LUNAUSDT', 'DOTUSDT', 'DOGEUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT'];
    const [cryptos, setCryptos] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
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
            // .post("http://localhost:8080/miniAssets/retrieveAssets", send_param)
            .post("http://174.6.121.176:8080/miniAssets/retrieveAssets", send_param)
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
                data.symbol = (data.symbol).replace("USDT", "");
                data.price = amountFixed(data.price);
                cryptoListPrice.push(data);
            })
            setCryptos(cryptoListPrice);
            setPrice(cryptoListPrice);

        } catch (e) {
            console.log(e);
        }
    };

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
        <>
            {/* My Assets */}
            <section className="page-section bg-primary">
                <div className="container px-8 px-lg-5">
                    <div className="row gx-8 gx-lg-1 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="assets">
                                <h2 className="text-white">My Assets in Mini Crypto</h2>
                                <div className="assets-total-item">
                                    <div><span>Total Asset Value : </span>{checkLoading(totalPrice)}</div>
                                    <div>(<span>USD : </span>{checkLoading(usdPrice)})</div>
                                </div>
                                <section className="assets-section">
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_btc.png" /> BTC : {amountFixed(assets.btc)}</span>
                                        (<span></span>{checkLoading(btcPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_eth.png" /> ETH : {amountFixed(assets.eth)}</span>
                                        (<span></span>{checkLoading(ethPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_bnb.png" /> BNB : {amountFixed(assets.bnb)}</span>
                                        (<span></span>{checkLoading(bnbPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_sol.png" /> SOL : {amountFixed(assets.sol)}</span>
                                        (<span></span>{checkLoading(solPrice)})
                                    </div>
                                </section>
                                <section className="assets-section">
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_ada.png" /> ADA : {amountFixed(assets.ada)}</span>
                                        (<span></span>{checkLoading(adaPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_xrp.png" /> XRP : {amountFixed(assets.xrp)}</span>
                                        (<span></span>{checkLoading(xrpPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_luna.png" /> LUNA : {amountFixed(assets.luna)}</span>
                                        (<span></span>{checkLoading(lunaPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_dot.png" /> DOT : {amountFixed(assets.dot)}</span>
                                        (<span></span>{checkLoading(dotPrice)})
                                    </div>
                                </section>
                                <section className="assets-section">
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_doge.png" /> DOGE : {amountFixed(assets.doge)}</span>
                                        (<span></span>{checkLoading(dogePrice)})
                                    </div>

                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_matic.png" /> MATIC : {amountFixed(assets.matic)}</span>
                                        (<span></span>{checkLoading(maticPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_link.png" /> LINK : {amountFixed(assets.link)}</span>
                                        (<span></span>{checkLoading(linkPrice)})
                                    </div>
                                    <div className="assets-item">
                                        <span><img className="icon-symbol" src="/images/icons/icon_uni.png" /> UNI : {amountFixed(assets.uni)}</span>
                                        (<span></span>{checkLoading(uniPrice)})
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyAssets;