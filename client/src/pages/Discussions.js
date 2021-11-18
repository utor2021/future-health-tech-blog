import React from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DISCUSSIONS_TITLE, QUERY_ME_BASIC } from '../utils/queries';

const Discussions = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let categoryId = params.get('category');
    const { loading, data } = useQuery(QUERY_DISCUSSIONS_TITLE, {
        variables: { topicTitle: categoryId }
    });
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const discussions = data?.discussions || [];

    const loggedIn = Auth.loggedIn();
    
    return (
        <main>
            <div className="flex-row justify-space-between">
                
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <ThoughtForm title={categoryId} />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                            <ThoughtList discussions={discussions} title={categoryId}/>
                        )}
                </div>

                {loggedIn && userData ? (
                    <div className="col-12 col-lg-3 mb-3">
                        <FriendList
                            username={userData.me.username}
                            friendCount={userData.me.friendCount}
                            friends={userData.me.friends}
                        />
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default Discussions;
