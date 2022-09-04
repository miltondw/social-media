import { Box } from "@mui/material";
import React from "react";
import { AuthContext } from "../../context/auth";
import CommentBtn from "../Atom/CommentBtn";
import DeleteBtn from "../Atom/DeleteBtn";
import LikeBtn from "../Atom/LikeBtn";

export default function CardBtns({ post }) {
  const { user } = AuthContext();

  return (
    <Box>
      <LikeBtn id={post.id} likeCount={post.likeCount} likes={post.likes} />
      <CommentBtn commentCount={post.commentCount} idPost={post.id} />
      {user && user.username === post.username && <DeleteBtn id={post.id} />}
    </Box>
  );
}
