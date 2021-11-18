import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_DISCUSSION } from '../../utils/mutations';
import { QUERY_DISCUSSIONS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = ({ title }) => {
    const [ideaText, setIdeaText] = useState('');
    const [topicTitle, setTitleText] = useState(title);
    const [characterIdeaCount, setIdeaCharacterCount] = useState(0);

    const [addDiscussion, { error }] = useMutation(ADD_DISCUSSION, {
        update(cache, { data: { addDiscussion } }) {
            try {
                // update thought array's cache
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
        setTitleText(title);
    };
    

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        
            
        try {
            await addDiscussion({
                variables: { ideaText, topicTitle}
            });

            // clear form value
            setIdeaText('');            
            setIdeaCharacterCount(0);
            
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterIdeaCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterIdeaCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <p>{topicTitle}</p>
                <textarea
                    placeholder="Here's a new thought..."
                    value={ideaText}
                    className="form-input col-12 col-md-9"
                    onChange={handleIdeaChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
        </button>
            </form>
        </div>
    );
};

export default ThoughtForm;
