// import { useEffect, useState } from "react";
// import API from "../api";
// const StoresList=()=> {
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     API.get("/stores").then((res) => setStores(res.data));
//   }, []);

//   const rateStore = async (storeId, score) => {
//     await API.post("/ratings", { storeId, score });
//     const res = await API.get("/stores");
//     setStores(res.data);
//   };

//   return (
//     <div>
//       <h2>Stores</h2>
//       {stores.map((s) => (
//         <div key={s.id}>
//           <h3>{s.name}</h3>
//           <p>{s.address}</p>
//           <p>Avg Rating: {s.averageRating.toFixed(1)}</p>
//           <button onClick={() => rateStore(s.id, 5)}>⭐ Rate 5</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StoresList;



import { useEffect, useState } from "react";
import API from "../api";

const StoresList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    API.get("/stores").then((res) => setStores(res.data));
  }, []);

  const rateStore = async (storeId, score) => {
    await API.post("/ratings", { storeId, score });
    const res = await API.get("/stores");
    setStores(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Stores
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <div
            key={s.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {s.name}
            </h3>
            <p className="text-gray-500 mb-1">{s.address}</p>
            <p className="text-yellow-600 font-medium mb-3">
              ⭐ Avg Rating: {s.averageRating.toFixed(1)}
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => rateStore(s.id, score)}
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
