import { Container, Grid } from '@material-ui/core';
import React, {useState, useCallback} from 'react';
import {Route, useParams} from 'react-router-dom';
import './Hike.css'; //import du css associé
import ReactMapGL, {Marker, Popup} from 'react-map-gl'; //composants MapBox

import {dispDifficulty, getHikeById} from '../../shared/services/functions';

import landscape from './../../assets/img/1.jpg'; //import dde l'image défault des randos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHiking, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; //icons FontAwesome

/**
 * Composant permettant l'affichage des détails d'un itinéraire demandé
 * @returns {JSX.Element}
 * @constructor
 */
function Hike(){
    const { hikeId } = useParams(); //id de la rando sélectionnée
    const theHike = getHikeById(hikeId); //la rando sélectionnée

    //Définition du positionnement de base de la map
    const [viewport, setViewport] = useState({
       latitude: (theHike.location.start.lat + theHike.location.finish.lat) / 2,
       longitude: (theHike.location.start.lng + theHike.location.finish.lng) / 2,
       width: "100%",
       height: "100%",
       zoom: 12
    });

    const [selectedMarker, setSelectedMarker] = useState(null); //pour mémoriser le marqueur sélectionné

    const IMGPATH = '/img/'; //emplacement des images de l'application

    return(
        <div className="hike-details">
            <Container maxWidth="lg">
                {theHike ?
                    //Si la rando existe
                    <div className="hike-details-content">
                        <Grid className="hike-details-content-grid">
                            <Grid item lg={6} md={6} sm={12} xs={12} className="hike-pictures">
                                {/* <img src={`/assets/img/${theHike.pictures[0]}`} /> */}
                                {theHike.pictures[0] !== undefined &&
                                    <img src={IMGPATH + theHike.pictures[0]} />
                                }
                                {theHike.pictures[0] === undefined &&
                                    //si aucune photo n'est renseignée, on affiche l'image par défaut
                                    <img src={landscape} />
                                }
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className="hike-infos">
                                <h1 className="hike-title">
                                    {theHike.title}
                                </h1>
                                <h4 className="hike-location">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {theHike.location.start.name}
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
                        {/* Petit tuto sur l'ajout de la map mapbox via React*/}
                        {/* https://www.youtube.com/watch?v=JJatzkPcmoI*/}
                        <div item lg={12} md={12} sm={12} xs={12} id={'map'}>
                            <ReactMapGL
                                {...viewport}
                                mapStyle={'mapbox://styles/clemduss/ckobemc2g10xh18nqwg3dz42p'}

                                mapboxApiAccessToken={'pk.eyJ1IjoiY2xlbWR1c3MiLCJhIjoiY2tvYmVhcW80MWJzejJ5cWs0eTluMHJ4eSJ9.Xa1ME1Y-RWPWrqy_8-h3dQ'}
                                onViewportChange={viewport =>{
                                    setViewport(viewport);
                                }}
                            >
                                {/*Ajout des marqueurs de départ et d'arrivée de la Rando*/}
                                <Marker
                                    key={theHike.hikeId}
                                    latitude={theHike.location.start.lat}
                                    longitude={theHike.location.start.lng}
                                >
                                    <button className="marker-btn" onClick={(e)=>{
                                        e.preventDefault();
                                        setSelectedMarker(theHike.location.start)
                                    }}>
                                        <img src="/img/icons/hiking-solid.svg" />
                                    </button>
                                </Marker>
                                <Marker
                                    key={theHike.hikeId}
                                    latitude={theHike.location.finish.lat}
                                    longitude={theHike.location.finish.lng}
                                >
                                    <button className="marker-btn" onClick={(e)=>{
                                        e.preventDefault();
                                        setSelectedMarker(theHike.location.finish)
                                    }}>
                                        <img src="/img/icons/mountain-solid.svg" />
                                    </button>
                                </Marker>
                                {selectedMarker &&
                                    //Affichage du détail du markeur
                                    <Popup
                                        latitude={selectedMarker.lat}
                                        longitude={selectedMarker.lng}
                                        onClose={()=>setSelectedMarker(null)}
                                    >
                                        <div>{selectedMarker.name}</div>
                                    </Popup>
                                }
                            </ReactMapGL>
                        </div>
                    </div>
                :
                    //si aucune rando n'a été trouvée selon l'ID
                    <Route render={() => <h1 style={{paddingTop: '3.5em'}}>404: page introuvable</h1>} />
                }
            </Container>
        </div>
    );
}

export default React.memo(Hike);