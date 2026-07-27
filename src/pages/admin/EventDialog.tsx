import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { Show } from "../../types/show";
import { DAYS_OF_WEEK } from "./adminUtils";

type EventDialogProps = {
  show: Show | null;
  open: boolean;
  loading: boolean;
  isExistingShow: boolean;
  onClose: () => void;
  onSave: () => void;
  onUpdateField: (field: keyof Show, value: string) => void;
};

const inputSx = {
  '& .MuiInputBase-input[type="date"]': { colorScheme: "dark" },
};

function EventDialog({
  show,
  open,
  loading,
  isExistingShow,
  onClose,
  onSave,
  onUpdateField,
}: EventDialogProps) {
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { background: "#141414", border: "1px solid #2a2a2a" } }}
    >
      <DialogTitle
        sx={{
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "2px solid #C8102E",
        }}
      >
        {isExistingShow ? "Edit Show" : "Add Show"}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {show && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
              mt: 3,
            }}
          >
            <TextField
              label="Date"
              type="date"
              size="small"
              fullWidth
              value={show.date}
              onChange={(e) => onUpdateField("date", e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />
            <TextField
              label="Day"
              select
              size="small"
              fullWidth
              value={show.day}
              onChange={(e) => onUpdateField("day", e.target.value)}
            >
              <MenuItem value="">Select day</MenuItem>
              {DAYS_OF_WEEK.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Start"
              placeholder="8:00 PM"
              size="small"
              fullWidth
              value={show.timeStart}
              onChange={(e) => onUpdateField("timeStart", e.target.value)}
            />
            <TextField
              label="End"
              placeholder="11:00 PM"
              size="small"
              fullWidth
              value={show.timeEnd}
              onChange={(e) => onUpdateField("timeEnd", e.target.value)}
            />
            <TextField
              label="Venue Name"
              placeholder="e.g. Handlebar J's"
              size="small"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              value={show.title}
              onChange={(e) => onUpdateField("title", e.target.value)}
            />
            <TextField
              label="Address"
              placeholder="123 Main St, Scottsdale, AZ"
              size="small"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              value={show.address}
              onChange={(e) => onUpdateField("address", e.target.value)}
            />
            <TextField
              label="Link"
              placeholder="https://..."
              size="small"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              value={show.link}
              onChange={(e) => onUpdateField("link", e.target.value)}
            />
            <TextField
              label="Notes"
              placeholder="Any additional info..."
              size="small"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              value={show.notes}
              onChange={(e) => onUpdateField("notes", e.target.value)}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #1e1e1e", px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ fontWeight: "bold", minWidth: "112px" }}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        >
          {loading ? "Saving..." : "Save Show"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDialog;
