import "./home.scss";
import PostModal from "../PostModal/PostModal";
import { useEffect, useState } from "react";
import { fetchJson } from "../fetch";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { REACT_APP_POSTS } = process.env;

    const getPosts = async () => {
        try {
            return await fetchJson(REACT_APP_POSTS);
        } catch(e) {
            console.log(e.message);
        }
    }

    //on mount get all posts
    useEffect(() => {
        getPosts()
        .then( res => {
            setPosts(res);
        })
    }, []);

    return (
        <>
        { posts && 
            <div className="home-container">
            { posts && posts.length > 0 &&
                posts.map((post, index) => {
                    console.log(post._id)
                    console.log(posts)
                    console.log(index)
                    return (<PostModal key={index} id={post._id} posts={posts} postIndex={index} />);
                })
            }
            </div>
        }
        </>
    );
}

export default Home;