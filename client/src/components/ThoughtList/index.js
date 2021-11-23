import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../assets/delete.png';
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
              discussed on {discussion.createdAt}
                            {Auth.loggedIn() ? <button className="ml-2 left-button" onClick={() => deleteDiscussion(discussion._id)}><img src={DeleteIcon} alt="" height={20} /></button> : ""}
                        </p>
                        <div className="card-body">
                            <Link to={`/discussion/${discussion._id}`}>
                                <p>{discussion.topicTitle}</p>
                                <p>{discussion.ideaText}</p>
                                <p className="mb-0">
                                    Comments: {discussion.commentCount} || Share your{' '}
                                    {discussion.commentCount ? 'see' : 'start'} thoughts here!
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtList;
