import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";
import TrashIcon from "@mui/icons-material/Delete";
import { DELETE_POST } from "../../apollo/gql/Mutation";
import { GET_POSTS } from "../../apollo/gql/Get";

export default function DeleteBtn({ id }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }, "GetPosts"],
  });
  return (
    <>
      <Button color="error" onClick={handleClickOpen}>
        <TrashIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this post?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={() => deletePost({ variables: { postId: id } })}
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
