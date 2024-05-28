import { Link } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "./PostList.css";
import StudentIcon from "./Icons/StudentIcon.svg";
import AdminIcon from "./Icons/AdminIcon.svg";

const Post = React.lazy(() => import("../../Post/post"));

const PostList = () => {
	const [posts, getAll] = useState([]);
	const [loading, setLoading] = useState(true);
	const userRole = localStorage.getItem("UserRole");
	const [showReports, setShowReports] = useState(false);

	const [userPostCount, setUserPostCount] = useState(0);
	const userAccount = localStorage.getItem("UserRole");
	const userId = 408; //localStorage.getItem("UserId");

	// POSTurile SUNT A USERULUI 408, ^^^^^

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

	const handleViewReports = () => {
		setShowReports(true);
	};

	return (
		<>
			{userRole === "student" ? (
				<Suspense fallback={<div>Loading...</div>}>
					<div className="topPart">
						<div className="name">
							<h2>{localStorage.getItem("UserName")}</h2>
							<div className="account-type">
								<img src={StudentIcon} alt="icon" />
								<p>Student</p>
							</div>
						</div>

						<ul>
							<li>Overview</li>
							<li>Posts</li>
							<li>Comments</li>
							<li>Upvoted</li>
							<li>Downvoted</li>
						</ul>
						<div className="leftBtn">
							<button className="createPostBtn">Create Post</button>
						</div>
					</div>
					<div className="container-posts-list">
						{posts.map((post) =>
							post.author_id == userId ? (
								<Post
									key={post.id}
									id={post.id}
									authorId={post.author_id}
									userName={localStorage.getItem("UserName")}
									title={post.title}
									content={post.description}
									upVotesCount={post.votes}
									commentsCount={post.comments_count}
									category={post.category}
									file={post.url}
								/>
							) : (
								<div key={post.id}></div>
							)
						)}
					</div>
				</Suspense>
			) : (
				<Suspense fallback={<div>Loading...</div>}>
					<div className="topPart">
						<div className="name">
							<h2>{localStorage.getItem("UserName")}</h2>
							<div className="account-type">
								<img src={AdminIcon} alt="icon" />
								<p>Admin</p>
							</div>
						</div>

						<ul>
							<li>Overview</li>
							<li>Posts</li>
							<li>Comments</li>
							<li>Upvoted</li>
							<li>Downvoted</li>
						</ul>
						<div className="leftBtn">
							<button className="createPostBtn">Create Post</button>
							<button className="createPostBtn" onClick={handleViewReports}>
								View Reports
							</button>
						</div>
					</div>
					<div className="container-posts-list">
						{showReports ? (
							<div className="topPart">
								<h3>Reported posts</h3>
								<table className="report-table">
									<thead>
										<tr>
											<th className="flex-column">Post</th>
											<th className="flex-column">Reason</th>
											<th className="flex-column">Action</th>
										</tr>
									</thead>
									<tbody>
										{posts.map((post) => (
											<tr key={post.id}>
												<td className="postItem">
													<Post
														id={post.id}
														authorId={post.author_id}
														userName={`User ${post.author_id}`}
														title={post.title}
														content={post.description}
														upVotesCount={post.votes}
														commentsCount={post.comments_count}
														category={post.category}
														className="postFix"
													/>
												</td>
												<td className="reasonBox">
													<p className="reason">Inappropriate Content</p>
												</td>
												<td className="actionBtns">
													<button className="action-button">Warn User</button>
													<button className="action-button">
														Timeout User
													</button>
													<button className="action-button">Delete Post</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							posts.map((post) =>
								post.author_id == userId ? (
									<Post
										key={post.id}
										id={post.id}
										authorId={post.author_id}
										userName={localStorage.getItem("UserName")}
										title={post.title}
										content={post.description}
										upVotesCount={post.votes}
										commentsCount={post.comments_count}
										category={post.category}
										file={post.url}
									/>
								) : (
									<div key={post.id}></div>
								)
							)
						)}
					</div>
				</Suspense>
			)}
		</>
	);
};

export default PostList;
