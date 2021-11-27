import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_DISCUSSION } from '../../utils/mutations';
import { QUERY_DISCUSSIONS, QUERY_ME } from '../../utils/queries';

const DiscussionForm = ({ title, setDiscussion, discussions }) => {
    const [ideaText, setIdeaText] = useState('');
    const [topicTitle, setTitleText] = useState(title);
    const [characterIdeaCount, setIdeaCharacterCount] = useState(0);

    const [addDiscussion, { error }] = useMutation(ADD_DISCUSSION, {
        update(cache, { data: { addDiscussion } }) {
            try {
                // update discussion array's cache
                // could potentially not exist yet, so wrap in a try/catch
                const { discussions } = cache.readQuery({ query: QUERY_DISCUSSIONS });
                cache.writeQuery({
                    query: QUERY_DISCUSSIONS,
                    data: { discussions: [addDiscussion, ...discussions] }
                });
            } catch (e) {
                console.error(e);
            }

            // update me object's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, discussions: [...me.discussions, addDiscussion] } }
            });
        }
    });

    // update state based on form input changes
    const handleIdeaChange = event => {
        if (event.target.value.length <= 300) {
            setIdeaText(event.target.value);
            setIdeaCharacterCount(event.target.value.length);
        }

    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const discussion = await addDiscussion({
                variables: { ideaText, topicTitle }
            });
            console.log(discussions);
            console.log(discussion.data.addDiscussion);
            setDiscussion([...discussions, discussion.data.addDiscussion]);
            setIdeaText('');
            setIdeaCharacterCount(0);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="card new-discussion">
            <p className="card-header"> Start a Discussion</p>
            <p className={`m-0 ml-2 col-11 ${characterIdeaCount === 280 || error ? 'text-error' : ''} `}>
                Character Count: {characterIdeaCount}/280
                    {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className=""
                onSubmit={handleFormSubmit}
            >
                <div className="col-11 ml-2 mr-2">
                <textarea
                    placeholder="Here's a new discussion..."
                    value={ideaText}
                    className="form-input col-10 col-md-9"
                    onChange={handleIdeaChange}
                    ></textarea>
                </div>
                <div className="flex-row justify-center" >
                <button className="btn ml-2 mr-2 " type="submit">
                        Submit
                </button>
                    </div>
            </form>
        </div>
    );
};

export default DiscussionForm;
