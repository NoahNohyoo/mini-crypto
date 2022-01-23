import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import Spinner from './Spinner';
import * as config from "../config";
const headers = { withCredentials: true };

const Trade = () => {
    const history = useHistory();
    const handleToSignIn = () => {
        history.push("/signIn");
    }

    const userSeq = $.cookie("login_seq");
    if (!userSeq) handleToSignIn();


    const cryptosCode = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'LUNAUSDT', 'DOTUSDT', 'DOGEUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT'];
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState({});
    const [price, setPrice] = useState([]);
    const [cryptosCount, setCryptosCount] = useState([]);
    const [cryptos, setCryptos] = useState([]);
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
    const [inputQuantity, setInputQuantity] = useState(0);
    const [inputAmount, setInputAmount] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState('');
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [info, setInfo] = useState('');

    const amountCommas = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const amountFixed = (amount) => {
        return Number.parseFloat(amount).toFixed(2);
    }

    const checkLoading = (price) => {
        return loading ? <Spinner /> : '($' + price + ')';
    }

    const checkUSD = (price) => {
        return loading ? <Spinner /> : '(You have cyber $' + price + ')';
    }

    const checkCrypto = () => {
        return !selectedSymbol ? '' : `You have ${selectedSymbol} : ${amountFixed(cryptosCount[selectedIndex])}`;
    }

    const refreshPrice = async () => {
        if (assets && price.length > 0) {
            const usd = assets.usd;
            const btc = price[0].price;
            const eth = price[1].price;
            const bnb = price[2].price;
            const sol = price[3].price;
            const ada = price[4].price;
            const xrp = price[5].price;
            const luna = price[6].price;
            const dot = price[7].price;
            const doge = price[8].price;
            const matic = price[9].price;
            const link = price[10].price;
            const uni = price[11].price;

            setUsdPrice(amountCommas(amountFixed(usd)));
            setBtcPrice(amountCommas(amountFixed(btc)));
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
                    const data = returnData.data.message;
                    const cryptoList = [];
                    cryptoList[0] = data.btc;
                    cryptoList[1] = data.eth;
                    cryptoList[2] = data.bnb;
                    cryptoList[3] = data.sol;
                    cryptoList[4] = data.ada;
                    cryptoList[5] = data.xrp;
                    cryptoList[6] = data.luna;
                    cryptoList[7] = data.dot;
                    cryptoList[8] = data.doge;
                    cryptoList[9] = data.matic;
                    cryptoList[10] = data.link;
                    cryptoList[11] = data.uni;
                    setCryptosCount(cryptoList);
                    setAssets(data);
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

    const setQuantity = (val) => {
        setInputAmount(val * selectedPrice);
        setInputQuantity(val);
    }

    const setAmount = (val) => {
        setInputQuantity(val / selectedPrice);
        setInputAmount(val);
    }

    const goBuy = async () => {
        setInfo("");
        $("#trade-info").removeClass("text-success").addClass("text-danger");

        if (!selectedPrice) {
            setInfo("Please select a coin you want below.");
            return true;
        }

        if (inputAmount > assets.usd) {
            setInputQuantity(0);
            setInputAmount(0);
            setInfo("Not enough USD Balance.");
            return true;
        }

        if (inputAmount === 0 || inputQuantity === 0) {
            setInfo("Please enter quantity or amount.");
            return true;
        }


        const userSeq = $.cookie("login_seq");
        const send_param = {
            headers,
            userSeq: userSeq,
            symbol: selectedSymbol,
            quantity: parseFloat(amountFixed(inputQuantity)),
            amount: parseFloat(amountFixed(inputAmount)),
        };
        await axios
            .post(`${config.SERVER_URL}/miniTrade/buy`, send_param)
            .then(returnData => {
                if (returnData.data.message === "Succeed") {
                    setInputQuantity(0);
                    setInputAmount(0);
                    $("#trade-info").removeClass().addClass("text-success");
                    setInfo("Buying transaction has been successfully processed!");
                } else {
                    setInfo("Buying failed.");
                }
            })
            .catch(err => {
                console.log(err);
                setInfo("Service Error.");
            });
    }

    const goSell = async () => {
        setInfo("");
        $("#trade-info").removeClass().addClass("text-danger");

        if (!selectedPrice) {
            setInfo("Please select a coin you want below.");
            return true;
        }

        if (inputQuantity > cryptosCount[selectedIndex]) {
            setInputQuantity(0);
            setInputAmount(0);
            setInfo(`Not enough ${selectedSymbol} Balance.`);
            return true;
        }

        if (inputAmount === 0 || inputQuantity === 0) {
            setInfo("Please enter quantity or amount.");
            return true;
        }


        const userSeq = $.cookie("login_seq");
        const send_param = {
            headers,
            userSeq: userSeq,
            symbol: selectedSymbol,
            quantity: parseFloat(amountFixed(inputQuantity)),
            amount: parseFloat(amountFixed(inputAmount)),
        };
        await axios
            .post(`${config.SERVER_URL}/miniTrade/sell`, send_param)
            .then(returnData => {
                if (returnData.data.message === "Succeed") {
                    setInputQuantity(0);
                    setInputAmount(0);
                    $("#trade-info").removeClass().addClass("text-success");
                    setInfo("Selling transaction has been successfully processed!");
                } else {
                    setInfo("Selling failed.");
                }
            })
            .catch(err => {
                console.log(err);
                setInfo("Service Error.");
            });
    }

    const inputClear = () => {
        setInfo("");
        setInputQuantity(0);
        setInputAmount(0);
        setSelectedSymbol("");
        setSelectedPrice("");
        setSelectedIndex("");
        $("#trade-info").removeClass().addClass("text-danger");
        $("#trade-crypto").html(``);
        $("#trade-symbol").html(`Please select a coin you want below.`);
    }

    const setTradeTag = (symbol, price, index) => {
        inputClear();
        if (!price) {
            $("#trade-crypto").html(``);
            $("#trade-symbol").html(`Please select a coin you want below.`);

        } else {
            setSelectedSymbol(symbol);
            setSelectedPrice(price);
            setSelectedIndex(index);
            const symbolLower = symbol.toLowerCase();
            const imageUrl = `/images/icons/icon_${symbolLower}.png`;
            $("#trade-crypto").html(`You have ${symbol} : ${amountFixed(cryptosCount[index])}`);
            $("#trade-symbol").html(`<img className="icon-symbol" src=${imageUrl} /><span> ${symbol} ${checkLoading(price)}</span>`);
        }
    }

    const drawList = () => {
        return (
            cryptos.map((info, index) => (
                <div className="trade-item btn-area" onClick={() => setTradeTag(`${info.symbol}`, price[index].price, index)} key={info.symbol} >
                    <span><img className="icon-symbol" src={info.imgUrl} /> {info.symbol} {checkLoading(eval(`${info.symbolLower}Price`))}</span>
                </div >
            ))
        )
    }

    useEffect(() => {
        retrieveAssets();
    }, [inputQuantity, inputAmount]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchUsers();
            refreshPrice();
        }, 1000);
        return () => clearTimeout(timerId);
    }, [cryptos]);



    return (
        <>
            {/* Trade */}
            <section className="page-section bg-primary">
                <div className="container px-7 px-lg-5">
                    <div className="row gx-7 gx-lg-5 justify-content-center">
                        <div className="col-lg-7 text-center">
                            <div className="trade">
                                <h2 className="text-white">Trade in Mini Crypto</h2>
                                <div className="trade-total-item">
                                    <div>
                                        <div id="trade-symbol" className="text-success mb-lg-2">Please select a coin you want below.</div>
                                        <div id="trade-quantity">
                                            <span className="wrap-bold">Quantity</span>
                                            <input type="number" min="0" className="mb-lg-2 form-control" id="inputQuantity" value={inputQuantity}
                                                onChange={e => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <div id="trade-amount">
                                            <span className="wrap-bold">Amount</span>
                                            <input type="number" min="0" className="mb-lg-2 form-control" id="inputAmount" value={inputAmount}
                                                onChange={e => setAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="trade-buttons justify-content-center">
                                            <div id="trade-buy-button"><button className="btn btn-primary rounded-pill px-5 mb-02 mb-lg-2 me-lg-2" onClick={goBuy}>BUY</button></div>
                                            <div id="trade-sell-button"><button className="btn btn-info rounded-pill px-5 mb-02 mb-lg-2 me-lg-2" onClick={goSell}>SELL</button></div>
                                            <div id="trade-sell-button"><button className="btn btn-success rounded-pill px-5 mb-02 mb-lg-2 me-lg-2" onClick={inputClear}>Clear</button></div>
                                        </div>
                                        <div id="trade-usd" className="text-default mb-lg-2">{checkUSD(usdPrice)}</div>
                                        <div id="trade-crypto" className="text-secondary mb-lg-2">{checkCrypto()}</div>
                                        <div id="trade-info" className="text-danger"><span className="wrap-bold">{info}</span></div>
                                    </div>
                                </div>
                                <div className="trade-list">
                                    {drawList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Trade;