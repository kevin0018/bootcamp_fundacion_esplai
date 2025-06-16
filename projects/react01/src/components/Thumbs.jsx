import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function Thumbs({ initialValue = true }) {
    // STATE: Manage thumbs-up/thumbs-down
    const [isThumbsUp, setIsThumbsUp] = useState(initialValue);

    return (
        <FontAwesomeIcon
            icon={isThumbsUp ? faThumbsUp : faThumbsDown}
            onClick={() => setIsThumbsUp(!isThumbsUp)}
            style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: isThumbsUp ? "green" : "red",
            }}
        />
    );
}

export default Thumbs;