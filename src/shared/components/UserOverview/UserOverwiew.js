import testUsers from '../../data/testUsers';
import './UserOverview.css';

import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BlockIcon from '@material-ui/icons/Block';

function UserOverview(props) {
    return (
        <div className="container">
            <div className="guide-name">
                {props.firstname + ' ' + props.lastname}
            </div>
            <div className="guide-sex">{props.sex}</div>
            <div className="guide-infos">
                {props.infos}
            </div>            
            <Button variant="outlined" size="small" color="primary" startIcon={<ArrowUpwardIcon />}>
                Passer guide
            </Button>
            <Button variant="outlined" size="small" color="secondary" startIcon={<ArrowDownwardIcon />}>
                Passer visiteur
            </Button>
            <Button variant="contained" color="secondary" startIcon={<BlockIcon />}>Bloquer</Button>
        </div>
    )    
}

export default UserOverview;