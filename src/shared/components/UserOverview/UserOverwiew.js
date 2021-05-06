import testUsers from '../../data/testUsers';
import './UserOverview.css';

import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BlockIcon from '@material-ui/icons/Block';

function isGuide(role) {
    if (role == 2) return true;
    else return false;
}

function isCustomer(role) {
    if (role == 1) return true;
    else return false;
}

function UserOverview(props) {
    return (
        <div className="container">
            <div className="overview-user-photo">
                <img src="/img/user-profile/defaultprofile.jpg" className="circle photo" />
            </div>
            <div className="overview-user-name">
                {props.firstname + ' ' + props.lastname}
            </div>
            <div className="overview-user-gender">{props.gender.toUpperCase()}</div>
            <div className="overview-user-infos" title={props.infos}>
                {props.infos}
            </div>            
            <Button disabled={isGuide(props.role)} variant="outlined" size="small" color="primary" startIcon={<ArrowUpwardIcon />}>
                Passer guide
            </Button>
            <Button disabled={isCustomer(props.role)} variant="outlined" size="small" color="secondary" startIcon={<ArrowDownwardIcon />}>
                Passer visiteur
            </Button>
            <Button variant="contained" color="secondary" startIcon={<BlockIcon />}>Bloquer</Button>
        </div>
    )    
}

export default UserOverview;