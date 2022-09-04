import { Badge, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutIcon from "@mui/icons-material/FavoriteBorder";

import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../../apollo/gql/Mutation";
import { Link } from "react-router-dom";
import { GET_POSTS } from "../../apollo/gql/Get";

export default function LikeBtn({ likes, likeCount, id }) {
  const { user } = AuthContext();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [
      {
        query: GET_POSTS,
      },
      "GetPosts",
    ],
  });
  function handleLike(postId) {
    likePost({
      variables: { postId },
    });
  }
  const likeBtn = user ? (
    <Button
      size="large"
      aria-label={`show ${likeCount} new mails`}
      onClick={() => handleLike(id)}>
      <Badge badgeContent={likeCount} color="error">
        {liked ? <FavoriteIcon /> : <FavoriteOutIcon />}
      </Badge>
    </Button>
  ) : (
    <Button size="large" aria-label={`show ${likeCount} new mails`}>
      <Link to="/login">
        <Badge badgeContent={likeCount} color="error">
          <FavoriteIcon />
        </Badge>
      </Link>
    </Button>
  );

  return likeBtn;
}
