import React from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { Badge, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
export default function CommentBtn({ commentCount, idPost }) {
  const { user } = AuthContext();

  return (
    <Link to={user ? `post/${idPost}` : "/login"}>
      <Button size="large" aria-label={`show ${commentCount} new mails`}>
        <Badge badgeContent={commentCount} color="error">
          <ForumIcon />
        </Badge>
      </Button>
    </Link>
  );
}
