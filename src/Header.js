import React, {useEffect, useState} from 'react';
import './Header.css';
import logo from './logo.svg';
import userIcon from './assets/img/user.svg';
import SignWithGoogleButton from './shared/components/SignWithGoogleButton/SignWithGoogleButton';
// import Button from './shared/components/Button/Button';

import {Link} from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Slide,
	TextField,
	Grid,
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Snackbar
} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./shared/components/Button/Button";
import MuiAlert from "@material-ui/lab/Alert";

//décommenter la ligne suivante pour l'intelisence lors du DEV mais n'est pas nécessaire au bon fonctionnement
// import firebase from 'firebase';

let myFirebaseApp;
let db;

//transition permettant l'arrivée de la Dialog par le haut
const fromTopTransition = React.forwardRef(function fromTopTransition(props, ref){
	return <Slide direction="down" ref={ref} {...props} />;
});

//Pour le style des snacks d'Alert
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Permet l'inscription d'un nouvel utilisateur
 * @param {firebase} firebaseApp	Permet la connexion avec firebase
 * @param {String} email			Email renseigné
 * @param {String} password			Mot de passe renseigné
 * @param {String} gender			Genre renseigné
 * @param {String} lastname			Nom de famille renseigné
 * @param {String} firstname		Prénom renseigné
 * @param {String} birthday			Date d'anniversaire renseigné
 * @param {function} setLoginOpen	Fonction d'actualisation de l'ouverture de la popup login
 */
function Signup(firebaseApp, email, password, gender, lastname, firstname, birthday, {setLoginOpen}){
	firebaseApp.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			let user = userCredential.user;
			return db.collection('users').doc(user.uid).set({
				uid: user.uid,
				email: email,
				gender: gender,
				lastname: lastname,
				firstname: firstname,
				birthday: birthday,
				role: 1
			}).catch((e)=>{
				console.log(e.code + " | " + e.message)
			});
		})
		.then(()=>{
			//callback user bien ajouté
			setLoginOpen(false);
		})
		.catch((error) => {
			console.error(error.code + " : " + error.message);
		})
}


/**
 * Permet l'authentification d'un utilisateur via le mail et le mdp
 * @param {firebase} firebaseApp	Permet la connexion avec firebase
 * @param {String} email			Email renseigné
 * @param {String} password			Mot de passe renseigné
 * @param {function} setLoginOpen	Fonction d'actualisation de l'ouverture de la popup login
 */
function Signin(firebaseApp, email, password, {
																		setLoginOpen,
																		setOpenError,
																		setErrorMessage,
																		setOpenSuccess,
																		setSuccessMessage
																	}){
	firebaseApp.auth().signInWithEmailAndPassword(email, password)
		.then((userCredential) =>{
			// let user = userCredential.user;
			setLoginOpen(false);
			setSuccessMessage("Connecté.")
			setOpenSuccess(true);
		})
		.catch((error)=>{
			//console.log(error.code + " | " + error.message);
			switch(error.code){
				case 'auth/wrong-password':
					setErrorMessage("Email ou mot de pass incorrect.");
					break;
				case 'auth/invalid-email':
					setErrorMessage("Format de l'email incorrect.");
					break;
				default:
					setErrorMessage("Une erreur est survenue.");
			}
			setOpenError(true);
		});
}


function Header({user, firebaseApp}) {
	const [loginOpen, setLoginOpen] 			= useState(false);
	const [signup, setSignup] 					= useState(false);
	const [email, setEmail] 					= useState("")
	const [password, setPassword] 				= useState("")
	const [firstname, setFirstname] 			= useState("")
	const [lastname, setLastname] 				= useState("")
	const [birthday, setBirthday] 				= useState("")
	const [gender, setGender] 					= useState("")

	const [openError, setOpenError] 			= useState(false);
	const [errorMessage, setErrorMessage] 		= useState(null);
	const [openSuccess, setOpenSuccess] 		= useState(false);
	const [successMessage, setSuccessMessage] 	= useState(null);


	myFirebaseApp = firebaseApp;
	db = myFirebaseApp.firestore();

	const handleCloseError = (event, reason)=>{
		if(reason === 'clickaway'){
			return;
		}
		setOpenError(false);
	}
	const handleCloseSuccess = (event, reason)=>{
		if(reason === 'clickaway'){
			return;
		}
		setOpenSuccess(false);
	}

	useEffect(()=>{
		if(!loginOpen) {
			setEmail("");
			setPassword("");
			setFirstname("");
			setLastname("");
			setGender(""); 
			setBirthday("")
		}
	}, [loginOpen])

  return (
    <div className="header">
        <Link to="/" className="brand">
            <img src={logo} alt={'logo'} className="header-logo" />
            <div className="header-title">Adopte un Guide</div>
        </Link>


		<Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess}
				  anchorOrigin={{vertical: 'top', horizontal: 'center'}}
		>
			<Alert onClose={handleCloseSuccess} severity={'success'}>
				{successMessage}
			</Alert>
		</Snackbar>

		{/*INFOS Utilisateur haut droit*/}
		{user ?
			<div className={"right-elements"}>
				{user.role > 1 &&
					<Link to={"/nouvelle-rando"} style={{display: "flex", alignItems: "center", textDecoration: "none"}}>
						<Button className={"new-hike-btn button button-white outlined"} theme={'white'} outlined={true}>
							<FontAwesomeIcon icon={faPlus}/>&nbsp;Nouvel itinéraire
						</Button>
					</Link>
				}
				<div className="user-settings">
					<div className="user-info">
						<span className="user-name">
							{user.displayName || user.firstname + " " + user.lastname}
						</span>
						<img alt={"user"} src={user.picture || userIcon} className="circle" />
					</div>
					<div className="user-options">
						<div>Paramètres</div>
						<div className="mail-box">Messagerie</div>
						<Link to={'/mes-reservations'} className="my-reservations">
							Mes réservations
						</Link>
						<div onClick={() => firebaseApp.auth().signOut()}>Déconnexion</div>
					</div>
				</div>
			</div>
		:
			// <div className="user-settings" onClick={() => firebaseApp.auth().signInWithPopup(provider)}>
			<div className="right-elements">
				<div className="user-settings" onClick={() => setLoginOpen(true)}>
					<div className="login-button">
						Connexion
					</div>
				</div>
			</div>
		}

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

			<Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError}
					  anchorOrigin={{vertical: 'top', horizontal: 'center'}}
			>
				<Alert onClose={handleCloseError} severity={'error'}>
					{errorMessage}
				</Alert>
			</Snackbar>

			{!signup ?
			<React.Fragment>
				<DialogTitle id="login-dialog-title">Connexion</DialogTitle>
				<DialogContent>
					{/* <DialogContentText id="login-dialog-description">
						Hello connecte toi merde !
					</DialogContentText> */}
					<form className="signin-form" autoComplete="off">
						<TextField
							label="Email" id="email" name="email" type="email"
							value={email}
							onChange={(e)=>setEmail(e.target.value)}
						/>
						<TextField
							label="Mot de passe" id="password" name="password" type="password"
							value={password}
							onChange={(e)=>setPassword(e.target.value)}
						/>
						<div className="submit-btn">
							{/*<Button text="Se connecter" theme={'green-mtn'} outlined={true}>TEST</Button>*/}
							<button
								type={"submit"}
								className={"button button-green-mtn outlined"}
								onClick={(e)=>{
									e.preventDefault();
									Signin(
										firebaseApp,
										email,
										password,
										{
											setLoginOpen,
											setOpenError,
											setErrorMessage,
											setOpenSuccess,
											setSuccessMessage
										}
									)
								}}
							>Se connecter</button>
							<a href="/" onClick={(e) => {e.preventDefault(); setSignup(true)}}>S'inscrire</a>
						</div>
					</form>
					<SignWithGoogleButton firebaseApp={firebaseApp} setLoginOpen={setLoginOpen} style={{marginBottom: '1em'}} />
				</DialogContent>
			</React.Fragment>
			:
			<React.Fragment>
				<DialogTitle id="login-dialog-title">Inscription</DialogTitle>
				<DialogContent>
				<form className="signin-form">
					<Grid style={{display: "flex"}}>
						<Grid item md={2}>
							<FormControl>
								<InputLabel id="genderlabel">Civ.</InputLabel>
								<Select
									labelId="genderlabel"
									id="gender-select"
									value={gender}
									onChange={(e)=>setGender(e.target.value)}
								>
									<MenuItem value={"M"}>M</MenuItem>
									<MenuItem value={"F"}>Mme</MenuItem>
								
								</Select>
							</FormControl>
						</Grid>
						<Grid item md={5}>
							<TextField
								label="Nom" id="name" name="name" type="text"
								value={lastname}
								onChange={(e)=>setLastname(e.target.value)}
							/>
						</Grid>
						<Grid item md={5}>
							<TextField
								label="Prénom" id="firstname" name="firstname" type="text"
								value={firstname}
							   	onChange={(e)=>setFirstname(e.target.value)}
							/>
						</Grid>
					</Grid>
					<TextField
						id="date"
						label="Birthday"
						type="date"
						value={birthday}
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(e)=>setBirthday(e.target.value)}
					/>
					<TextField
						label="Email" id="email" name="email" type="email"
						value={email}
						onChange={(e)=>setEmail(e.target.value)}
						style={{marginBottom: '1em'}}
					/>
					<TextField
						label="Mot de passe" id="password" name="password" type="password"
						value={password}
						onChange={(e)=>setPassword(e.target.value)}
					/>
					<TextField
						label="Confirmez le mot de passe" id="password" name="password" type="password"
						value={password}
					/>
					<div className="submit-btn">
						{/*<Button text="Valider" theme={'green-mtn'} outlined={true} onClick={()=>console.log('hello')}></Button>*/}
						<button
							className={"button button-green-mtn outlined"}
							onClick={(e)=>{e.preventDefault(); Signup(firebaseApp, email, password, gender, lastname, firstname, birthday,{setLoginOpen})}}
						>Valider</button>
						<a href="/" onClick={(e) => {e.preventDefault(); setSignup(false)}}>Se connecter</a>
					</div>
				</form>
				</DialogContent>
			</React.Fragment>
			}
			{/* <DialogActions>
				<Button theme={'error'} outlined={true} onClick={() => setLoginOpen(false)} text={'ANNULER'}></Button>
			</DialogActions> */}
		</Dialog>
    </div>
  );
}

export default Header;

