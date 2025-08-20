import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
  
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">StoreRatings</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/stores" className="text-gray-700 hover:text-blue-600">Stores</Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Signup</Link>
            </>
          ) : (
            <>
              {user.role === "admin" && <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>}
              {user.role === "owner" && <Link to="/owner" className="text-gray-700 hover:text-blue-600">Owner</Link>}
              <span className="text-gray-600">Hello, {user.email}</span>
            </>
          )}
        </div>
      </nav>

      <header className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Discover. Rate. Manage.</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          A platform where users rate stores, owners manage their shops, 
          and admins keep everything running smoothly.
        </p>
        <div className="space-x-4">
          <Link to="/stores" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ⭐ Explore Stores
          </Link>
          {!user && (
            <Link to="/signup" className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Get Started
            </Link>
          )}
        </div>
      </header>

      <section className="bg-white py-12 px-6 grid gap-6 md:grid-cols-3">
        <div className="p-6 border rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">🙋 User</h3>
          <p className="text-gray-600">Browse stores and leave your ratings.</p>
        </div>
        <div className="p-6 border rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">🏪 Owner</h3>
          <p className="text-gray-600">Manage your stores and track ratings.</p>
        </div>
        <div className="p-6 border rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">🛡️ Admin</h3>
          <p className="text-gray-600">View statistics and manage users.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} StoreRatings. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
