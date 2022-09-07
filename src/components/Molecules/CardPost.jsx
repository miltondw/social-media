import React from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST } from "../../apollo/gql/Get";
import { DELETE_COMMENT } from "../../apollo/gql/Mutation";
import TrashIcon from "@mui/icons-material/Delete";
import CardBtns from "./CardBtns";
import { AuthContext } from "../../context/auth";
import PostForm from "./PostForm";

export default function CardPost() {
  const { postId } = useParams();
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_POST, variables: { postId } }, "GetPosts"],
  });
  const { user } = AuthContext();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
  });
  const post = data?.getPost;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  const urlAvatar =
    "https://www.kindpng.com/picc/m/421-4212623_gd-avatar-alien-circle-hd-png-download.png";
  return (
    <>
      <Container sx={{ width: "fit-content" }}>
        <Card
          key={post.id}
          sx={{
            minWidth: 320,
            maxWidth: 320,
            marginTop: "2em",
            boxShadow: "1px 1px 5px 0px #010101",
          }}>
          <CardContent>
            <Grid position="relative" item xs={2} md={12}>
              <Box
                sx={{ flexGrow: 1 }}
                display="flex"
                justifyContent="space-around"
                alignItems="center">
                <div>
                  <Typography
                    sx={{
                      fontSize: "1.5em",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                    variant="h2"
                    component="h2">
                    {post.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="p">
                    <Moment format="ddd hA" unix date={post.createdAt} />
                  </Typography>
                </div>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt={post.username}
                  src={urlAvatar}
                />
              </Box>
              <Link to={`post/${post.id}`}>
                <Typography
                  sx={{ margin: "1em" }}
                  variant="body2"
                  component="h3">
                  {post.body}
                </Typography>
              </Link>
              <CardBtns post={post} />
            </Grid>
          </CardContent>
        </Card>{" "}
      </Container>
      <PostForm comment={true} postId={postId} />
      {post.comments.map((comment, i) => (
        <Container sx={{ width: "fit-content", margin: "1em auto" }} key={i}>
          <Card
            sx={{
              minWidth: 320,
              marginTop: "2em",
              boxShadow: "1px 1px 5px 0px #010101",
            }}>
            <CardContent>
              <Grid position="relative" item xs={2} md={12}>
                <Box
                  sx={{ flexGrow: 1 }}
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center">
                  <div>
                    <Typography
                      sx={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                      variant="h2"
                      component="h2">
                      {comment.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="p">
                      <Moment format="ddd hA" unix date={comment.createdAt} />
                    </Typography>
                  </div>
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    alt={comment.username}
                    src={urlAvatar}
                  />
                </Box>
                <Typography
                  sx={{ margin: "1em" }}
                  variant="body2"
                  component="h3">
                  {comment.body}
                </Typography>
                {user && user.username === comment.username && (
                  <Button
                    size="large"
                    color="error"
                    onClick={() =>
                      deleteComment({
                        variables: { postId, commentId: comment.id },
                      })
                    }>
                    <TrashIcon />
                  </Button>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      ))}
    </>
  );
}
