import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://takecoveraz.benbushman98.workers.dev/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (!data.success) {
      setError("Incorrect password");
      return;
    }

    // store session
    localStorage.setItem("session", data.session);

    // notify parent
    if (onLogin) onLogin();

    // redirect to admin
    navigate("/admin");
  };

  return (
    <div className="container text-white py-5 mt-5">
      <h2 className="mt-5">Admin Login</h2>
      <input
        className="form-control my-3"
        type="password"
        value={password}
        placeholder="Enter admin password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="text-danger">{error}</div>}
      <button className="btn btn-primary mt-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
