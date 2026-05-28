import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { WORKER_URL } from "./admin/adminUtils";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(
      `${WORKER_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      },
    );

    const data = await res.json();
    if (!data.success) {
      setError("Incorrect password");
      return;
    } else {
      localStorage.setItem("session", data.session);
      navigate("/admin");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        mt: "80px",
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 384 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Admin Login
        </Typography>
        <TextField
          type="password"
          label="Admin Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" sx={{ mb: 1.5 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
