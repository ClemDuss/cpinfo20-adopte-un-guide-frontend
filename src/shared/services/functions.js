import React from 'react';
import {Terrain, TerrainOutlined} from '@material-ui/icons';
import firebaseApp from "./firebase";

/**
 * Va rnevoyer les 5 icons de difficulté pour matérialiser le chiffre renseigné
 * @param {int} difficulty Niveau de difficulté sur 5
 */
export function dispDifficulty(difficulty){
    let items = [];

    for(let i=1; i <= 5; i++){
        // on ajoute n montagnes pleines, et on complète avec des vides pour arriver à 5
        i <= difficulty ? items.push(<Terrain key={`difficulty_icon_${i}`}/>) : items.push(<TerrainOutlined key={`difficulty_icon_${i}`}/>);
    }

    return items;
}

/**
 * Retourne la rando/itinéraire selon son ID
 * @param hikeId    id de la rando à trouver
 * @returns {null}  rando correspondante
 */
export function getHikeById(hikeId, {setTheHike}){
    let theHike = null;

    firebaseApp.firestore().collection("hikes").doc(hikeId).get()
        .then((doc)=>{
            theHike = doc.data();
            theHike.id = doc.id;
            setTheHike(theHike);
        })
        .catch((error)=>{
            setTheHike(null);
            console.log(`getHikeById() => ${error.code} | ${error.message}`)
        })

    return theHike;
}


/**
 * Récupère l'URL de la photo selon l'id de la rando
 * @param {String} id ID de la rando
 * @param {function} setMainPicture fonction de mise à jour de l'image de la rando
 */
export function getMainPicture(id, {setMainPicture}){
    const storage = firebaseApp.storage();
    const imageBasePath = storage.ref(`images/hikes`);

    imageBasePath.child(`/${id}.jpg`).getDownloadURL()
        .then((url)=>{
            setMainPicture(url);
        })
        .catch((error)=>{
            console.log("getMainPicture() : " + error.code + " | " + error.message);
        });
}

export function getAllHikes({setAllHikes}){
    let hikes = [];
    let theHike = {};

    console.log("getAllHikes() : entrée dans getAllHikes");

    firebaseApp.firestore().collection("hikes").get()
        .then((querySnapshot)=>{
            console.log("getAllHikes() : récupération des résultats")
            querySnapshot.forEach((doc) => {
                theHike = doc.data();
                theHike.id = doc.id;
                hikes.push(theHike);
            });
        }).then(()=>{
            setAllHikes(hikes);
        })
        .catch((error)=>{
            console.log(`erreur getAllHikes() => ${error.code} | ${error.message}`)
        })
}


export function getGuideById(guideId, {setGuide}){
    let theGuide = null

    firebaseApp.firestore().collection("users").doc(guideId).get()
        .then((doc)=>{
            theGuide = doc.data();
            setGuide(theGuide);
        })
        .catch((error)=>{
            console.log(`erreur getGuideById() => ${error.code} | ${error.message}`)
        })
}