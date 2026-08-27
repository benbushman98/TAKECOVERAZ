import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import type { Show } from "../../types/show";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import EventDialog from "./EventDialog";
import { normalizeDay, WORKER_URL } from "./adminUtils";
import { todayISO } from "../../utils/date";

function Admin() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("session")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetch(`${WORKER_URL}/shows`)
      .then((res) => res.json())
      .then((data: Show[]) => {
        const sortedShows = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        setShows(sortedShows);
      });
  }, []);

  const showToast = (
    message: string,
    severity: "success" | "error" = "success",
  ) => {
    setToast({ message, severity });
  };

  const openEdit = (show: Show) =>
    setEditingShow({ ...show, day: normalizeDay(show.day) });
  const closeEdit = () => setEditingShow(null);

  const updateField = (field: keyof Show, value: string) => {
    setEditingShow((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const persistShows = async (
    nextShows: Show[],
    successMessage = "Changes saved successfully!",
  ) => {
    setLoading(true);
    const session = localStorage.getItem("session");

    try {
      const res = await fetch(`${WORKER_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-session": session ?? "",
        },
        body: JSON.stringify({ shows: nextShows }),
      });
      const data = await res.json();
      const success = res.ok && data.success;

      if (success) {
        setShows(nextShows);
      }

      showToast(
        success ? successMessage : data.error || "Save failed. Try again.",
        success ? "success" : "error",
      );

      return success;
    } catch {
      showToast("Network error. Check your connection.", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async () => {
    if (!editingShow || loading) return;

    const showToSave = {
      ...editingShow,
      day: normalizeDay(editingShow.day),
    };
    const isExistingShow = shows.some((s) => s.id === editingShow.id);
    const nextShows = isExistingShow
      ? shows.map((s) => (s.id === showToSave.id ? showToSave : s))
      : [...shows, showToSave];
    const saved = await persistShows(
      nextShows,
      isExistingShow
        ? "Show updated successfully!"
        : "Show created successfully!",
    );

    if (saved) closeEdit();
  };

  const addShow = () => {
    const maxId = shows.length > 0 ? Math.max(...shows.map((s) => s.id)) : 0;
    const newShow: Show = {
      id: maxId + 1,
      date: "",
      day: "",
      timeStart: "",
      timeEnd: "",
      title: "",
      address: "",
      link: "",
      notes: "",
    };
    setEditingShow(newShow);
  };

  const confirmDelete = async () => {
    if (confirmDeleteId === null) return;
    const nextShows = shows.filter((s) => s.id !== confirmDeleteId);
    const saved = await persistShows(nextShows, "Show deleted successfully!");

    if (saved) setConfirmDeleteId(null);
  };

  const logout = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  // Local, not `toISOString()` — that returns the UTC date, which in Arizona flips to
  // tomorrow at 17:00 and moved a show into "past" while it was still being played.
  const today = todayISO();
  const upcomingCount = shows.filter((s) => s.date >= today).length;
  const pastCount = shows.filter((s) => s.date && s.date < today).length;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0a0a0a", pt: "100px" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, md: 2 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            mb: 3,
            borderBottom: "2px solid",
            borderColor: "primary.main",
            mt: 5,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: "clamp(1.1rem, 4vw, 1.7rem)",
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "grey.600", letterSpacing: "1px" }}
            >
              Take Cover AZ · Show Management
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={logout}
            sx={{ fontWeight: "bold", letterSpacing: "1px" }}
          >
            Logout
          </Button>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: { xs: 1, md: 1.5 },
            mb: 3,
          }}
        >
          {[
            { label: "Total", value: shows.length, color: "#fff" },
            { label: "Upcoming", value: upcomingCount, color: "#28a745" },
            { label: "Past", value: pastCount, color: "#6c757d" },
          ].map(({ label, value, color }) => (
            <Box
              key={label}
              sx={{
                textAlign: "center",
                p: 1.5,
                borderRadius: 1,
                bgcolor: "#111",
                border: "1px solid #222",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "clamp(1.5rem, 5vw, 2rem)",
                  color,
                }}
              >
                {value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "grey.600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "0.65rem",
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 3,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={addShow}
            disabled={loading}
            sx={{ fontWeight: "bold", letterSpacing: "1px" }}
          >
            + Add Show
          </Button>
        </Box>

        {/* Desktop Table */}
        <TableContainer
          component={Paper}
          sx={{
            display: { xs: "none", md: "block" },
            bgcolor: "#141414",
            border: "1px solid #1e1e1e",
            borderRadius: 2,
          }}
        >
          <Table size="small" sx={{ textAlign: "center" }}>
            <TableHead sx={{ borderBottom: "2px solid", borderColor: "primary.main" }}>
              <TableRow>
                {["Date", "Day", "Time", "Venue", "Location", "Actions"].map(
                  (h) => (
                    <TableCell
                      key={h}
                      align="center"
                      sx={{
                        color: "grey.600",
                        letterSpacing: "1px",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        bgcolor: "#141414",
                      }}
                    >
                      {h}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {shows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ color: "grey.600", py: 5 }}
                  >
                    No shows yet — click &quot;+ Add Show&quot; to get started.
                  </TableCell>
                </TableRow>
              )}
              {shows.map((show) => {
                const isPast = show.date && show.date < today;
                return (
                  <TableRow
                    key={show.id}
                    sx={{
                      opacity: isPast ? 0.45 : 1,
                      borderBottom: "1px solid #1e1e1e",
                      transition: "opacity 0.2s",
                    }}
                  >
                    <TableCell align="center" sx={{ color: "white" }}>
                      {show.date || "—"}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {show.day || "—"}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {show.timeStart && show.timeEnd
                        ? `${show.timeStart} – ${show.timeEnd}`
                        : show.timeStart || "—"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontWeight: 600 }}
                    >
                      {show.title || "—"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "grey.500", fontSize: "0.75rem" }}
                    >
                      {show.address || "—"}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={loading}
                          onClick={() => openEdit(show)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          disabled={loading}
                          onClick={() => setConfirmDeleteId(show.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Mobile Cards */}
        <Box sx={{ display: { xs: "block", md: "none" }, pb: 5 }}>
          {shows.length === 0 && (
            <Typography sx={{ textAlign: "center", color: "grey.600", py: 5 }}>
              No shows yet — click &quot;+ Add Show&quot; to get started.
            </Typography>
          )}
          {shows.map((show) => {
            const isPast = show.date && show.date < today;
            return (
              <Box
                key={show.id}
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  border: "1px solid #1e1e1e",
                  borderLeft: `3px solid ${isPast ? "#444" : "#C8102E"}`,
                  opacity: isPast ? 0.55 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {show.title || "Unnamed Venue"}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      {show.day && `${show.day} · `}
                      {show.date || "No Date Set"}
                    </Typography>
                  </Box>
                  <Chip
                    label={isPast ? "PAST" : "UPCOMING"}
                    size="small"
                    color={isPast ? "default" : "error"}
                    sx={{ fontSize: "0.6rem", letterSpacing: "0.5px", ml: 1 }}
                  />
                </Box>
                {show.address && (
                  <Typography
                    sx={{ color: "grey.600", mb: 0.5, fontSize: "0.75rem" }}
                  >
                    📍 {show.address}
                  </Typography>
                )}
                {(show.timeStart || show.timeEnd) && (
                  <Typography
                    sx={{ color: "grey.600", mb: 1.5, fontSize: "0.75rem" }}
                  >
                    🕐 {show.timeStart}
                    {show.timeEnd && ` – ${show.timeEnd}`}
                  </Typography>
                )}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={loading}
                    onClick={() => openEdit(show)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    fullWidth
                    disabled={loading}
                    onClick={() => setConfirmDeleteId(show.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      <EventDialog
        open={!!editingShow}
        show={editingShow}
        loading={loading}
        isExistingShow={
          !!editingShow && shows.some((s) => s.id === editingShow.id)
        }
        onClose={closeEdit}
        onSave={saveEdit}
        onUpdateField={updateField}
      />

      <DeleteConfirmDialog
        open={confirmDeleteId !== null}
        loading={loading}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
      />

      {/* Toast */}
      <Snackbar
        open={!!toast}
        autoHideDuration={3500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity ?? "success"}
          sx={{ width: "100%" }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Admin;
