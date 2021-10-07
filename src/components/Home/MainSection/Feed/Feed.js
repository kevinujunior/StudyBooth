import React from 'react';

import Post from './Post/Post';

const Feed = () => {
    const posts = [
        {
            name: "Alien",
            category: "Sciene",
            profileImage : "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg",
            postImage: "https://yourwikis.com/wp-content/uploads/2020/01/mark-zuck-img.jpg",
            about: "See my thopda",
        },
        {
            name: "Normie memer",
            category: "Meme",
            profileImage : "https://art.pixilart.com/13e07bd455dcf46.png",
            postImage:"https://miro.medium.com/max/1000/1*qHbAsMNmdWQJkzm2SUA-8w.jpeg",
            about: "Very cool",
        },
        {
            name: "Elon",
            category: "Space",
            profileImage : "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg",
            postImage:"https://upload.wikimedia.org/wikipedia/commons/1/1d/Launch_of_Falcon_9_carrying_ORBCOMM_OG2-M1_%2816601442698%29.jpg",
            about: "How i'm gonna go to mars. 🤒",
        },
        {
            name: "Meme guy",
            category: "Meme",
            profileImage : "https://art.pixilart.com/13e07bd455dcf46.png",
            postImage:"https://memeguy.com/photos/images/ai-or-unsupervised-machine-learning--381874.jpg",
            about: "6mm thickness 😊👌",
        },
    ];

    let postList = posts.map((post,index) => {
        return <Post 
            key={index}
            name={post.name}
            postImage={post.postImage}
            profileImage={post.profileImage}
            category={post.category}
            about={post.about}
        />
    });

    return (
        <div>
            {postList}
        </div>
    )
}


export default Feed;