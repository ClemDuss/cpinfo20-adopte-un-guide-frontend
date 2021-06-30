import googleLogo from './../../../assets/img/logos/Google__G__Logo.svg';
import './SignWithGoogleButton.css';
import React from 'react';

import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

function SignInWithGoogle(firebaseApp){
    firebaseApp.auth()
        .signInWithPopup(provider)
        .then((result)=>{
            const user = result.user;
            const db = firebaseApp.firestore();
            let firstname, lastname, email, picture, firstnameLength;
            const nameTable = user.displayName.split(" ");
            if(nameTable.length > 0){
                firstname = nameTable[0];
                firstnameLength = firstname.length;
                lastname = user.displayName.substr(firstnameLength + 1, user.displayName.length - 1);
            }else{
                firstname = user.displayName;
                lastname = "";
            }
            picture = user.photoURL;
            email = user.email;

            db.collection('users').doc(user.uid).get().then((doc)=>{
                if(!doc.exists){
                    db.collection('users').doc(user.uid).set({
                        uid: user.uid,
                        email: email,
                        lastname: lastname,
                        firstname: firstname,
                        role: 1,
                        picture: picture
                    });
                }
            });

        }).catch((error)=>{
            console.log(error.code + " | " + error.message);
        })
}

function SignWithGoogleButton ({firebaseApp, setLoginOpen}){
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className="google-signin-button" onClick={() => {SignInWithGoogle(firebaseApp); setLoginOpen(false);}}>
                <img alt={"g-logo"} src={googleLogo} className="g-logo" />
                <div className="g-label">Se connecter avec Google</div>
            </div>
        </div>
    );
}

export default SignWithGoogleButton;