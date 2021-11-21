import React from 'react';
import { Link } from 'react-router-dom';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div className="flex-row justify-space-between align-center">
                
                <div className="col-12 mb-3">
                    <ul>
                        <li>
                            <Link
                                to={'/discussions?category=Artificial Intelligence'}
                            >
                                Artificial Intelligence
                                </Link>{' '}
                        </li>
                        <li>
                            <Link
                                to={'/discussions?category=Virtual Reality'}
                            >
                                Virtual Reality
                                </Link>{' '}
                        </li>
                        <li>
                            <Link
                                to={'/discussions?category=Self-knowledge'}
                            >
                                Self-knowledge
                                </Link>{' '}
                        </li>
                        <li>
                            <Link
                                to={'/discussions?category=mHealth'}
                            >
                                mHealth
                                </Link>{' '}
                        </li>
                        <li>
                            <Link
                                to={'/discussions?category=Other'}
                            >
                                Other
                                </Link>{' '}
                        </li>
                    </ul>
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

export default Home;
