import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_POSTS } from "../../apollo/gql/Get";
import { AuthContext } from "../../context/auth";
import CardPosts from "../Molecules/CardPosts";
import { Container, Grid, Typography } from "@mui/material";
import PostForm from "../Molecules/PostForm";

export default function Profile() {
  const { user } = AuthContext();
  const { loading, error, data } = useQuery(GET_MY_POSTS, {
    variables: { username: user.username },
  });
  const [posts, setPost] = useState([]);
  useEffect(() => {
    setPost(data?.getMyPosts);
  }, [data]);
  if (loading) return <div className="Home">Loading...</div>;
  if (error) return <p>Error</p>;
  return (
    <Container className="Home">
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2em",
          fontWeight: "600",
          marginTop: "0.5em",
        }}
        variant="h1"
        component="h2">
        My Posts
      </Typography>
      {user && <PostForm username={user.username} />}
      <Grid
        container
        justifyContent="space-around"
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 1, md: 12 }}
        m={4}>
        <CardPosts posts={posts} />
      </Grid>
    </Container>
  );
}
