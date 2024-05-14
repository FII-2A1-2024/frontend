import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Fuse from 'fuse.js';

import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import News from "../components/news/News";
import SideBarChats from "../components/SideBarChats/SideBarChats";
import MultiSelect from "../components/SearchFilters/Multiselect";
import BasicSelect from '../components/SearchFilters/BasicSelect';
import "../styles/LandingPage.css";
import "../styles/SearchPage.css";

import Post from "../components/Post/post";


const filterByCategory = (post, category) => {
    const postCategory = post.category;
    return postCategory === category;
}

const exactMatch = (post, searchKeyString, searchIn) => {
    const postTitle = post.title.trim().toLowerCase();
    const postContent = post.description.trim().toLowerCase();
    const searchKeyLower = searchKeyString.trim().toLowerCase();


    // No options selected - there will be 0 results
    if (!Array.isArray(searchIn) || searchIn.length === 0) {
        return false;
    }

    if (searchIn.length === 2) {
        return postTitle.includes(searchKeyLower) || postContent.includes(searchKeyLower);
    }
    
    if (searchIn.length === 1) {
        console.log("aa" + searchIn.length);
        const searchInValue = searchIn[0].toLowerCase();
        if (searchInValue === 'title') {
            return postTitle.includes(searchKeyLower);
        } else if (searchInValue === 'content') {
            return postContent.includes(searchKeyLower);
        }
    }

    // Shouldn't be possible to reach this
    return false;
}

const SearchPage = () => {
    /* Ciprian 12 may: 
    Variable posts could be imported from PostList, but can't keep "export default PostList"
    Changes to make it work aren't worth it, the way PostList is loaded could be changed
    To limit the client from loading all the posts at once. However, the search option needs 
    to search between all the posts */
    const [posts, setPosts] = useState([]);
    const searchKey = useParams();
    const searchKeyString = searchKey.searchKey;

    const location = useLocation();
    const [loading, setLoading] = useState(true);


    const [category, setCategory] = useState(location.state?.category ?? 'All');
    const [searchIn, setSearchIn] = useState(location.state?.in ?? ['Title', 'Content']);
    const [orderBy, setOrderBy] = useState(location.state?.sort ?? 'Newest');

    // 1: Fetch all the posts
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/posts/all")
            .then((response) => {
                setPosts(response.data.posts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }, [searchKey]);

    // 2: Work around to update the variables when "location.state" updates
    // Can't be updated directly inside useEffect, will create an infinite loop
    useEffect(() => {
        const stateCategory = location.state?.category ?? 'All';
        const stateSearchIn = location.state?.searchIn ?? ['Title', 'Content'];
        const stateOrderBy = location.state?.orderBy ?? 'Newest';

        setCategory(stateCategory);
        setSearchIn(stateSearchIn);
        setOrderBy(stateOrderBy);
    }, [location]);

    // 3: Filter the restuls based on the updated variables from above
    // Memo assures to not do this continiously
    const filteredPosts = useMemo(() => {
        let filtered = posts;

        if (category !== 'All') {
            filtered = filtered.filter(post => filterByCategory(post, category));
        }

        // Exact match
        if (searchKeyString !== '""' && searchKeyString.startsWith('"') && searchKeyString.endsWith('"')) {
            const trimmedSearchKey = searchKeyString.slice(1, -1);
            filtered = filtered.filter(post => exactMatch(post, trimmedSearchKey, searchIn));
        } else // Fuzzy match
        {
            // filtered = filtered.filter(post => exactMatch(post, searchKeyString, searchIn)); // old -- exacth match

            const searchKeys = searchIn.map(field => {
                if (field === 'Title') {
                    return 'title';
                } else if (field === 'Content') {
                    return 'description';
                }
            });

            const fuse = new Fuse(filtered, {
                keys: searchKeys,
                includeScore: true,
                threshold: 0.3
            });
            const results = fuse.search(searchKeyString);
            filtered = results.map(result => result.item);
            
        }

        if (orderBy === 'Popular') {
            filtered.sort((a, b) => b.votes - a.votes);
        } else if (orderBy === 'Oldest') {
            filtered.reverse();
        }

        return filtered;
    }, [posts, category, searchIn, orderBy, searchKey]);


    /*toggle menu--> hide sidebar, dont delete this */
    const [showNavbar, setShowNavbar] = useState(true);
    const toggleNavbar = () => {
      setShowNavbar(!showNavbar);
    };

    return (
        <div className="landing-page">
    
           <Navbar_superior toggleNavbar={toggleNavbar} />
    
            <div className="landing-page-content">
                { showNavbar && <div className="landing-sidebar"> 
                <Navbar />
                </div>}
                    <div className="landing-main-content">

                    <div className="landing-posts-content">
                    <div className='search-filter-container'>
                        {/* <p className="search-filter-title">Filter</p> */}
                         <div className="search-filter-parent">
                            <form action="" className='search-filter-form' label="search-filter" name="search-filter">
                                 <div className="search-filter-child">
                                     <BasicSelect title={'Category'}
                                        values={['All', 'Courses', 'Professors', 'Students', 'Unrelated', 'Memes', 'Jobs']}
                                        onSelect={setCategory}
                                        selectedOption={category} />
                                </div>
                                <div className="search-filter-child">
                                    <MultiSelect title={'Search in'}
                                        values={['Title', 'Content']}
                                        onSelect={setSearchIn}
                                        selectedOptions={searchIn} />
                                </div>
                                <div className="search-filter-child">
                                    <BasicSelect title={'Order by'}
                                        values={['Newest', 'Oldest', 'Popular']}
                                        onSelect={setOrderBy}
                                        selectedOption={orderBy} />
                                </div>
                                { <div className="search-filter-child">
                                    <Link to={{
                                        pathname: location.pathname,
                                        state: { filters: { category: category, in: searchIn, sort: orderBy } }
                                    }}>
                                        <button type="submit" className="generic-btn">Reset</button>
                                    </Link>
                                </div> }
                            </form>

                        </div>
                    </div>
                    {loading ? (
                        <div>Loading...</div> // Display "Loading" while data is being fetched
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                userName={`User ${post.author_id}`}
                                title={post.title}
                                content={post.description}
                                upVotesCount={post.votes}
                                commentsCount={post.comments_count} // Count comments nu e în JSON
                                category={post.category}
                                file={post.url}
                            />
                        ))
                    ) : (
                        <div className="empty-posts-message" style={{ marginTop: '2rem' }}>There are no posts matching your search criteria :(</div>
                    )}
                    </div>
                </div>
                <div className="landing-side-containers">
                <SideBarChats /> <News />
                </div>

            </div>


           
  </div>
    );
}

export default SearchPage;


