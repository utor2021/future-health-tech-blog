import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DISCUSSION } from '../utils/queries';

const SingleThought = () => {
    const { id: discussionId } = useParams();

    const { loading, data } = useQuery(QUERY_DISCUSSION, {
        variables: { id: discussionId }
  });

    const discussion = data?.discussion || {};    

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
                      {discussion.username}
          </span>{' '}
          thought on {discussion.createdAt}
        </p>
              <div className="card-body">
                  <p>{discussion.topicTitle}</p>
                  <p>{discussion.ideaText}</p>
        </div>
      </div>

          {discussion.commentCount > 0 && <ReactionList comments={discussion.comments} />}

          {Auth.loggedIn() && <ReactionForm discussionId={discussion._id} />}
    </div>
  );
};

export default SingleThought;
