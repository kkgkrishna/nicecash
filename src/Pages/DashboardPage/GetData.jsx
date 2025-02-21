import React, { useEffect, useState } from "react";

const GetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = "xyz"; // Replace with your F2Pool username
  const currency = "bitcoin"; // Change to your mining currency (e.g., ethereum)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://172.105.61.179:4545/getAccountStatus/anup2002/3vg7054aiq5kyixe1uwzxr0nuw42ftmcmqcqaiw618n6co2wq4k1fz31x32uk0kg`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
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
    <div className="bg-gray-900 p-6 rounded-lg text-white">
      <h2 className="text-lg text-gray-400 mb-4">F2Pool Mining Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Total Income</p>
          <p className="text-xl font-semibold">{data.total_income} BTC</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Total Payout</p>
          <p className="text-xl font-semibold">{data.paid} BTC</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Balance</p>
          <p className="text-xl font-semibold">{data.balance} BTC</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Yesterday's Earnings</p>
          <p className="text-xl font-semibold">{data.yesterday_income} BTC</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Worker Count</p>
          <p className="text-xl font-semibold">{data.worker_count}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Hashrate</p>
          <p className="text-xl font-semibold">{data.hashrate}</p>
        </div>
      </div>
    </div>
  );
};

export default GetData;
