import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (e) {
      console.error(e);
      if (e.response && e.response.data.msg) {
        setError(e.response.data.msg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white shadow-md rounded-md p-8 w-96">
      <form
        className="max-w-sm mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow transition duration-300 ease-in-out transform hover:scale-105"
        >
          LogIN
        </button>
        <a className="flex float-end mt-3">
        New Here?<Link to={"/signup"} className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ml-1"> Sign UP</Link>
        </a>
      </form>
      </div>
      </div>

    </>
  );
}
