import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Section = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cryptosCode = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'LUNAUSDT', 'DOTUSDT', 'DOGEUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT'];
    const [cryptos, setCryptos] = useState(null);

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
            cryptosCode.map((crypto) => {
                const data = (response.data).find(ele => ele.symbol === crypto);
                data.amount = `$ ${amountCommas(data.price)}`;
                data.name = (data.symbol).replace("USDT", "");
                data.imgUrl = `/images/icons/icon_${data.name}.png`;
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

    // if (loading) return <div>로딩중..</div>;

    return (
        <div>
            {/* Main List */}
            <section className="page-section bg-primary" id="list">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">Create your cryptocurrency portfolio today</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Mini Crypto has a variety of features that make it the best place to start trading</p>
                            <ul className="card">
                                {cryptos.map((info, index) => (
                                    <li className="list-group" key={info.symbol}>
                                        <img className="icon-symbol" src={info.imgUrl} />
                                        {index + 1} {info.name} {info.symbol} {info.amount}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Section;