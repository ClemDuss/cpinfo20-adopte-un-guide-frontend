import './App.css';
import './shared/components/Button/Button.css';

import Header from './Header';
import Footer from './shared/components/Footer/Footer';
import Home from './view/Home/Home';
import Hike from './view/Hike/Hike';
import NewHike from './view/NewHike/NewHike';
import Legal from './view/Legal/Legal'

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';


import firebaseApp from './shared/services/firebase';
import React, {useEffect, useState} from 'react';
import MyBookings from "./view/MyBookings/MyBookings";


function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const disconnect = firebaseApp.auth().onAuthStateChanged(newUser => {
      if (newUser){
        //si les infos de l'utilisateur qui s'est connecté sont bien renvoyées
        //on les attribue à notre var 'user'
        firebaseApp.firestore().collection('users').doc(newUser.uid).get()
          .then((doc)=>{
            if(doc.exists){
              setUser(doc.data());
            }else{
              console.log("Informations de l'utilisateur introuvables");
            }
          }).catch((error)=>{
            console.log(error.code + " | " + error.message);
          });

        
        return;
      }

      setUser(null);
    }); 
    return () => disconnect();
  }, []);

  return (
    <Router className="page">
      <Header user={user} firebaseApp={firebaseApp} />
      <Switch>
        <Route path="/" exact>
          <Home firebaseApp={firebaseApp}/>
        </Route>
        <Route path="/randos/:hikeId">
            <Hike user={user}/>
        </Route>
          <Route path="/nouvelle-rando">
              <NewHike
                user={user}
              />
          </Route>
          <Route path="/mes-reservations">
              <MyBookings user={user}/>
          </Route>
          <Route path={"/mentions-legales"} component={Legal}/>
        <Route render={() => <iframe style={{height: '100%', width: '100%'}} src="/404.html" frameborder="0"></iframe>} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
