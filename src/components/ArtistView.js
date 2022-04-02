import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Artistview () {
    const { id } = useParams();
    const [ artistData, setArtistData ] = useState([]);

    return (
        <div>
            <h2>
                The id passed was: { id }
            </h2>
            <p>
                This is where the artist data goes!
            </p>
        </div>
    )
}

export default Artistview