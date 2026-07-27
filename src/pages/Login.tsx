import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { WORKER_URL } from "./admin/adminUtils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${WORKER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError("Incorrect username or password");
      } else {
        localStorage.setItem("session", data.session);
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
        pt: "120px",
        pb: 6,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "grey.800",
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Band logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
          <Box
            component="img"
            src="/images/take-cover_tiny.webp"
            alt="Take Cover AZ"
            sx={{ height: 80, objectFit: "contain" }}
          />
        </Box>

        {/* Lock icon + title */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ color: "white", fontSize: 24 }} />
          </Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "white",
              textTransform: "uppercase",
              letterSpacing: 3,
              lineHeight: 1,
            }}
          >
            Admin Login
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
            <Divider
              sx={{ width: 60, borderColor: "primary.main", borderWidth: 2 }}
            />
          </Box>
        </Box>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          sx={{ mb: 2 }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          sx={{ mb: error ? 1.5 : 3 }}
        />

        {error && (
          <Typography
            color="error"
            sx={{ mb: 2, fontSize: "0.875rem", textAlign: "center" }}
          >
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          onClick={handleLogin}
          sx={{
            fontWeight: "bold",
            letterSpacing: 2,
            textTransform: "uppercase",
            py: 1.5,
            fontSize: "0.9rem",
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </Card>
    </Box>
  );
}

export default Login;
