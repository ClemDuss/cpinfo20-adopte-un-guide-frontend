import testUsers from '../../data/testUsers';
import './UserOverview.css';
import firebaseApp from '../../services/firebase';
import {useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BlockIcon from '@material-ui/icons/Block';

/*function isGuide(role) {
    if (role == 1) return false;
    else return true;
}

function isGuest(role) {
    if (role == 2) return false;
    else return true;
}*/

function UserOverview(props) {
    const [role, setRole] = useState(null);
    const [blockLabel, setBlockLabel] = useState("");
    const [guideButtonDisabled, setGuideButtonDisabled] = useState(null);
    const [guestButtonDisabled, setGuestButtonDisabled] = useState(null);

    useEffect( () => {
        if (props.role == 0) {
            setBlockLabel("DEBLOQUER");
        } else {
            setBlockLabel("BLOQUER");
        }
        if (props.role == 1) setGuideButtonDisabled(false);
        else setGuideButtonDisabled(true);

        if (props.role == 2) setGuestButtonDisabled(false);
        else setGuestButtonDisabled(true);

        setRole(props.role);
    }, []);

    useEffect( () => {
        if (role == 1) setGuideButtonDisabled(false);
        if (role == 2) setGuestButtonDisabled(false);
    }, [role]);

    function makeGuide(key) {
        const db = firebaseApp.firestore();
        db.collection("users").doc(key).update({
            "role": 2
        });
        setGuideButtonDisabled(true);
        setGuestButtonDisabled(false);
    }

    function makeGuest(key) {
        const db = firebaseApp.firestore();
        db.collection("users").doc(key).update({
            "role": 1
        });
        setGuestButtonDisabled(true);
        setGuideButtonDisabled(false);
    }

    function blockUser(key) {
        if (role == 0) {
            const db = firebaseApp.firestore();
            db.collection("users").doc(key).update({
                "role": 1
            }).then( () => {
                setBlockLabel("BLOQUER");
            })
            setRole(1);
        } else {
            const db = firebaseApp.firestore();
            db.collection("users").doc(key).update({
                "role": 0
            }).then ( () => {
                setBlockLabel("DEBLOQUER");
            })
            setRole(0);
            setGuideButtonDisabled(true);
            setGuestButtonDisabled(true);
        }        
    }

    return (
        <div className="container">
            <div className="overview-user-photo">
                <img src="/img/user-profile/defaultprofile.jpg" className="circle photo" />
            </div>
            <div className="overview-user-name">
                {props.firstname + ' ' + props.lastname}
            </div>
            <div className="overview-user-birthday">
                {props.birthday}
            </div>
            <p>{props.role}</p>
            <Button disabled={guideButtonDisabled} variant="outlined" size="small" color="primary" startIcon={<ArrowUpwardIcon />} onClick={() => makeGuide(props.uid)}>
                Passer guide
            </Button>
            <Button disabled={guestButtonDisabled} variant="outlined" size="small" color="secondary" startIcon={<ArrowDownwardIcon />} onClick={() => makeGuest(props.uid)}>
                Passer visiteur
            </Button>
            <Button variant="contained" color="secondary" startIcon={<BlockIcon />} onClick={() => blockUser(props.uid)}>{blockLabel}</Button>
        </div>
    )    
}

export default UserOverview;