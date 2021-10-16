import React from 'react';
import Post from './Post/Post';
import axios from 'axios';

const Feed = () => {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      axios.get('http://localhost:8000/feed/posts/').then((response) => {
        setPost(response.data);
      });
    }, []);
    if (!post) return null;
    console.log(post)
    return (
        <div>
            <Post 
            key={post[0].id}
            name={post[0].postText}
            postImage={post[0].postFile}
            profileImage={post[0].postFile}
            category={post[0].category}
            about={post[0].postSection}
        />
        </div>
    )
}


export default Feed;