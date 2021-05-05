import React from 'react';
import landscape from './../../../assets/img/1.jpg';
import './Card.css';
import Grid from '@material-ui/core/Grid';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {TerrainOutlined, Terrain, Timer} from '@material-ui/icons';
import { Link } from 'react-router-dom';

class Card extends React.Component {
    render(){
        /**
         * Fonction au click sur une "Card" randonnée
         * @param {int} hikeId Id de la course clickée
         */
        function openHikeDetails(hikeId){
            // alert("rando n°" + hikeId);
        }

        /**
         * Va rnevoyer les 5 icons de difficulté pour matérialiser le chiffre renseigné
         * @param {int} difficulty Niveau de difficulté sur 5
         */
        function dispDifficulty(difficulty){
            let items = [];

            for(let i=1; i <= 5; i++){
                // on ajoute n montagnes pleines, et on complète avec des vides pour arriver à 5
                i <= difficulty ? items.push(<Terrain/>) : items.push(<TerrainOutlined/>);
            }

            return items;
        }

        /**
         * Renvoie un temps en chaine (ex:2.5 => 2h30)
         * @param {float} time Temps en heures à convertir en chaine
         */
        function timeToString(time){
            let result = "";
            let decimal = time - Math.trunc(time);
            time = Math.trunc(time);

            if(time >= 24){
                //si le temps de la rando est de plus de 24 h
                let days = Math.trunc(time/24);
                result += days + "j "
                time = time - (24 * days);
            }

            if(decimal > 0){
                let minutes = decimal * 60;
                result += time + "h" + minutes;
            }else{
                result += time + "h";
            }

            return result;
        }

        return (
            <Grid key={this.props.key} item lg={3} md={4} sm={6} xs={12} className="card">
                <Link to={`randos/${this.props.hikeId}`} className="card-link">
                    <div className="card-inner">
                    {/* <div className="card-inner" onClick={() => openHikeDetails(this.props.hikeId)}> */}
                        <div className="card-header">
                            <div className="hike-picture">
                                { this.props.mainPicture != undefined &&
                                    <div className="hike-main-picture" style={{backgroundImage: `url(/img/${this.props.mainPicture})`}}></div>
                                    // <img src={`/img/${this.props.mainPicture}`} alt={this.props.title ?? "Photo de la rando"}/>
                                }
                                { this.props.mainPicture == undefined &&
                                    <img src={landscape} alt={this.props.title ?? "Photo de la rando"} style={{width: '100%', borderRadius: '0.5em 0.5em 0 0'}} />
                                }
                            </div>
                            <div className="hike-duration" title="Temps moyen pour l'ascention">
                                <Timer/> <span>{timeToString(this.props.duration)}</span>
                            </div>
                            <div className="hike-difficulty" title={"Difficulté : " + this.props.difficulty + "/5"}>
                                {dispDifficulty(this.props.difficulty)}
                            </div>
                        </div>
                        <div className="card-body">
                            <h2>{this.props.title ?? "Titre"}</h2>
                            <h4><FontAwesomeIcon icon={faMapMarkerAlt} /> {this.props.location.start.name ?? "Lieu"}</h4>
                            <h3>{this.props.guide ?? "Nom du Guide"}</h3>
                            <p>{this.props.shortDescription ?? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
                        </div>
                    </div>
                </Link>
            </Grid>
        );
    }
}

export default Card;