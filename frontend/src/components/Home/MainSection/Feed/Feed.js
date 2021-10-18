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
    // let postList = posts.map((post,index) => {
    //     return <Post 
    //         key={post.id}
    //         name={post.postText}
    //         postImage={post.postFile}
    //         profileImage={post.postFile}
    //         category={post.category}
    //         about={post.postSection}
    //     />
    // });
    const number_of_posts = Object.keys(post).length
    return (
        <div>
            {[...Array(number_of_posts)].map((x, i) => 
                <Post
                key={post[i].id}
                name={post[i].postText}
                postImage={post[i].postFile}
                profileImage={post[i].postFile}
                category={post[i].category}
                about={post[i].postSection}
                likesCount={post[i].likeCount}
                />)}
        </div>
    )
}


export default Feed;