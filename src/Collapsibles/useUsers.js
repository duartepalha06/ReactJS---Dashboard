// useUsers.js
import { useState, useEffect } from "react";
import axios from "axios";

const useUsers = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [randomNumberCounts, setRandomNumberCounts] = useState([0, 0, 0, 0, 0]);
  const [websocketError, setWebsocketError] = useState(false);
  const [axiosError, setAxiosError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/users");
        setUsers(response.data);
        const counts = [0, 0, 0, 0, 0];
        response.data.forEach((user) => {
          counts[user.RandomNumber - 1]++;
        });
        setRandomNumberCounts(counts);
        setAxiosError(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setAxiosError(true);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:1000");

      ws.onopen = () => {
        console.log("WebSocket Client Connected");
        setWebsocketError(false);
      };

      ws.onmessage = (message) => {
        const updatedUsers = JSON.parse(message.data);
        setUsers(updatedUsers);
        const counts = [0, 0, 0, 0, 0];
        updatedUsers.forEach((user) => {
          counts[user.RandomNumber - 1]++;
        });
        setRandomNumberCounts(counts);
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          console.log(
            `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
          );
        } else {
          console.error(
            `WebSocket connection closed unexpectedly, code=${event.code}`
          );
        }

        console.log("WebSocket closed. Reconnecting...");
        setWebsocketError(true);
        setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket encountered error: ", error.message);
        setWebsocketError(true);
        ws.close();
      };

      return () => {
        ws.close();
      };
    };

    connectWebSocket();
  }, []);

  const handleCollapsibleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return {
    activeIndex,
    setActiveIndex,
    users,
    setUsers,
    randomNumberCounts,
    setRandomNumberCounts,
    axiosError,
    websocketError,
    handleCollapsibleClick,
  };
};

export default useUsers;
