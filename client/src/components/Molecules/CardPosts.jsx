import * as React from 'react';
import Moment from 'react-moment';
import {
    Button, Avatar, Typography, Grid, Card,
    CardContent,
    Box,
    Badge,
} from '@mui/material'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
export default function CardPosts({ posts }) {
    const urlAvatar = "https://www.kindpng.com/picc/m/421-4212623_gd-avatar-alien-circle-hd-png-download.png"
    return (
        <Grid container justifyContent="space-around"
            spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, md: 12 }}>
            {
                posts?.map(post => (
                    <Card key={post.id} sx={{ minWidth: 320, marginTop: "2em", boxShadow: "1px 1px 5px 0px #010101" }} >
                        <CardContent sx={{ padding: "1.5em" }} >
                            <Grid position="relative" item xs={2} md={12} >
                                <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="space-around" alignItems="center" >
                                    <div>
                                        <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", textTransform: "capitalize" }} variant="h2" component="h2">
                                            {post.username}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="p" >
                                            <Moment format='ddd hA' unix date={post.createdAt} />
                                        </Typography>
                                    </div>
                                    <Avatar sx={{ width: 60, height: 60 }} alt={post.username} src={urlAvatar} />
                                </Box>
                                <Link to={`post/${post.id}`}>
                                    <Typography sx={{ margin: "1em" }} variant="body2" component="h3" >
                                        {post.body}
                                    </Typography>
                                </Link>
                                <Box sx={{ position: "absolute", bottom: "-1.8em", right: "0.5em" }} >
                                    <Button size="large" aria-label="show 2 new mails" >
                                        <Badge badgeContent={2} color="error">
                                            <FavoriteIcon />
                                        </Badge>
                                    </Button>
                                    <Button size="large" aria-label="show 2 new mails" >
                                        <Badge badgeContent={2} color="error">
                                            <ForumIcon />
                                        </Badge>
                                    </Button>
                                </Box>
                            </Grid>
                        </CardContent>
                    </Card>

                )
                )
            }
        </Grid >
    );
}
