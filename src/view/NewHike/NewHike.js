import React, {useEffect, useState} from 'react';
import './NewHike.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'; //composants MapBox

import {Redirect} from 'react-router-dom';
import {
    Container,
    Grid,
    TextField,
    InputAdornment,
    OutlinedInput,
    Box,
    Typography,
    withStyles,
    InputLabel, FormControl
} from "@material-ui/core";
import {Rating} from '@material-ui/lab';
import {Terrain} from '@material-ui/icons';
import firebaseApp from "../../shared/services/firebase";
import Loader from "../Loader/Loader";

const StyledRating = withStyles({
    iconFilled: {
        // color: '#ff6d75',
        color: '#000000',
    },
    iconHover: {
        color: '#333',
    },
})(Rating)


/**
 * Permet la création d'une nouvelle randonnée en base
 * @param title
 * @param startName
 * @param startLng
 * @param startLat
 * @param summitName
 * @param summitLng
 * @param summitLat
 * @param description
 * @param price
 * @param altitude
 * @param difficulty
 * @param image
 */
function addNewHike(
    title,
    startName,
    startLng,
    startLat,
    summitName,
    summitLng,
    summitLat,
    description,
    price,
    altitude,
    difficulty,
    duration,
    image,
    {setNewHikeId}
){
    const storage   = firebaseApp.storage("gs://adopteunguide-822a2.appspot.com");
    // const storage   = firebaseApp.storage("gs://adopte-un-guide.appspot.com");
    const db        = firebaseApp.firestore();
    
    db.collection("hikes").add({
        title: title,
        creationDate: new Date().getTime(),
        userId: firebaseApp.auth().currentUser.uid,
        location: {
            start: {
                name: startName,
                lat: parseFloat(startLat),
                lng: parseFloat(startLng)
            },
            summit: {
                name: summitName,
                lat: parseFloat(summitLat),
                lng: parseFloat(summitLng)
            }
        },
        altitude: altitude,
        difficulty: difficulty,
        description: description,
        price: price,
        duration: duration
    }).then((docRef)=>{
        //si la rando a bien été crée, on stock la photo associée en base
        storage.ref().child("images/hikes/" + docRef.id + ".jpg").put(image).then((snapshot)=>{
            // console.log(snapshot);
        })
        .then(()=>{
            //On récupère l'id seulement une fois la photo upload
            setNewHikeId(docRef.id);
        })
        .catch((error)=>{
            console.log("erreur " + error.code + " | " + error.message);
            setNewHikeId(docRef.id);
        });
    }).catch((error)=>{
        console.log("erreur " + error.code + " | " + error.message)
    })
}

export default function NewHike({user}){
    //permettent la récupéraiton des infos du formulaire
    const [title, setTitle]             = useState();
    const [startName, setStartName]     = useState();
    const [startLat, setStartLat]       = useState();
    const [startLng, setStartLng]       = useState();
    const [summitName, setSummitName]   = useState();
    const [summitLat, setSummitLat]     = useState();
    const [summitLng, setSummitLng]     = useState();
    const [description, setDescription] = useState();
    const [price, setPrice]             = useState();
    const [image, setImage]             = useState("");
    const [altitude, setAltitude]       = useState();
    const [difficulty, setDifficulty]   = useState(0);
    const [duration, setDuration]       = useState(null);
    const [onLoad, setOnLoad]           = useState(true) //permet de savoir si la page est en cours de chargement
    const [newHikeId, setNewHikeId]     = useState(null) //ID de la rando qui sera générée

    const [startLocation, setStartLocation]     = useState(null);
    const [summitLocation, setSummitLocation]   = useState(null);
    const [onSetStart, setOnSetStart]           = useState(null);
    const [onSetSummit, setOnSetSummit]         = useState(null);
    const [onSetLocation, setOnSetLocation]     = useState(null);


    const [selectedMarker, setSelectedMarker] = useState(null); //pour mémoriser le marqueur sélectionné
    //Définition du positionnement de base de la map
    const [viewport, setViewport] = useState({
        latitude: 45.899133822259564,
        longitude: 6.126098759925073,
        width: "100%",
        height: "100%",
        zoom: 12
    });

    useEffect(()=>{
        if(user){
            setOnLoad(false);
        }
    }, [user])

    useEffect(()=>{
        if(newHikeId){
            setOnLoad(false);
        }
    }, [newHikeId])

    return(
        <React.Fragment>
        {!onLoad && newHikeId ?
            <Redirect to={`/randos/${newHikeId}`}/>
        :!onLoad ?
            <>
                {user ?
                    <React.Fragment>
                        {user.role > 1 ?
                            <div className={"new-hike"}>
                                <Container maxWidth={"md"}>
                                    <Grid className={"new-hike-form"}>
                                        <Grid item lg={12} md={12}>
                                            <TextField
                                                label={"Titre"}
                                                variant={"outlined"}
                                                value={title}
                                                onChange={(e)=>setTitle(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <div>Départ</div>

                                            <Grid>
                                                <Grid item lg={12} md={12}>
                                                    <TextField
                                                        label={"Nom du lieu de départ"}
                                                        variant={"outlined"}
                                                        value={startName}
                                                        onChange={(e)=>setStartName(e.target.value)}
                                                    />
                                                </Grid>
                                                {/*<Grid item lg={6} md={6}>*/}
                                                {/*    <TextField*/}
                                                {/*        type={"number"}*/}
                                                {/*        label={"Latitude"}*/}
                                                {/*        variant={"outlined"}*/}
                                                {/*        value={startLat}*/}
                                                {/*        onChange={(e)=>setStartLat(e.target.value)}*/}
                                                {/*    />*/}
                                                {/*</Grid>*/}
                                                {/*<Grid item lg={6} md={6}>*/}
                                                {/*    <TextField*/}
                                                {/*        type={"number"}*/}
                                                {/*        label={"Longitude"}*/}
                                                {/*        variant={"outlined"}*/}
                                                {/*        value={startLng}*/}
                                                {/*        onChange={(e)=>setStartLng(e.target.value)}*/}
                                                {/*    />*/}
                                                {/*</Grid>*/}
                                            </Grid>

                                            <button
                                                className={'button button-green-mtn outlined'}
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    setOnSetLocation(true);
                                                    setOnSetStart(true);
                                                }}
                                            >
                                                Sélectionner départ
                                            </button>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <div>Sommet</div>

                                            <Grid>
                                                <Grid item lg={12} md={12}>
                                                    <TextField
                                                        label={"Nom du lieu d'arrivée"}
                                                        variant={"outlined"}
                                                        value={summitName}
                                                        onChange={(e)=>setSummitName(e.target.value)}
                                                    />
                                                </Grid>
                                                {/*<Grid item lg={6} md={6}>*/}
                                                {/*    <TextField*/}
                                                {/*        type={"number"}*/}
                                                {/*        label={"Latitude"}*/}
                                                {/*        variant={"outlined"}*/}
                                                {/*        value={summitLat}*/}
                                                {/*        onChange={(e)=>setSummitLat(e.target.value)}*/}
                                                {/*    />*/}
                                                {/*</Grid>*/}
                                                {/*<Grid item lg={6} md={6}>*/}
                                                {/*    <TextField*/}
                                                {/*        type={"number"}*/}
                                                {/*        label={"Longitude"}*/}
                                                {/*        variant={"outlined"}*/}
                                                {/*        value={summitLng}*/}
                                                {/*        onChange={(e)=>setSummitLng(e.target.value)}*/}
                                                {/*    />*/}
                                                {/*</Grid>*/}
                                            </Grid>

                                            <button
                                                className={'button button-green-mtn outlined'}
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    setOnSetLocation(true);
                                                    setOnSetSummit(true);
                                                }}
                                            >
                                                Sélectionner sommet
                                            </button>
                                        </Grid>
                                        <Grid item lg={12} md={12} style={{height: '20rem'}} id={onSetLocation ? 'new-hike-map' : ''}>
                                            {/*Catch Cursor pos https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/ */}
                                            <ReactMapGL
                                                {...viewport}
                                                mapStyle={'mapbox://styles/clemduss/ckobemc2g10xh18nqwg3dz42p'}

                                                mapboxApiAccessToken={'pk.eyJ1IjoiY2xlbWR1c3MiLCJhIjoiY2tvYmVhcW80MWJzejJ5cWs0eTluMHJ4eSJ9.Xa1ME1Y-RWPWrqy_8-h3dQ'}
                                                onViewportChange={viewport => {
                                                    setViewport(viewport);
                                                }}
                                                onClick={(e)=>{
                                                    if(onSetLocation){
                                                        if(onSetStart){
                                                            setStartLocation(e.lngLat);
                                                            setOnSetStart(false);
                                                            setStartLng(e.lngLat[0]);
                                                            setStartLat(e.lngLat[1]);
                                                        }else if(onSetSummit){
                                                            setSummitLocation(e.lngLat);
                                                            setOnSetSummit(false);
                                                            setSummitLng(e.lngLat[0]);
                                                            setSummitLat(e.lngLat[1]);
                                                        }
                                                        setOnSetLocation(false);
                                                    }
                                                }}
                                                style={{boxShadow: '0px 0px 10px black'}}
                                            >
                                                {startLocation &&
                                                <Marker
                                                    latitude={startLocation[1]}
                                                    longitude={startLocation[0]}
                                                >
                                                    <button className="marker-btn" onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedMarker({name: startName, lat: startLocation[1], lng: startLocation[0]})
                                                    }}>
                                                        <img alt={"Départ"} src="/img/icons/hiking-solid.svg"/>
                                                    </button>
                                                </Marker>
                                                }
                                                {summitLocation &&
                                                <Marker
                                                    latitude={summitLocation[1]}
                                                    longitude={summitLocation[0]}
                                                >
                                                    <button className="marker-btn" onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedMarker({name: summitName, lat: summitLocation[1], lng: summitLocation[0]})
                                                    }}>
                                                        <img alt={"Sommet"} src="/img/icons/mountain-solid.svg"/>
                                                    </button>
                                                </Marker>
                                                }
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
                                        </Grid>
                                        <Grid item lg={12} md={12}>
                                            <TextField
                                                multiline
                                                label={"Description"}
                                                variant={"outlined"}
                                                value={description}
                                                onChange={(e)=>setDescription(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={4}>
                                            <FormControl variant={"outlined"}>
                                                <InputLabel htmlFor={"hike-price"}>Prix</InputLabel>
                                                <OutlinedInput
                                                    id={"hike-price"}
                                                    label={"Prix"}
                                                    endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                                    type={"number"}
                                                    variant={"outlined"}
                                                    value={price}
                                                    onChange={(e)=>setPrice(e.target.value)}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={4}>
                                            <TextField
                                                label={"Altitude"}
                                                variant={"outlined"}
                                                type={"number"}
                                                value={altitude}
                                                onChange={(e)=>setAltitude(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={4}>
                                            <TextField
                                                label={"Durée (heure)"}
                                                variant={"outlined"}
                                                type={"number"}
                                                value={duration}
                                                onChange={(e)=>setDuration(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12}>
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Typography component="legend">Niveau de difficulté</Typography>
                                                <StyledRating
                                                    name="simple-controlled"
                                                    value={difficulty}
                                                    onChange={(event, newValue) => {
                                                        setDifficulty(newValue);
                                                    }}
                                                    icon={<Terrain fontSize="inherit" />}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12} md={12}>
                                            <input
                                                type={"file"}
                                                accept={"image/jpeg"}
                                                className={"button button-green-mtn outlined"}
                                                onChange={(e)=>{
                                                    console.log(e.target.files);
                                                    setImage(e.target.files[0]);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={12} md={12} style={{display: "flex", justifyContent: "flex-end"}}>
                                        <button
                                            className={"button button-green-mtn"}
                                            onClick={()=>{
                                                addNewHike(
                                                    title,
                                                    startName,
                                                    startLng,
                                                    startLat,
                                                    summitName,
                                                    summitLng,
                                                    summitLat,
                                                    description,
                                                    price,
                                                    altitude,
                                                    difficulty,
                                                    duration,
                                                    image,
                                                    {setNewHikeId}
                                                );
                                                setOnLoad(true);
                                            }}
                                        >Valider</button>
                                    </Grid>
                                </Container>
                            </div>
                            :
                            <Redirect to={"/"} />
                        }
                    </React.Fragment>
                    :
                    <Redirect to={"/"} />
                }
            </>

        :
            <React.Fragment>
                <Loader/>
            </React.Fragment>
        }
        </React.Fragment>
    )
}