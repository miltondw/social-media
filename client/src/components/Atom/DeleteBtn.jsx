import React from "react";
import TrashIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../apollo/gql/Mutation";
import { GET_POSTS } from "../../apollo/gql/Get";

export default function DeleteBtn({ id }) {
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }, "GetPosts"],
  });

  return (
    <Button
      size="large"
      color="error"
      onClick={() => deletePost({ variables: { postId: id } })}>
      <TrashIcon />
    </Button>
  );
}
