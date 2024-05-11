import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar_superior from "../components/Navbar_superior";
import Navbar from "../components/Navbar";
import PostList from "../components/LandingPageComponents/PostsList/PostList";
import News from "../components/news/News";
import SideBarChats from "../components/SideBarChats/SideBarChats";
import "../styles/LandingPage.css";

import Post from "../components/Post/post";

const exactMatch = (post, searchKeyString) => {
    const postTitle = post.title.trim().toLowerCase();
    const postContent = post.description.trim().toLowerCase();
    const searchKeyLower = searchKeyString.trim().toLowerCase();
    return postTitle.includes(searchKeyLower) || postContent.includes(searchKeyLower);
}

const SearchPage = () => {
    /* Variable posts could be imported from PostList, but can't keep "export default PostList"
    Changes to make it work aren't worth it, the way PostList is loaded could be changed
    To limit the client from loading all the posts at once. However, the search option needs 
    to search between all the posts */
    const [posts, setPosts] = useState([]);
    const searchKey = useParams();
    const searchKeyString = searchKey.searchKey;

    useEffect(() => {
        axios
            .get("http://localhost:3000/posts/all")
            .then((response) => {
                /* Filter */
                const filteredPosts = response.data.posts.filter(post => {

                    /* Exact match */
                    if (searchKey != '""') {
                        return exactMatch(post, searchKeyString);
                    } else {

                    }
                });

                setPosts(filteredPosts);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, [searchKey]);


    return (
        <div className="landing-page">
            <Navbar_superior />
            <div className="landing-content">
                <Navbar />
                {/* <SideBarChats /> <News /> */}
                <div className="landing-main-content">
                    {posts.length > 0 ? (
                        <>
                            <div className='search-filter-container'>
                                test
                            </div>
                            {posts.map((post) => (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    userName={`User ${post.author_id}`}
                                    title={post.title}
                                    content={post.description}
                                    upVotesCount={post.votes}
                                    commentsCount={0} // Count comments nu e în JSON
                                    category={post.category}
                                />
                            ))}
                        </>
                    ) : (
                        <div className="empty-posts-message" style={{ marginTop: '2rem' }}>There are no posts matching your search criteria :(</div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default SearchPage;