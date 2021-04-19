import React, { useState } from 'react';
import './Header.css';
import logo from './logo.svg';
import SignWithGoogleButton from './shared/components/SignWithGoogleButton/SignWithGoogleButton';
import Button from './shared/components/Button/Button';

import {Link} from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

//transition permettant l'arrivée de la Dialog par le haut
const fromTopTransition = React.forwardRef(function fromTopTransition(props, ref){
	return <Slide direction="down" ref={ref} {...props} />;
});

/**
 * Agit au changement de la valeur du champ input de recherche
 * @param {String} value Valeur du champ input
 */
function onChangeSearch(value){
	if(value.length > 0){
		document.getElementById('search-button').style.display = 'block';
	}else{
		document.getElementById('search-button').style.display = 'none';
	}
}

function Header({user, firebaseApp}) {
	const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="header">
        <Link to="/" className="brand">
            <img src={logo} alt={'logo'} className="header-logo" />
            <div className="header-title">Adopte un Guide</div>
        </Link>
        <div className="right-elements">
			<div className="search-bar">
				<input placeholder="Rechercher" onChange={(event)=>onChangeSearch(event.target.value)} />
				<button id="search-button" className="search-button" title="Rechercher"><FontAwesomeIcon icon={faSearch} /></button>
			</div>
			{user &&
				<div className="user-settings">
				<div className="user-info">
					<span className="user-name">
						{user.displayName}
					</span>
					<img src={user.picture} className="circle" />
				</div>
				<div class="user-options">
					<div>Paramètres</div>
					<div className="mail-box">Messagerie</div>
					<div onClick={() => firebaseApp.auth().signOut()}>Déconnexion</div>
				</div>
				</div>
			}
			{!user &&
				// <div className="user-settings" onClick={() => firebaseApp.auth().signInWithPopup(provider)}>
				<div className="user-settings" onClick={() => setLoginOpen(true)}>
					<div className="login-button">
						Connexion
					</div>
				</div>
			}
        </div>

		<Dialog
			open={loginOpen}
			TransitionComponent={fromTopTransition}
			keepMounted
			onClose={() => setLoginOpen(false)}
			aria-labelledby="login-dialog-title"
			aria-describedby="login-dialog-description"
		>
			<DialogTitle id="login-dialog-title">Connexion</DialogTitle>
			<DialogContent>
				{/* <DialogContentText id="login-dialog-description">
					Hello connecte toi merde !
				</DialogContentText> */}
				<SignWithGoogleButton firebaseApp={firebaseApp} setLoginOpen={setLoginOpen} />
			</DialogContent>
			<DialogActions>
				<Button theme={'error'} outlined={true} onClick={() => setLoginOpen(false)} text={'ANNULER'}></Button>
			</DialogActions>
		</Dialog>
    </div>
  );
}

export default Header;