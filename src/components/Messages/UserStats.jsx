const UserStats = ({ number, title }) => {

    return (
        <div className="info-stats">
            <p className="info-stats-number">
                {number}
            </p>
            <p className="info-stats-title">
                {title}
            </p>
        </div>
    );
};

export default UserStats