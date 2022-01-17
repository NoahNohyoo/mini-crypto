import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SectionData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cryptosCode = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'LUNAUSDT', 'DOTUSDT', 'DOGEUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT'];
    const cryptosName = ['Bitcoin', 'Ethereum', 'BNB', 'Solana', 'Cardano', 'XRP', 'Terra', 'Polkadot', 'Dogecoin', 'Polygon', 'Chainlink', 'Uniswap'];
    const [cryptos, setCryptos] = useState([]);

    const amountCommas = (amount) => {
        amount = amount.slice(0, amount.length - 6);
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
                'https://api.binance.com/api/v1/ticker/allPrices'
            );

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

        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchUsers()
        }, 1000);
        return () => clearTimeout(timerId);
    }, [cryptos]);

    // if (loading) return <div>Data is loading...</div>;

    return (
        <>
            {cryptos.map((info) => (
                <li className="cList" key={info.symbol}>
                    <span className="item-no">{info.idx}</span>
                    <span className="item-name"><img className="icon-symbol" src={info.imgUrl} /> {info.name} {info.symbol}</span>
                    <span className="item-price">{info.amount}</span>
                    <span className="item-trade"><button className="btn btn-primary rounded-pill px-3 mb-02 mb-lg-0">Buy</button></span>
                </li>
            ))}

        </>
    )
}

export default SectionData;