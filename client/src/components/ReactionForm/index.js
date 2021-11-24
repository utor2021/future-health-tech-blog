import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';

const ReactionForm = ({ discussionId }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // update state based on form input changes
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, discussionId }
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="card new-discussion">
            <p className="card-header">Add a comment</p>
            <p className={`m-0 ml-2 col-11 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className=""
                onSubmit={handleFormSubmit}
            >
                <div className="col-11 ml-2 mr-2">
                    <textarea
                        placeholder="Leave a comment to this discussion..."
                        value={commentBody}
                        className="form-input col-10 col-md-9"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex-row justify-center" >
                    <button className="btn col-2 col-md-2" type="submit">
                        Submit
        </button>
                </div>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default ReactionForm;
