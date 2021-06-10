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

async function getUsers() {
    const users = [];
    firebaseApp.firestore().collection("users").get()
        .then((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                users.push(doc.data());
            });
        });
    return users;
}

function AccountManagement() {
    const [allUsers, setAllUsers] = useState([]);
    
    getUsers().then((users) => setAllUsers(users));
    console.log(allUsers);

    return (
        <div key={'accountManagement'} className="account-management">
            <Container maxWidth="md">
                <div className="actions-container">
                    <ButtonGroup color="primary" className="nav-actions">
                        <Button>One</Button>
                        <Button startIcon={<NavigateBefore />}></Button>
                        <Button startIcon={<NavigateNext />}></Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                </div>
                
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    {testUsers.map(testUser =>
                        <UserOverview 
                            key={testUser.id}
                            firstname={testUser.firstname}
                            lastname={testUser.lastname}
                            guide={testUser.guide}
                            infos={testUser.infos}
                            gender={testUser.gender}
                            role={testUser.role}
                        />
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default AccountManagement;