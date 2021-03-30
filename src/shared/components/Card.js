import React from 'react';
import logo from './../../logo.svg';
import './Card.css';
import Grid from '@material-ui/core/Grid';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

class Card extends React.Component {
    render(){
        return (
            <Grid item lg={3} md={4} sm={6} xs={12} className="card">
                <div className="card-inner">
                    <img src={logo} alt={this.props.title ?? "Photo de la rando"}/>
                    <div className="card-body">
                        <h2>{this.props.title ?? "Titre"}</h2>
                        <h4><FontAwesomeIcon icon={faMapMarkerAlt} /> {this.props.location ?? "Lieu"}</h4>
                        <h3>{this.props.guide ?? "Nom du Guide"}</h3>
                        <p>{this.props.shortDescription ?? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
                    </div>
                </div>
            </Grid>
        );
    }
}

export default Card;