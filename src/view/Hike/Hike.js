import React from 'react';
import { useParams } from 'react-router-dom';
import './Hike.css';


function Hike(){
    const { hikeId } = useParams();

    console.log(hikeId);

    return(
        <div style={{paddingTop: '3.5em'}}>
            Hike works for {hikeId} !
        </div>
    );
}

export default Hike;