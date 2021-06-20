import {Container, Grid} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Route, useParams} from 'react-router-dom';
import './Hike.css'; //import du css associé
import ReactMapGL, {Marker, Popup} from 'react-map-gl'; //composants MapBox

import {dispDifficulty, getGuideById, getHikeById, getMainPicture} from '../../shared/services/functions';

import landscape from './../../assets/img/1.jpg'; //import de l'image défault des randos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHiking, faMapMarkerAlt, faMountain} from '@fortawesome/free-solid-svg-icons'; //icons FontAwesome
import Loader from "../Loader/Loader";



/**
 * Composant permettant l'affichage des détails d'un itinéraire demandé
 * @returns {JSX.Element}
 * @constructor
 */
function Hike() {
    const {hikeId} = useParams(); //id de la rando sélectionnée
    const [theHike, setTheHike] = useState(null); //la rando sélectionnée
    const [mainPicture, setMainPicture] = useState(null);
    const [loadingHike, setLoadingHike] = useState(true);
    const [guide, setGuide] = useState(null);

    const [selectedMarker, setSelectedMarker] = useState(null); //pour mémoriser le marqueur sélectionné
    //Définition du positionnement de base de la map
    const [viewport, setViewport] = useState({
        latitude: 45.899133822259564,
        longitude: 6.126098759925073,
        width: "100%",
        height: "100%",
        zoom: 12
    });

    useEffect(() => {
        getHikeById(hikeId, {setTheHike});
    }, [hikeId])

    useEffect(() => {
        if (theHike !== null) {
            getGuideById(theHike.userId, {setGuide});
            getMainPicture(hikeId, {setMainPicture});
            setViewport({
                longitude: (theHike.location.start.lng + theHike.location.summit.lng) / 2,
                latitude: (theHike.location.start.lat + theHike.location.summit.lat) / 2,
                width: "100%",
                height: "100%",
                zoom: 12
            });
            setLoadingHike(false);
        }
    }, [theHike, hikeId])

    return (
        <div key={hikeId} className="hike-details">
            {!loadingHike ?
                <Container maxWidth="lg">
                    {theHike ?
                        //Si la rando existe
                        <div className="hike-details-content">
                            <Grid className="hike-details-content-grid">
                                <Grid item lg={6} md={6} sm={12} xs={12} className="hike-pictures">
                                    {/* <img src={`/assets/img/${theHike.pictures[0]}`} /> */}
                                    {mainPicture ?
                                        <img alt={"Couverture"} src={mainPicture}/>
                                        :
                                        //si aucune photo n'est renseignée, on affiche l'image par défaut
                                        <img alt={"Couv Defaut"} src={landscape}/>
                                    }
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} className="hike-infos">
                                    <h1 className="hike-title">
                                        {theHike.title}
                                    </h1>
                                    <h4 className="hike-location">
                                        <FontAwesomeIcon icon={faMapMarkerAlt}/> {theHike.location.start.name}
                                    </h4>
                                    <h4 className="hike-location">
                                        <FontAwesomeIcon icon={faMountain}/> {theHike.altitude}
                                    </h4>
                                    {guide &&
                                    <h4 className="hike-guide">
                                        <FontAwesomeIcon
                                            icon={faHiking}/> {guide.firstname} {guide.lastname.substr(0, 1)}
                                    </h4>
                                    }
                                    <h4 className="hike-difficulty">
                                        {dispDifficulty(theHike.difficulty)}
                                    </h4>
                                    <p>
                                        {theHike.description}
                                    </p>
                                </Grid>
                            </Grid>
                            {/* Petit tuto sur l'ajout de la map mapbox via React*/}
                            {/* https://www.youtube.com/watch?v=JJatzkPcmoI*/}
                            <div id={'map'}>
                                <ReactMapGL
                                    {...viewport}
                                    mapStyle={'mapbox://styles/clemduss/ckobemc2g10xh18nqwg3dz42p'}

                                    mapboxApiAccessToken={'pk.eyJ1IjoiY2xlbWR1c3MiLCJhIjoiY2tvYmVhcW80MWJzejJ5cWs0eTluMHJ4eSJ9.Xa1ME1Y-RWPWrqy_8-h3dQ'}
                                    onViewportChange={viewport => {
                                        setViewport(viewport);
                                    }}
                                >
                                    {/*Ajout des marqueurs de départ et d'arrivée de la Rando*/}
                                    <Marker
                                        latitude={theHike.location.start.lat}
                                        longitude={theHike.location.start.lng}
                                    >
                                        <button className="marker-btn" onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedMarker(theHike.location.start)
                                        }}>
                                            <img alt={"Départ"} src="/img/icons/hiking-solid.svg"/>
                                        </button>
                                    </Marker>
                                    <Marker
                                        latitude={theHike.location.summit.lat}
                                        longitude={theHike.location.summit.lng}
                                    >
                                        <button className="marker-btn" onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedMarker(theHike.location.finish)
                                        }}>
                                            <img alt={"Sommet"} src="/img/icons/mountain-solid.svg"/>
                                        </button>
                                    </Marker>
                                    {selectedMarker &&
                                    //Affichage du détail du markeur
                                    <Popup
                                        latitude={selectedMarker.lat}
                                        longitude={selectedMarker.lng}
                                        onClose={() => setSelectedMarker(null)}
                                    >
                                        <div>{selectedMarker.name}</div>
                                    </Popup>
                                    }
                                </ReactMapGL>
                            </div>
                        </div>
                        :
                        //si aucune rando n'a été trouvée selon l'ID
                        <Route render={() => <h1 style={{paddingTop: '3.5em'}}>404: page introuvable</h1>}/>
                    }
                </Container>
                :
                <Loader/>
            }
        </div>
    );
}

export default React.memo(Hike);