import { useEffect, useState } from "react";
import API from "../api";

const StoresList = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    const res = await API.get("/stores");
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const rateStore = async (storeId, score) => {
    await API.post("/ratings", { storeId, score });
    fetchStores();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Stores
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <div
            key={s._id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {s.name}
            </h3>
            <p className="text-gray-500 mb-1">{s.address}</p>
            <p className="text-yellow-600 font-medium mb-3">
              ⭐ Avg Rating: {s.averageRating?.toFixed(1) || "N/A"}
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => rateStore(s._id, score)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {score}⭐
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresList;
