import './App.css';

import Header from './Header';
import Footer from './shared/components/Footer/Footer';
import Home from './view/Home/Home';
import Hike from './view/Hike/Hike';
import AccountManagement from './view/AccountManagement/AccountManagement';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import firebaseApp from './shared/services/firebase';
import {useEffect, useState} from 'react';


function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const disconnect = firebaseApp.auth().onAuthStateChanged(newUser => {
      if (newUser){
        //si les infos de l'utilisateur qui s'est connecté sont bien renvoyées
        //on les attribue à notre var 'user'
        setUser({
          uid: newUser.uid,
          displayName: newUser.displayName,
          email: newUser.email,
          picture: newUser.photoURL
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
        <Route path="/" exact component={Home}></Route>
        <Route path="/randos/:hikeId" component={Hike} />
        <Route path="/users">
          <AccountManagement user={user}></AccountManagement>
        </Route>
        <Route render={() => <h1 style={{paddingTop: '3.5em'}}>404: page introuvable</h1>} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
