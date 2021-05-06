import testUsers from '../../shared/data/testUsers';
import UserOverview from '../../shared/components/UserOverview/UserOverwiew'
import './AccountManagement.css'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function AccountManagement() {
    return (
        <div key={'accountManagement'} className="account-management">
            <Container maxWidth="lg">
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    {testUsers.map(testUser =>
                        <UserOverview 
                            key={testUser.id}
                            firstname={testUser.firstname}
                            lastname={testUser.lastname}
                            guide={testUser.guide}
                            infos={testUser.infos}
                            sex={testUser.sex}
                        />
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default AccountManagement;