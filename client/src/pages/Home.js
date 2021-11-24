import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const loggedIn = Auth.loggedIn();
    console.log("Random", userData);

    return (
        <main>
            <div className="flex-row justify-space-between align-center">
                
                <div className="col-12 align-center ">
                    <div className='discussion-home justify-center'>
                        <div className='flex-row col-12'>
                            <Link className="col-12 justify-center text-center" to={'/discussions?category=Artificial Intelligence'} > Artificial Intelligence </Link>
                            <Link className="col-12 justify-center text-center"  to={'/discussions?category=Virtual Reality'}> Virtual Reality </Link>
                            <Link className="col-12 justify-center text-center"  to={'/discussions?category=Self-knowledge'}> Self-knowledge </Link>
                            <Link className="col-12 justify-center text-center"  to={'/discussions?category=mHealth'} > mHealth </Link>
                            <Link className="col-12 justify-center text-center"  to={'/discussions?category=Other'} > Other </Link>
                        </div>
                    </div>
                </div>

               
            </div>
        </main>
    );
};

export default Home;
