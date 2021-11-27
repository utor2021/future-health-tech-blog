import React, { useState, useEffect } from 'react';
import DiscussionList from '../components/DiscussionList';
import DiscussionForm from '../components/DiscussionForm';
import DiscussionMenu from '../components/DiscussionMenu';


import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DISCUSSIONS_TITLE } from '../utils/queries';

const Discussions = () => {
    const [discussions, setDiscussion] = useState([]);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let categoryId = params.get('category');
    const { loading, data } = useQuery(QUERY_DISCUSSIONS_TITLE, {
        variables: { topicTitle: categoryId }
    });

    useEffect(() => {
        if (!loading) {
            setDiscussion([...data.discussions]);
        }
    }, [loading])

    const loggedIn = Auth.loggedIn();
    
    return (
        <main>
            <DiscussionMenu />
            <div className="flex-row justify-space-between">
                
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <DiscussionForm title={categoryId} setDiscussion={setDiscussion} discussions={discussions} />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                            <DiscussionList setDiscussion={setDiscussion} discussions={discussions} title={categoryId}/>
                        )}
                </div>

               
            </div>
        </main>
    );
};

export default Discussions;
