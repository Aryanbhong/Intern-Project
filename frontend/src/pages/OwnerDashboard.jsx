import { useEffect, useState } from "react";
import API from "../api";

const OwnerDashboard = () => {
  const [stats, setStats] = useState({ ratings: 0, avgRating: 0, users: 0 });
  const [ratings, setRatings] = useState([]);
  const [filter, setFilter] = useState("");


  const fetchData = async () => {
    const statsRes = await API.get("/owner/stats");
    setStats(statsRes.data);

    const ratingsRes = await API.get("/owner/ratings");
    setRatings(ratingsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  const filteredRatings = ratings.filter(
    (r) =>
      r.userName.toLowerCase().includes(filter.toLowerCase()) ||
      r.comment.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
  
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Store Owner Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

     
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Ratings</h3>
          <p className="text-2xl">{stats.ratings}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Average Rating</h3>
          <p className="text-2xl">{stats.avgRating?.toFixed(1) || 0}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Users Rated</h3>
          <p className="text-2xl">{stats.users}</p>
        </div>
      </div>

    
      <input
        type="text"
        placeholder="Search by user or comment..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

 
      <div>
        <h3 className="text-lg font-semibold mb-4">Ratings for Your Store</h3>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="p-2 border">{r.userName}</td>
                <td className="p-2 border">{r.rating}</td>
                <td className="p-2 border">{r.comment}</td>
                <td className="p-2 border">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRatings.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No ratings found.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
