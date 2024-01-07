// webSocketService.ts
import { updateCryptoData } from '../Context/Crypto';
import store from '../Context/store';

const WebSocketService = () => {
  const dispatch = store.dispatch;

  const cryptoSymbols = ["btceur", "etheur", "bnbeur", "xrpeur", "dogeeur", "ltceur", "soleur", "adaeur", "trxeur"];
  const symbolSubscription = cryptoSymbols.map(label => `${label}@trade`).join('/');

  const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolSubscription}`);

  socket.onmessage = (event) => {
    const eventData = JSON.parse(event.data);
    const label = eventData.s;
    const price = parseFloat(eventData.p).toFixed(2);

    dispatch(updateCryptoData({ label, data: { label, price } }));
  };

  socket.onopen = () => {
    // console.log("WebSocket connection opened");
  };

  socket.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  // Return a cleanup function to close the WebSocket connection on component unmount
  return () => {
    socket.close();
  };
};

export default WebSocketService;
