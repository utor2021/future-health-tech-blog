import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ discussions, title }) => {
    if (!discussions.length) {
        return <h3>No Thoughts Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {discussions &&
                discussions.map(discussion => (
                    <div key={discussion._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${discussion.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {discussion.username}
                            </Link>{' '}
              discussion on {discussion.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/discussion/${discussion._id}`}>
                                <p>{discussion.topicTitle}</p>
                                <p>{discussion.ideaText}</p>
                                <p className="mb-0">
                                    Reactions: {discussion.commentCount} || Click to{' '}
                                    {discussion.commentCount ? 'see' : 'start'} the discussion!
                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtList;
