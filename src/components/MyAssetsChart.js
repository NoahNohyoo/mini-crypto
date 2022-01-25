import React, { useEffect } from "react";

const MyAssetsChart = ({ assets, price }) => {
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

    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = `         
            function initChart() {
                google.charts.load("current", { packages: ["corechart"] });
                google.charts.setOnLoadCallback(drawChart);
                function drawChart() {
                    const data = google.visualization.arrayToDataTable([
                        ["symbol", "quantity"],
                        ["CyberCash", ${usd}],
                        ["Bitcoin(BTC)", ${btc}],
                        ["Ethereum(ETH)", ${eth}],
                        ["BNB(BNB)", ${bnb}],
                        ["Solana(SOL)", ${sol}],
                        ["Cardano(ADA)", ${ada}],
                        ["XRP(XRP)", ${xrp}],
                        ["Terra(LUNA)", ${luna}],
                        ["Polkadot(DOT)", ${dot}],
                        ["Dogecoin(DOGE)", ${doge}],
                        ["Polygon(MATIC)", ${matic}],
                        ["Chainlink(LINK)", ${link}],
                        ["Uniswap(UNI)", ${uni}],
                    ]);
                    const cryptosName = ['Bitcoin', 'Ethereum', 'BNB', 'Solana', 'Cardano', 'XRP', 'Terra', 'Polkadot', 'Dogecoin', 'Polygon', 'Chainlink', 'Uniswap'];
                    const options = {
                        title: "Assets Chart",
                        pieHole: 0.3,
                    };

                    const chart = new google.visualization.PieChart(
                        document.getElementById("donutChart")
                    );
                    chart.draw(data, options);
                }
            }
            initChart();
       `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script);
    }, [price]);

    return (
        <div className="assets-chat-item" id="donutChart"></div>
    )
}

export default MyAssetsChart;