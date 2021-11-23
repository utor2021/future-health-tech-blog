import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_DISCUSSION } from '../../utils/mutations';

const ThoughtList = ({ discussions, title }) => {
    const [removeDiscussion] = useMutation(REMOVE_DISCUSSION);
    if (discussions == null && !discussions.length ) {
        return <h3>No Thoughts Yet</h3>;
    }
    const deleteDiscussion = async (discussionId) => {
        console.log(discussionId);
        try{
            const {data} = await removeDiscussion({
                variables: {discussionId},
            });
            // console.log(data);
        }
        catch(err) {
            console.log(err);
        }
    }
const userProfile = Auth.getProfile();
console.log(userProfile);
console.log(userProfile.data.username);
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
                            {discussion.username === userProfile.data.username ? <button onClick={()=>deleteDiscussion(discussion._id)}>delete</button> : ""}
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
