import React from 'react';
import {Terrain, TerrainOutlined} from '@material-ui/icons';

/**
 * Va rnevoyer les 5 icons de difficulté pour matérialiser le chiffre renseigné
 * @param {int} difficulty Niveau de difficulté sur 5
 */
export function dispDifficulty(difficulty){
    let items = [];

    for(let i=1; i <= 5; i++){
        // on ajoute n montagnes pleines, et on complète avec des vides pour arriver à 5
        i <= difficulty ? items.push(<Terrain/>) : items.push(<TerrainOutlined/>);
    }

    return items;
}