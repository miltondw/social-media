import { useQuery } from "@apollo/client";
import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_POSTS } from "../../apollo/gql/Get";
import { AuthContext } from "../../context/auth";
import CardPosts from "../Molecules/CardPosts";
import PostForm from "../Molecules/PostForm";
function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { user } = AuthContext();
  const [posts, setPost] = useState([]);
  useEffect(() => {
    setPost(data?.getPosts);
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
        Recent Posts
      </Typography>
      {user && <PostForm />}
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

export default Home;
