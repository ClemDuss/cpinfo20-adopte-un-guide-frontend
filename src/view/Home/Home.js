import './Home.css';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Card from './../../shared/components/Card';

import SearchIcon from '@material-ui/icons/Search';

function Home() {
  return (
    <div className="home">
        <Container maxWidth="lg">
            {/* <Paper component="form" className="form-search">
                <InputBase
                    className=""
                    placeholder="Rechercher"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" className="" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper> */}
            <Grid container className="home-content">
                <Card title={"Pointe Percée"} location={"Le Grand-Bornand"} guide={"Fred"} shortDescription={"Une rando dont le sommet se situe à un peu plus de 2700m."}/>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Grid>
        </Container>
    </div>
  );
}

export default Home;