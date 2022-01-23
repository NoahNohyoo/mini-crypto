import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import * as config from "../config";

const MainListData = () => {
    const [loading, setLoading] = useState(true);
    const cryptosCode = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'LUNAUSDT', 'DOTUSDT', 'DOGEUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT'];
    const cryptosName = ['Bitcoin', 'Ethereum', 'BNB', 'Solana', 'Cardano', 'XRP', 'Terra', 'Polkadot', 'Dogecoin', 'Polygon', 'Chainlink', 'Uniswap'];
    const [cryptos, setCryptos] = useState([]);

    const amountCommas = (amount) => {
        amount = amount.slice(0, amount.length - 6);
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get(config.BINANCE_API_URL);
            const cryptoList = [];
            cryptosCode.map((crypto, index) => {
                const data = (response.data).find(ele => ele.symbol === crypto);
                data.idx = index + 1;
                data.amount = `$${amountCommas(data.price)}`;
                data.name = cryptosName[index];
                data.symbol = (data.symbol).replace("USDT", "");
                data.imgUrl = `/images/icons/icon_${data.symbol}.png`;
                cryptoList.push(data);
            })
            setCryptos(cryptoList);
            setLoading(false);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchUsers()
        }, 1000);
        return () => clearTimeout(timerId);
    }, [cryptos]);

    if (loading) return <Spinner />;

    return (
        <>
            {cryptos.map((info) => (
                <li className="cList" key={info.symbol}>
                    <span className="item-no">{info.idx}</span>
                    <span className="item-name"><img className="icon-symbol" src={info.imgUrl} /> {info.name} {info.symbol}</span>
                    <span className="item-price">{info.amount}</span>
                </li>
            ))}

        </>
    )
}

export default MainListData;