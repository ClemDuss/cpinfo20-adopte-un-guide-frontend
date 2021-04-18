import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import './Hike.css';

import {dispDifficulty} from '../../shared/services/functions';

//data
import allHikes from './../../shared/data/allHikes';

import landscape from './../../assets/img/1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHiking, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function getHike(id){
    let theHike = null;

    allHikes.forEach(someHike => {
        if(someHike.hikeId == id){
            theHike = someHike;
        }
    });

    return theHike;
}

function Hike(){
    const { hikeId } = useParams();
    const theHike = getHike(hikeId);
    console.log(theHike)

    const IMGPATH = '/img/';

    return(
        <div className="hike-details">
            <Container maxWidth="lg">
                {theHike != null &&
                    <Grid className="hike-details-content">
                        <Grid item lg={6} md={6} sm={12} xs={12} className="hike-pictures">
                            {/* <img src={`/assets/img/${theHike.pictures[0]}`} /> */}
                            {theHike.pictures[0] != undefined &&
                                <img src={IMGPATH + theHike.pictures[0]} />
                            }
                            {theHike.pictures[0] == undefined &&
                                <img src={landscape} />
                            }
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className="hike-infos">
                            <h1 className="hike-title">
                                {theHike.title}
                            </h1>
                            <h4 className="hike-location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> {theHike.location}
                            </h4>
                            <h4 className="hike-guide">
                                <FontAwesomeIcon icon={faHiking} /> {theHike.guide}
                            </h4>
                            <h4 className="hike-difficulty">
                                {dispDifficulty(theHike.difficulty)}
                            </h4>
                            <p>
                                {theHike.shortDescription}
                            </p>
                        </Grid>
                    </Grid>
                }
                {theHike == null &&
                    <div>Rando introuvable</div>
                }
            </Container>
        </div>
    );
}

export default Hike;