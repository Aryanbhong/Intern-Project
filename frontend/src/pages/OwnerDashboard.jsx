// import { useEffect, useState } from "react";
// import API from "../api";

// const OwnerDashboard=()=> {
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     API.get("/stores").then((res) => {
//       // filter only stores where user is owner
//       const ownerId = JSON.parse(localStorage.getItem("user"))?.id;
//       setStores(res.data.filter((s) => s.ownerId === ownerId));
//     });
//   }, []);

//   return (
//     <div>
//       <h2>My Store Ratings</h2>
//       {stores.map((s) => (
//         <div key={s.id}>
//           <h3>{s.name}</h3>
//           <p>Average Rating: {s.averageRating.toFixed(1)}</p>
//           <ul>
//             {s.ratings.map((r) => (
//               <li key={r.id}>User {r.userId}: {r.score}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default OwnerDashboard;


import { useEffect, useState } from "react";
import API from "../api";

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    API.get("/stores").then((res) => {
      const ownerId = JSON.parse(localStorage.getItem("user"))?.id;
      setStores(res.data.filter((s) => s.ownerId === ownerId));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          My Store Ratings
        </h2>

        {stores.length === 0 ? (
          <p className="text-gray-500">You don’t have any stores yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.map((s) => (
              <div
                key={s.id}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {s.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  ⭐ Average Rating:{" "}
                  <span className="font-bold text-yellow-600">
                    {s.averageRating.toFixed(1)}
                  </span>
                </p>

                <h4 className="text-gray-700 font-medium mb-2">Ratings:</h4>
                {s.ratings.length > 0 ? (
                  <ul className="space-y-2">
                    {s.ratings.map((r) => (
                      <li
                        key={r.id}
                        className="bg-gray-50 p-3 rounded-lg text-gray-700 border"
                      >
                        <span className="font-medium">User {r.userId}</span>:{" "}
                        {r.score} / 5
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No ratings yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
