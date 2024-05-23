import React from 'react';
import '../UserAccount/Info.css';

function AccountInfo() {
    return (
        <div className="account-info-container">
            <div className="info-top">
                <div className="circle">
                    <p className="profile-pic">A</p>
                </div>
                <p className="text-2xl">ID: </p>
            </div>
            <div className="info-stats-container">
                {/* Aici puteți adăuga componente pentru statistici, dar le-am eliminat în acest exemplu */}
            </div>
            <p className="interests-title">Interests</p>
            <div className="interests-container">
                {/* Aici puteți adăuga elemente pentru interese, dar le-am eliminat în acest exemplu */}
            </div>
        </div>
    );
}

export default AccountInfo;
