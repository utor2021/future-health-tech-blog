import React from 'react';
import { Link } from 'react-router-dom';

const DiscussionMenu = () => {

    return (
        <div className='flex-row discussion-menu'>
                <Link className="col-2 justify-center text-center" to={'/discussions?category=Artificial Intelligence'} > Artificial Intelligence </Link>
                <Link className="col-2 justify-center text-center" to={'/discussions?category=Virtual Reality'}> Virtual Reality </Link>
                <Link className="col-2 justify-center text-center" to={'/discussions?category=Self-knowledge'}> Self-knowledge </Link>
                <Link className="col-2 justify-center text-center" to={'/discussions?category=mHealth'} > mHealth </Link>
                <Link className="col-2 justify-center text-center" to={'/discussions?category=Other'} > Other </Link>
            </div>
        
    );
};

export default DiscussionMenu;
