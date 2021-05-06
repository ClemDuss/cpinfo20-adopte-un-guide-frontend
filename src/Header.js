import React, { useState } from 'react';
import './Header.css';
import logo from './logo.svg';
import SignWithGoogleButton from './shared/components/SignWithGoogleButton/SignWithGoogleButton';
import Button from './shared/components/Button/Button';

import {Link} from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Grid } from '@material-ui/core';
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


function Signup(firebaseApp, email, password){
	console.log('hello')
	firebaseApp.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			var user = userCredential.user;
			console.log(user)
		})
		.catch((error) => {
			console.error(error.code + " : " + error.message);
		})
}



function Header({user, firebaseApp}) {
	const [loginOpen, setLoginOpen] = useState(false);
	const [signup, setSignup] = useState(false);
	let email, password;

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
					<Link to={`users`}>
						<div>Paramètres</div>
					</Link>
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

		{/* POPUP de connexion */}
		<Dialog
			open={loginOpen}
			fullWidth={true}
			maxWidth={'xs'}
			TransitionComponent={fromTopTransition}
			keepMounted
			onClose={() => setLoginOpen(false)}
			aria-labelledby="login-dialog-title"
			aria-describedby="login-dialog-description"
		>
			{!signup &&
			<>
				<DialogTitle id="login-dialog-title">Connexion</DialogTitle>
				<DialogContent>
					{/* <DialogContentText id="login-dialog-description">
						Hello connecte toi merde !
					</DialogContentText> */}
					<form className="signin-form" autoComplete="off">
						<TextField label="Email" id="email" name="email" type="email"/>
						<TextField label="Mot de passe" id="password" name="password" type="password"/>
						<div className="submit-btn">
							<Button text="Se connecter" theme={'green-mtn'} outlined={true}>TEST</Button>
							<a onClick={() => setSignup(true)}>S'inscrire</a>
						</div>
					</form>
					<SignWithGoogleButton firebaseApp={firebaseApp} setLoginOpen={setLoginOpen} style={{marginBottom: '1em'}} />
				</DialogContent>
			</>
			}
			{signup &&
			<>
				<DialogTitle id="login-dialog-title">Connexion</DialogTitle>
				<DialogContent>
				<form className="signin-form">
					<Grid style={{display: "flex"}}>
						<Grid item md={6}>
							<TextField label="Nom" id="name" name="name" type="text"/>
						</Grid>
						<Grid item md={6}>
							<TextField label="Prénom" id="firstname" name="firstname" type="text"/>
						</Grid>
					</Grid>
					<TextField label="Email" id="email" name="email" type="email" value={email} style={{marginBottom: '1em'}} />
					<TextField label="Mot de passe" id="password" name="password" type="password" value={password} />
					<TextField label="Confirmez le mot de passe" id="password" name="password" type="password" />
					<div className="submit-btn">
						<Button text="Valider" theme={'green-mtn'} outlined={true} onClick={()=>console.log('hello')}></Button>
						<a onClick={()=>setSignup(false)}>Se connecter</a>
					</div>
				</form>
				</DialogContent>
			</>
			}
			{/* <DialogActions>
				<Button theme={'error'} outlined={true} onClick={() => setLoginOpen(false)} text={'ANNULER'}></Button>
			</DialogActions> */}
		</Dialog>
    </div>
  );
}

export default Header;