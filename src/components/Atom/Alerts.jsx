import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { List, ListItem } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerts({ type, errorValues }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    handleClick();
  }, []);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }} display="flex">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {errorValues.map((value, i) => (
          <ListItem key={i} disableGutters>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}>
              <Alert
                onClose={handleClose}
                sx={{ width: "100%", marginTop: `${i * 3.8}em` }}
                severity={type}>
                {value}
              </Alert>
            </Snackbar>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
