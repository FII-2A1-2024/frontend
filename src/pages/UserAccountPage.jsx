import React, { useState, useEffect, Suspense } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import AccountInfo from "../components/UserAccount/AccountInfo";
import "../components/UserAccount/Info.css";
import UserPostList from "../components/LandingPageComponents/PostsList/UserPostList";

import axios from "axios";

const Post = React.lazy(() => import("../components/Post/post"));

function UserAccountPage() {
	const [posts, getAll] = useState([]);
	const userRole = localStorage.getItem("UserRole");

	const [loading, setLoading] = useState(true);
	const [userPostCount, setUserPostCount] = useState(0);
	const userAccount = localStorage.getItem("UserRole");
	const userId = 408; //localStorage.getItem("UserId"); // ID-ul utilizatorului curent, poți schimba cu valoarea din localStorage
	const [showReports, setShowReports] = useState(false);

	const handleDelete = (postId) => {
		axios
			.delete(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`)
			.then((response) => {
				const updatedPosts = posts.filter((post) => post.id !== postId);
				getAll(updatedPosts);
				setUserPostCount(
					updatedPosts.filter((post) => post.author_id == userId).length
				);
			})
			.catch((error) => {
				console.error("Error deleting post:", error);
			});
	};
	const handleViewReports = () => {
		setShowReports(true);
	};

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_URL_BACKEND}/posts/all`)
			.then((response) => {
				const sortedPosts = response.data.posts.sort(
					(a, b) => b.votes - a.votes
				);
				getAll(sortedPosts);
				setUserPostCount(
					sortedPosts.filter((post) => post.author_id == userId).length
				);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			{userRole === "student" ? (
				<div className="user-account-page">
					<Navbar_superior />
					<div className="user-account-page-content">
						<div className="user-account-sidebar">
							<Navbar />
						</div>
						<div className="content-wrapper">
							<div className="user-posts">{<UserPostList />}</div>
							<div className="user-account-info">
								<AccountInfo />
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="user-account-page">
					<Navbar_superior />
					<div className="user-account-page-content">
						<div className="user-account-sidebar">
							<Navbar />
						</div>
						<div className="content-wrapper">
							<div className="user-posts">{<UserPostList />}</div>
							<div className="user-account-info">
								{!showReports && <AccountInfo />}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default UserAccountPage;
