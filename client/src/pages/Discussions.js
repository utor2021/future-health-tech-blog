import React from 'react';
import DiscussionList from '../components/DiscussionList';
import DiscussionForm from '../components/DiscussionForm';
import DiscussionMenu from '../components/DiscussionMenu';


import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DISCUSSIONS_TITLE } from '../utils/queries';

const Discussions = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let categoryId = params.get('category');
    const { loading, data } = useQuery(QUERY_DISCUSSIONS_TITLE, {
        variables: { topicTitle: categoryId }
    });

    const discussions = data?.discussions || [];
    console.log(categoryId);
    console.log(discussions);
    const loggedIn = Auth.loggedIn();
    
    return (
        <main>
            <DiscussionMenu />
            <div className="flex-row justify-space-between">
                
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <DiscussionForm title={categoryId} />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                            <DiscussionList discussions={discussions} title={categoryId}/>
                        )}
                </div>

               
            </div>
        </main>
    );
};

export default Discussions;
