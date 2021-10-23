import React from 'react';
import Post from './Post/Post';
import axios from 'axios';

const Feed = () => {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      axios.get('http://localhost:8000/feed/posts/', {
        headers:{
          Authorization:'dca2b2f56a51b0b883ffb1b91d679fb541305041'
        }
      }).then((response) => {
        setPost(response.data);
      });
    }, []);
  
    if (!post) return null;
    console.log(post)
    // let postList = post.map((post,index) => {
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

    // const post1 = {
    //   name: "Normie memer",
    //     category: "Meme",
    //     profileImage : "https://art.pixilart.com/13e07bd455dcf46.png",
    //     postImage:"https://miro.medium.com/max/1000/1*qHbAsMNmdWQJkzm2SUA-8w.jpeg",
    //     about: "Very cool",
    // };

    return (
        <div>
            {[...Array(number_of_posts)].map((x, i) => 
                <Post
                key={post[i].id}
                name={post[i].postText}
                postImage={post[i].postFile}
                profileImage={post[i].postFile}
                category={post[i].postSection}
                about={post[i].postCaption}
                likesCount={post[i].likeCount}
                time={post[i].createdAt}
                commentCount={post[i].commentCount}
                />)}
        </div>
    )
}


export default Feed;