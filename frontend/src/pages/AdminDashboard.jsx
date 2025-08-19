// import { useEffect, useState } from "react";
// import API from "../api";

// const AdminDashboard=()=> {
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     API.get("/users/dashboard").then((res) => setStats(res.data));
//     API.get("/users").then((res) => setUsers(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <p>Total Users: {stats.users}</p>
//       <p>Total Stores: {stats.stores}</p>
//       <p>Total Ratings: {stats.ratings}</p>

//       <h3>Users</h3>
//       {users.map((u) => (
//         <div key={u.id}>
//           {u.name} ({u.role})
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;


import { useEffect, useState } from "react";
import API from "../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users/dashboard").then((res) => setStats(res.data));
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-blue-600">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Stores</p>
          <p className="text-2xl font-bold text-green-600">{stats.stores}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Ratings</p>
          <p className="text-2xl font-bold text-purple-600">{stats.ratings}</p>
        </div>
      </div>

      {/* Users List */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Users</h3>
      <div className="bg-white shadow rounded-xl p-4">
        {users.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {users.map((u) => (
              <li key={u.id} className="py-3 flex justify-between items-center">
                <span className="font-medium text-gray-700">{u.name}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    u.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : u.role === "OWNER"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {u.role}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
