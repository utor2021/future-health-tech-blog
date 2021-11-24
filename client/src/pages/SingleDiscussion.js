import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import DiscussionMenu from '../components/DiscussionMenu';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DISCUSSION } from '../utils/queries';

const SingleDiscussion = () => {
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
            <DiscussionMenu />
      <div className="card mb-3 mt-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
                      {discussion.username}
          </span>{' '}
          discussed on {discussion.createdAt}
        </p>
              <div className="card-body">
                  <p>{discussion.topicTitle}</p>
                  <p>{discussion.ideaText}</p>
        </div>
      </div>

          {discussion.commentCount > 0 && <CommentList comments={discussion.comments} />}

          {Auth.loggedIn() && <CommentForm discussionId={discussion._id} />}
    </div>
  );
};

export default SingleDiscussion;
