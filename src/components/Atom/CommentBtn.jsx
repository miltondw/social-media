import React from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { Badge, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CommentBtn({ commentCount, idPost }) {
  return (
    <Link to={`post/${idPost}`}>
      <Button size="large" aria-label={`show ${commentCount} new mails`}>
        <Badge badgeContent={commentCount} color="error">
          <ForumIcon />
        </Badge>
      </Button>
    </Link>
  );
}
