import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props = {
  message: string;
  open: boolean;
  response: Boolean;
};
export default function AutohideSnackbar(props: Props) {
  const [openBar, setOpen] = React.useState(props.open);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={openBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={handleClose}
        message={props.message}
      >
        <Alert
          severity={props.response ? "error" : "success"}
          style={{ marginTop: "10px", maxWidth: "40rem" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
