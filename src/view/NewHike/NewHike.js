import React, {useState} from 'react';
import './NewHike.css';

import {Redirect} from 'react-router-dom';
import {Container, Grid, TextField, InputAdornment} from "@material-ui/core";

function addNewHike(
    firebaseApp,
    title,
    startName,
    startLng,
    startLat,
    summitName,
    summitLng,
    summitLat,
    description,
    price
){
    firebaseApp.firestore().collection("hikes").add({
        title: title,
        start: {
            name: startName,
            lng: startLng,
            lat: startLat
        },
        summit: {
            name: summitName,
            lng: summitLng,
            lat: summitLat
        },
        description: description,
        price: price
    }).then(()=>{
        console.log("good pour l'ajout");
    }).catch((error)=>{
        console.log("erreur " + error.code + " | " + error.message)
    })
}

export default function NewHike({user, firebaseApp}){
    const [title, setTitle] = useState("");
    const [startName, setStartName] = useState("");
    const [startLat, setStartLat] = useState(0);
    const [startLng, setStartLng] = useState(0);
    const [summitName, setSummitName] = useState("");
    const [summitLat, setSummitLat] = useState(0);
    const [summitLng, setSummitLng] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    return(
        <>
        {user ?
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
                                            label={"Longitude"}
                                            variant={"outlined"}
                                            value={startLng}
                                            onChange={(e)=>setStartLng(e.target.value)}
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
                                </Grid>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <div>Départ</div>
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
                                            label={"Longitude"}
                                            variant={"outlined"}
                                            value={summitLng}
                                            onChange={(e)=>setSummitLng(e.target.value)}
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
                            <Grid item lg={12} md={12}>
                                <TextField
                                    endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                    label={"Prix"}
                                    variant={"outlined"}
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item lg={12} md={12} style={{display: "flex", justifyContent: "flex-end"}}>
                            <button
                                className={"button button-green-mtn"}
                                onClick={()=>addNewHike(
                                    firebaseApp,
                                    title,
                                    startName,
                                    startLng,
                                    startLat,
                                    summitName,
                                    summitLng,
                                    summitLat,
                                    description,
                                    price
                                )}
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
                <Redirect to={"/"} />
            </>
        }
        </>
    )
}