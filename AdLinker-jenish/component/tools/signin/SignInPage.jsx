import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Login successful!");
        navigate("/advertiser");
      } else {
        setError(result.message || "Invalid login credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setError("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-black">Sign In</h2>
        <p className="text-center text-gray-600 mt-2">Welcome back! Please enter your credentials.</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-8" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 mt-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
          />

          <div className="flex justify-between items-center mt-4">
            <button type="button" className="text-md text-blue-500 hover:underline" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0073FF] text-white py-4 mt-6 rounded-lg text-lg hover:bg-[#005FCC] transition-all"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export { SignInPage };
