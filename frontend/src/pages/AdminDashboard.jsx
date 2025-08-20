import { useEffect, useState } from "react";
import API from "../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", address: "", password: "", role: "user" });
  const [newStore, setNewStore] = useState({ name: "", address: "", ownerEmail: "" });


  const fetchData = async () => {
    const statsRes = await API.get("/admin/stats");
    setStats(statsRes.data);

    const usersRes = await API.get("/admin/users");
    setUsers(usersRes.data);

    const storesRes = await API.get("/admin/stores");
    setStores(storesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const addUser = async () => {
    await API.post("/admin/users", newUser);
    setNewUser({ name: "", email: "", address: "", password: "", role: "user" });
    fetchData();
  };


  const addStore = async () => {
    await API.post("/admin/stores", newStore);
    setNewStore({ name: "", address: "", ownerEmail: "" });
    fetchData();
  };


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.address.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">

      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>


      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Stores</h3>
          <p className="text-2xl">{stats.stores}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Ratings</h3>
          <p className="text-2xl">{stats.ratings}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Filter by name, email, address, role..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

  
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
            <option value="owner">Store Owner</option>
          </select>
        </div>
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>


      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Add New Store</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={newStore.address}
            onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Owner Email"
            value={newStore.ownerEmail}
            onChange={(e) =>
              setNewStore({ ...newStore, ownerEmail: e.target.value })
            }
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={addStore}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Store
        </button>
      </div>

  
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Users List</h3>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.address}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-4">Stores List</h3>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Store Name</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border">
                  {s.averageRating ? s.averageRating.toFixed(1) : "No ratings"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
