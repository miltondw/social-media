import React from "react";
import { TextField, Box, List, ListItem, ListItemText } from "@mui/material";
import { UseForm } from "../../utils/hooks/index";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../apollo/gql/Mutation";
import { GET_POSTS } from "../../apollo/gql/Get";
import { useState } from "react";

export default function PostForm() {
  const [body, setBody] = useState();
  const { onSubmit, onchange, values } = UseForm(createPostCallback, body);
  const [createPost, { errors, loading }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      values.body = "";
    },
    refetchQueries: [{ query: GET_POSTS }, "GetPosts"],
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
      sx={{ flexDirection: "column", width: "40%", margin: "2em auto" }}>
      <TextField
        required
        id="body"
        name="body"
        label={errors?.body ? errors?.body : "Your Post"}
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
          sx={{ width: "28%", margin: "auto", marginTop: "10px" }}
          onClick={() => setBody({})}>
          Create Post
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
