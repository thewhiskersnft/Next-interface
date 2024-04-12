"use client";
// import { createChart } from "lightweight-charts";

// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef() as any;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "height": "100%",
          "support_host": "https://www.tradingview.com"
        }`;
    container?.current?.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100vh", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100vh", width: "100%" }}
      ></div>
      {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div> */}
    </div>
  );
}

export default memo(TradingViewWidget);

// TradingViewWidget.jsx
// import React, { useEffect, useRef, memo } from "react";

// function TradingViewWidget() {
//   const container = useRef() as any;

//   //   useEffect(() => {
//   //     const script = document.createElement("script");
//   //     script.src =
//   //       "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//   //     script.type = "text/javascript";
//   //     script.async = true;
//   //     script.innerHTML = `
//   //         {
//   //           "autosize": true,
//   //           "symbol": "NASDAQ:AAPL",
//   //           "interval": "D",
//   //           "timezone": "Etc/UTC",
//   //           "theme": "dark",
//   //           "style": "1",
//   //           "locale": "en",
//   //           "enable_publishing": true,
//   //           "hide_side_toolbar": false,
//   //           "allow_symbol_change": true,
//   //           "details": true,
//   //           "calendar": false,
//   //           "support_host": "https://www.tradingview.com"
//   //         }`;
//   //     console.log(container?.current);
//   //     container?.current.appendChild(script);
//   //   }, []);

//   useEffect(() => {
//     let randomFactor = 25 + Math.random() * 25;
//     const samplePoint = (i: any) =>
//       i *
//         (0.5 +
//           Math.sin(i / 1) * 0.2 +
//           Math.sin(i / 2) * 0.4 +
//           Math.sin(i / randomFactor) * 0.8 +
//           Math.sin(i / 50) * 0.5) +
//       200 +
//       i * 2;

//     function generateData(
//       numberOfCandles = 500,
//       updatesPerCandle = 5,
//       startAt = 100
//     ) {
//       const createCandle = (val: any, time: any) => ({
//         time,
//         open: val,
//         high: val,
//         low: val,
//         close: val,
//       });

//       const updateCandle = (candle: any, val: any) => ({
//         time: candle.time,
//         close: val,
//         open: candle.open,
//         low: Math.min(candle.low, val),
//         high: Math.max(candle.high, val),
//       });

//       randomFactor = 25 + Math.random() * 25;
//       const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
//       const numberOfPoints = numberOfCandles * updatesPerCandle;
//       const initialData = [];
//       const realtimeUpdates = [];
//       let lastCandle;
//       let previousValue = samplePoint(-1);
//       for (let i = 0; i < numberOfPoints; ++i) {
//         if (i % updatesPerCandle === 0) {
//           date.setUTCDate(date.getUTCDate() + 1);
//         }
//         const time = date.getTime() / 1000;
//         let value = samplePoint(i);
//         const diff = (value - previousValue) * Math.random();
//         value = previousValue + diff;
//         previousValue = value;
//         if (i % updatesPerCandle === 0) {
//           const candle = createCandle(value, time);
//           lastCandle = candle;
//           if (i >= startAt) {
//             realtimeUpdates.push(candle);
//           }
//         } else {
//           const newCandle = updateCandle(lastCandle, value);
//           lastCandle = newCandle;
//           if (i >= startAt) {
//             realtimeUpdates.push(newCandle);
//           } else if ((i + 1) % updatesPerCandle === 0) {
//             initialData.push(newCandle);
//           }
//         }
//       }

//       return {
//         initialData,
//         realtimeUpdates,
//       };
//     }

//     const chartOptions = {
//       layout: {
//         textColor: "black",
//         background: { type: "solid", color: "white" },
//       },
//       height: 800,
//     };
//     const container = document.getElementById("container");
//     /** @type {import('lightweight-charts').IChartApi} */
//     const chart = createChart(container as any, chartOptions as any);

//     // Only needed within demo page
//     // eslint-disable-next-line no-undef
//     window.addEventListener("resize", () => {
//       chart.applyOptions({ height: 200 });
//     });

//     const series = chart.addCandlestickSeries({
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });

//     const data = generateData(2500, 20, 1000);

//     series.setData(data.initialData);
//     chart.timeScale().fitContent();
//     // chart.timeScale().scrollToPosition(5);

//     // simulate real-time data
//     function* getNextRealtimeUpdate(realtimeData: any) {
//       for (const dataPoint of realtimeData) {
//         yield dataPoint;
//       }
//       return null;
//     }
//     const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);

//     const intervalID = setInterval(() => {
//       const update = streamingDataProvider.next();
//       if (update.done) {
//         clearInterval(intervalID);
//         return;
//       }
//       series.update(update.value);
//     }, 100);

//     const styles = `
//     .buttons-container {
//         display: flex;
//         flex-direction: row;
//         gap: 8px;
//     }
//     .buttons-container button {
//         all: initial;
//         font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu,
//             sans-serif;
//         font-size: 16px;
//         font-style: normal;
//         font-weight: 510;
//         line-height: 24px; /* 150% */
//         letter-spacing: -0.32px;
//         padding: 8px 24px;
//         color: rgba(19, 23, 34, 1);
//         background-color: rgba(240, 243, 250, 1);
//         border-radius: 8px;
//         cursor: pointer;
//     }

//     .buttons-container button:hover {
//         background-color: rgba(224, 227, 235, 1);
//     }

//     .buttons-container button:active {
//         background-color: rgba(209, 212, 220, 1);
//     }
// `;

//     const stylesElement = document.createElement("style");
//     stylesElement.innerHTML = styles;
//     container?.appendChild(stylesElement);

//     const buttonsContainer = document.createElement("div");
//     buttonsContainer.classList.add("buttons-container");
//     const button = document.createElement("button");
//     button.innerText = "Go to realtime";
//     button.addEventListener("click", () =>
//       chart.timeScale().scrollToRealTime()
//     );
//     buttonsContainer.appendChild(button);

//     container?.appendChild(buttonsContainer);
//   }, []);
//   return (
//     <div
//       className="tradingview-widget-container"
//       ref={container}
//       id="container"
//       style={{ height: "100%", width: "100%" }}
//     >
//       <div
//         className="tradingview-widget-container__widget"
//         style={{ height: "calc(100% - 32px)", width: "100%" }}
//       ></div>
//       {/* <div className="tradingview-widget-copyright">
//         <a
//           href="https://www.tradingview.com/"
//           rel="noopener nofollow"
//           target="_blank"
//         >
//           <span className="blue-text">Track all markets on TradingView</span>
//         </a>
//       </div> */}
//     </div>
//   );
// }

// export default memo(TradingViewWidget);
