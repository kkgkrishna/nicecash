import React, { useEffect, useState } from "react";

const GetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiToken =
    "3vg7054aiq5kyixe1uwzxr0nuw42ftmcmqcqaiw618n6co2wq4k1fz31x32uk0kg"; // Your F2Pool API token
  const apiUrl = "https://api.f2pool.com/v2/mining_user/get";
  const payload = {
    currency: "bitcoin",
    user_name: "anup2002", // Your username
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "F2P-API-SECRET": apiToken,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        backgroundColor: "#1a202c",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#a0aec0" }}>
        F2Pool Mining Details
      </h2>

      {data?.data ? (
        <div>
          <p>
            Total Income: <strong>{data.data.total_income} BTC</strong>
          </p>
          <p>
            Total Payout: <strong>{data.data.paid} BTC</strong>
          </p>
          <p>
            Balance: <strong>{data.data.balance} BTC</strong>
          </p>
          <p>
            Yesterday's Earnings:{" "}
            <strong>{data.data.yesterday_income} BTC</strong>
          </p>
          <p>
            Worker Count: <strong>{data.data.worker_count}</strong>
          </p>
          <p>
            Hashrate: <strong>{data.data.hashrate}</strong>
          </p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default GetData;
