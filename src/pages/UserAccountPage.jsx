import React from 'react';
import Navbar_superior from '../components/Navbar_Superior/Navbar_superior';
import Navbar from '../components/SideNavbar/Navbar';
import AccountInfo from '../components/UserAccount/AccountInfo';
import '../components/UserAccount/Info.css';

function UserAccountPage() {
    return (
        <div className="user-account-page">
            <Navbar_superior />
            <div className="user-account-page-content">
              <div className="user-account-sidebar">
                <Navbar />
              </div>
              <div className="user-account-info">
                <AccountInfo />
              </div>
            </div>
        </div>
    );
}

export default UserAccountPage;
