import { useState } from "react";   

const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(false);   

    const handleLike = () => {
        setLikes(likes + 1);        
        setDislikes(true);     
    }
    return (
        <div>
            <button id="likeButton" className="liked-button" onClick={handleLike }>
            {dislikes ? `❤️ Liked ${likes}` : `♡ Like ${likes}`}
            </button>
        </div>
    );
} 

export default LikeButton;  