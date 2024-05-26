import React from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import AccountInfo from "../components/UserAccount/AccountInfo";
import "../components/UserAccount/Info.css";
import UserPostList from "../components/LandingPageComponents/PostsList/UserPostList";

function UserAccountPage() {
  return (
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
  );
}

export default UserAccountPage;
