import React, {useEffect, useState} from 'react';
import './NewHike.css';

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
        duration: 120
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
    const [onLoad, setOnLoad]           = useState(true) //permet de savoir si la page est en cours de chargement
    const [newHikeId, setNewHikeId]     = useState(null) //ID de la rando qui sera générée

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
        <>
        {!onLoad && newHikeId ?
            <Redirect to={`/randos/${newHikeId}`}/>
        :!onLoad ?
            <>
            {user.role > 1 ?
                <div className={"new-hike"}>
                    <Container maxWidth={"md"}>
                        Hello
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
                                    <Grid item lg={6} md={6}>
                                        <TextField
                                            type={"number"}
                                            label={"Latitude"}
                                            variant={"outlined"}
                                            value={startLat}
                                            onChange={(e)=>setStartLat(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6}>
                                        <TextField
                                            type={"number"}
                                            label={"Longitude"}
                                            variant={"outlined"}
                                            value={startLng}
                                            onChange={(e)=>setStartLng(e.target.value)}
                                        />
                                    </Grid>
                                    {/*<Grid item lg={12} md={12}>*/}
                                    {/*    <button*/}
                                    {/*        className={"button button-green-mtn"}*/}
                                    {/*        onClick={(e) => {*/}
                                    {/*            e.preventDefault();*/}

                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        Select Start*/}
                                    {/*    </button>*/}
                                    {/*</Grid>*/}
                                </Grid>
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
                                    <Grid item lg={6} md={6}>
                                        <TextField
                                            type={"number"}
                                            label={"Latitude"}
                                            variant={"outlined"}
                                            value={summitLat}
                                            onChange={(e)=>setSummitLat(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6}>
                                        <TextField
                                            type={"number"}
                                            label={"Longitude"}
                                            variant={"outlined"}
                                            value={summitLng}
                                            onChange={(e)=>setSummitLng(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
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
                            <Grid item lg={6} md={6}>
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
                            <Grid item lg={6} md={6}>
                                <TextField
                                    label={"Altitude"}
                                    variant={"outlined"}
                                    type={"number"}
                                    value={altitude}
                                    onChange={(e)=>setAltitude(e.target.value)}
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
                                    onChange={(e)=>{console.log(e.target.files); setImage(e.target.files[0])}}
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
            </>
        :
            <>
                <Loader/>
            </>
        }
        </>
    )
}