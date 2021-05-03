import googleLogo from './../../../assets/img/logos/Google__G__Logo.svg';
import './SignWithGoogleButton.css';

import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

function SignWithGoogleButton ({firebaseApp, setLoginOpen}){
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className="google-signin-button" onClick={() => {firebaseApp.auth().signInWithPopup(provider); setLoginOpen(false);}}>
                <img src={googleLogo} className="g-logo" />
                <div className="g-label">Se connecter avec Google</div>
            </div>
        </div>
    );
}

export default SignWithGoogleButton;