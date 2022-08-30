import { gql } from "@apollo/client";

const GET_POSTS = gql`
query GetPosts{
    getPosts {
      id 
      username
      createdAt
      body
      likes {
        createdAt
        id
        username
      }
      comments {
        body
        createdAt
        id
      }
      likeCount
      commentCount
    }
  }
`;
const GET_POST = gql`
query GetPost($postId: ID!){
    getPost(postId: $postId) {
      body
    }
  }
`
export {
    GET_POSTS,
    GET_POST
}