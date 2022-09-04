import React from "react";
import { TextField, Box, List, ListItem, ListItemText } from "@mui/material";
import { UseForm } from "../../utils/hooks/index";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation } from "@apollo/client";
import { CREATE_POST, CREATE_COMMENT } from "../../apollo/gql/Mutation";
import { GET_POSTS, GET_POST } from "../../apollo/gql/Get";

export default function PostForm({ comment, postId }) {
  const mutation = comment ? CREATE_COMMENT : CREATE_POST;
  const state = { body: "" };
  if (comment) state.postId = postId;
  const refetchQueries = !comment
    ? [{ query: GET_POSTS }, "GetPosts"]
    : [{ query: GET_POST, variables: { postId } }, "GetPost"];

  if (comment) state.postId = postId;
  const { onSubmit, onchange, values } = UseForm(createPostCallback, state);
  const [createPost, { errors, loading }] = useMutation(mutation, {
    update(proxy, result) {
      values.body = "";
    },
    refetchQueries,
    onError(err) {
      console.error(err, "error");
    },
    variables: values,
  });
  function createPostCallback() {
    createPost();
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      display="flex"
      sx={{ flexDirection: "column", width: "23%", margin: "2em auto" }}>
      <TextField
        required
        id="body"
        name="body"
        label={
          errors?.body ? errors?.body : `Your ${comment ? "Comment" : "Post"}`
        }
        error={errors?.body ? true : false}
        value={values.body}
        autoComplete="current-body"
        variant="standard"
        onChange={onchange}
      />

      {
        <LoadingButton
          loading={loading}
          loadingPosition={loading ? "start" : null}
          startIcon={loading ? <SaveIcon /> : ""}
          variant="outlined"
          type="submit"
          sx={{ width: "fit-content", margin: "auto", marginTop: "10px" }}>
          {`Create ${comment ? "Comment" : "Post"}`}
        </LoadingButton>
      }
      {errors && (
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {Object.values(errors).map((error) => (
            <ListItem key={error}>
              <ListItemText sx={{ color: "red" }} primary={error} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
