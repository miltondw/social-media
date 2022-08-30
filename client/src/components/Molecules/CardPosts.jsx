import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

export default function CardPosts({ posts }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {posts?.map((post) => (
                <ListItem
                    key={post.id}
                    disableGutters
                    secondaryAction={
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                    }
                >
                    <ListItemText primary={post.body} />
                </ListItem>
            ))}
        </List>
    );
}
