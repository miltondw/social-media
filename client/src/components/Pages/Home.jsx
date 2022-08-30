import { useQuery } from '@apollo/client';
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
        <div className="Home">
            {
                <CardPosts posts={posts} />
            }
        </div>
    );
}

export default Home;
