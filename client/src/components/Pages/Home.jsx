import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { GET_POSTS } from '../../apollo/gql/Get'
import CardPosts from '../Molecules/CardPosts';
function Home() {
    const { loading, error, data } = useQuery(GET_POSTS);
    const [posts, setPost] = useState([])
    useEffect(() => {
        setPost(data?.getPosts)
        console.log(posts)
    }, [data, posts])
    if (loading) return (
        <div className="Home">
            Loading...
        </div>
    );
    if (error) return <p>Error</p>
    return (
        <Container className="Home">
            <Typography sx={{ textAlign: "center", fontSize: "2em", fontWeight: "600", marginTop: '0.5em' }} variant="h1" component="h2">
                Recent Posts
            </Typography>
            {
                <CardPosts posts={posts} />
            }
        </Container>
    );
}

export default Home;
