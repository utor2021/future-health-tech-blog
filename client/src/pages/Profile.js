import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import DiscussionForm from '../components/DiscussionForm';
import DiscussionList from '../components/DiscussionList';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME, QUERY_DISCUSSIONS } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = props => {
    const { username: userParam } = useParams();


    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });
    const user = data?.me || data?.user || {};

    const { loading: loadingDis, data: dataDis,  } = useQuery(QUERY_DISCUSSIONS, {
        variables: { username: userParam }
    });
    const dis= dataDis?.discussions || [];

    // redirect to personal profile page if username is yours
    if (
        Auth.loggedIn() &&
        Auth.getProfile().data.username === userParam
    ) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadingDis) {
        return <div>Loading...</div>;
    }
    
    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }
    console.log(dis)
    console.log(user)



    return (
        <div>
            <div className="flex-row mb-3">
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>


            </div>

            <div className="flex-row justify-space-between mb-3">
                <div className="col-12 mb-3 col-lg-8">
                    <DiscussionList discussions={dis} title={`${user.username}'s ideas...`} />
                </div>

                <div className="col-12 col-lg-3 mb-3">

                </div>
            </div>
            <div className="mb-3">{!userParam && <DiscussionForm />}</div>
        </div>
    );
};

export default Profile;
