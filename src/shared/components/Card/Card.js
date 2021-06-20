import React, {useEffect, useState} from 'react';
import './Card.css';
import Grid from '@material-ui/core/Grid';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faMountain} from "@fortawesome/free-solid-svg-icons";
import {Timer} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {getMainPicture, dispDifficulty, getGuideById} from "../../services/functions";


/**
 * Renvoie un temps en chaine (ex:2.5 => 2h30)
 * @param {float} time Temps en heures à convertir en chaine
 */
function timeToString(time){
    let hours = time % 24;
    let days = Math.round(time/24);
    let result = null;

    if(days > 0){
        result = `${days}j${(hours < 10 ? '0' : '') + hours}h`
    }else{
        result = `${hours}h`
    }

    return result;
}


export default function Card({...props}){
    const [mainPicture, setMainPicture] = useState("");
    const [guide, setGuide] = useState(null);

    useEffect(()=>{
        getGuideById(props.guide, {setGuide});
        getMainPicture(props.hikeId, {setMainPicture});
    }, [props.guide, props.hikeId]);

    return (
        <Grid item lg={3} md={4} sm={6} xs={12} className="card">
            <Link to={`randos/${props.hikeId}`} className="card-link">
                <div className="card-inner">
                {/* <div className="card-inner" onClick={() => openHikeDetails(this.props.hikeId)}> */}
                    <div className="card-header">
                        <div className="hike-picture">
                            { mainPicture ?
                                <div className="hike-main-picture" style={{backgroundImage: `url(${mainPicture})`}}/>
                            :
                                <div
                                    className="hike-main-picture"
                                    style={{
                                        backgroundImage: `url('/img/logo/A-logo-green.svg')`,
                                        backgroundSize: '6rem',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                />
                            }
                        </div>
                        {props.duration?
                            <div className="hike-duration" title="Temps moyen pour l'ascention">
                                <Timer/> <span>{timeToString(props.duration)}</span>
                            </div>
                        :<React.Fragment></React.Fragment>}
                        <div className="hike-difficulty" title={"Difficulté : " + props.difficulty + "/5"}>
                            {dispDifficulty(props.difficulty)}
                        </div>
                    </div>
                    <div className="card-body">
                        <h2>{props.title?props.title: "Titre"}</h2>
                        <h4><FontAwesomeIcon icon={faMapMarkerAlt} /> {props.location.start.name ? props.location.start.name : "Lieu"}</h4>
                        <h4><FontAwesomeIcon icon={faMountain} /> {props.altitude ? props.altitude : ""}m</h4>
                        <h3>{guide ? guide.firstname : ""} {guide ? guide.lastname.substr(0,1) : ""}</h3>
                        <p>{props.shortDescription ? props.shortDescription : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
                    </div>
                </div>
            </Link>
        </Grid>
    );
}