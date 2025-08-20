import { useEffect, useState } from "react";
import API from "../api";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");


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

  const updatePassword = async () => {
    try {
      await API.put("/auth/update-password", { password: newPassword });
      setMessage("Password updated successfully ✅");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to update password ❌");
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>


      <input
        type="text"
        placeholder="Search by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />


      <div className="space-y-4">
        {filteredStores.map((s) => (
          <div
            key={s.id}
            className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="text-gray-600">{s.address}</p>
              <p>⭐ Avg Rating: {s.averageRating?.toFixed(1) || "No ratings yet"}</p>
              <p>
                Your Rating:{" "}
                {s.userRating ? s.userRating : "Not rated yet"}
              </p>
            </div>

            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => rateStore(s.id, num)}
                  className={`px-3 py-2 rounded-lg ${
                    s.userRating === num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Update Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />
        <button
          onClick={updatePassword}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Password
        </button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default UserDashboard;
