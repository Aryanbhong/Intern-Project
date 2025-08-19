// // import { useState } from "react";
// // import API from "../api";

// // const Signup=() => {
// //   const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await API.post("/auth/signup", form);
// //       alert("Signup successful! Please login.");
// //     } catch (err) {
// //       setError(err.response?.data?.error || "Signup failed");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Signup</h2>
// //       <input name="name" placeholder="Full Name" onChange={handleChange} />
// //       <input name="email" placeholder="Email" onChange={handleChange} />
// //       <input name="address" placeholder="Address" onChange={handleChange} />
// //       <input type="password" name="password" placeholder="Password" onChange={handleChange} />
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       <button type="submit">Register</button>
// //     </form>
// //   );
// // }

// // export default Signup;


// import { useState } from "react";
// import API from "../api";

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/auth/signup", form);
//       alert("Signup successful! Please login.");
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           Create Account
//         </h2>

//         <input
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           name="address"
//           placeholder="Address"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           Register
//         </button>

//         <p className="text-sm text-gray-600 mt-4 text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import API from "../api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user", // default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login.");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Account
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role selection */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="owner">Store Owner</option>
        </select>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

