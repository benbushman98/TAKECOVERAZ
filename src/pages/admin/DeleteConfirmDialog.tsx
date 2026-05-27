import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

type DeleteConfirmDialogProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteConfirmDialog({
  open,
  loading,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { background: "#141414", border: "1px solid #333" } }}
    >
      <DialogTitle sx={{ color: "white", fontWeight: "bold" }}>
        Delete this show?
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "grey.500", fontSize: "0.875rem" }}>
          This removes it from the live calendar.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{ fontWeight: "bold", minWidth: "96px" }}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
