const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

const drivers = {
  1: { name: "Иван Иванов", lat: 55.75, lng: 37.61 },
  2: { name: "Пётр Петров", lat: 43.6, lng: 39.73 },
  3: { name: "Сергей Сергеев", lat: 55.75, lng: 37.61 },
};

wss.on("connection", (ws) => {
  console.log("Клиент подключен");

  const intervalId = setInterval(() => {
    Object.entries(drivers).forEach(([id, driver]) => {
      driver.lat += (Math.random() - 0.5) * 0.001;
      driver.lng += (Math.random() - 0.5) * 0.001;

      ws.send(
        JSON.stringify({
          type: "location",
          driverId: id,
          lat: driver.lat,
          lng: driver.lng,
          ts: Date.now(),
        })
      );
    });
  }, 3000);

  ws.on("close", () => {
    console.log("Клиент отключился");
    clearInterval(intervalId);
  });

  ws.on("message", (message) => {
    console.log("Сообщение от клиента:", message);

    try {
      const data = JSON.parse(message);
      if (data.type === "selectDriver" && drivers[data.driverId]) {
        ws.send(
          JSON.stringify({
            type: "driverSelected",
            driver: drivers[data.driverId],
          })
        );
      }
    } catch (err) {
      console.error("Ошибка при обработке сообщения:", err);
    }
  });
});

console.log("WebSocket сервер запущен на ws://localhost:3001");
