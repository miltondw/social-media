import Moment from "react-moment";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import CardBtns from "./CardBtns";
import { DELETE_POST } from "../../apollo/gql/Mutation";

export default function CardPosts({ posts }) {
  const urlAvatar =
    "https://www.kindpng.com/picc/m/421-4212623_gd-avatar-alien-circle-hd-png-download.png";
  return (
    <>
      {posts?.map((post) => (
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
              <CardBtns post={post} query={DELETE_POST} />
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
