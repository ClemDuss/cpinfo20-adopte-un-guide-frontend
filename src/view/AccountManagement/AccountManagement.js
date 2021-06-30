import testUsers from '../../shared/data/testUsers';
import UserOverview from '../../shared/components/UserOverview/UserOverwiew'
import './AccountManagement.css'
import {useEffect, useState} from 'react';
import firebaseApp from '../../shared/services/firebase';

import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Redirect } from 'react-router';

function AccountManagement({user}) {
    const [allUsers, setAllUsers] = useState([]);
    const [nav, setNav] = useState(0);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect( () => {
        let users = [];
        const db = firebaseApp.firestore();
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                users.push(doc.data());
                //console.log(doc.id, " => ", doc.data());
            });
            setAllUsers(users);
        });
    }, []);

    useEffect( () => {
        let usersToDisplay = [];
        for (let i = 0; i < 10; i++) {
            if (allUsers.length > i) {
                usersToDisplay.push(allUsers[i]);
            }
        }
        setDisplayedUsers(usersToDisplay);
        //console.log(allUsers);
        //console.log(displayedUsers);
    }, [allUsers]);

    /**
     * Appelé quand le state nav est modifié; quand l'utilisateur change de page
     */
    useEffect( () => {
        //console.log(nav);

        let firstIndex = nav * 10;
        let nextUsers = [];
        for (let i = firstIndex; i < firstIndex + 10; i++) {
            if (i < allUsers.length) {
                nextUsers.push(allUsers[i]);
            }
        }
        //console.log(nextUsers);
        setDisplayedUsers(nextUsers);
        //console.log(displayedUsers);
    }, [nav]);

    /**
     * Appelé quand la liste des utilisateurs affichés change
     */
    useEffect( () => {
        //console.log(displayedUsers);
        if (displayedUsers.length < 10 || allUsers.length == ((nav * 10) + 10)) {
            setIsLastPage(true);
        } else {
            console.log(displayedUsers);
            setIsLastPage(false);
        }
        if (nav == 0) {
            setIsFirstPage(true);
        } else {
            setIsFirstPage(false);
        }
    }, [displayedUsers]);

    useEffect( () => {
        console.log(isLastPage);
    }, [isLastPage]);

    function previousPage(e) {
        e.preventDefault();
        setNav(nav - 1);
    }

    function nextPage(e) {
        e.preventDefault();
        setNav(nav + 1);
    }

    return (
        <div key={'accountManagement'} className="account-management">
            <Container maxWidth="md">
                <div className="actions-container">
                    <ButtonGroup color="primary" className="nav-actions">
                        <Button startIcon={<NavigateBefore />} onClick={previousPage} disabled={isFirstPage}></Button>
                        <Button startIcon={<NavigateNext />} onClick={nextPage} disabled={isLastPage}></Button>
                    </ButtonGroup>
                </div>
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    {displayedUsers.map(aUser =>
                        <UserOverview 
                            key={aUser.uid}
                            uid={aUser.uid}
                            firstname={aUser.firstname}
                            lastname={aUser.lastname}
                            gender={aUser.gender}
                            role={aUser.role}
                            email={aUser.email}
                            birthday={aUser.birthday}
                        />
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default AccountManagement;