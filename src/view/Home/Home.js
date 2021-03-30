import './Home.css';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Card from './../../shared/components/Card';

import allHikes from './../../shared/data/allHikes';


function Home() {
  return (
    <div className="home">
        <Container maxWidth="lg">
            <Grid container className="home-content">
                {allHikes.map(someHike =>
                    <Card 
                        title={someHike.title}
                        location={someHike.location}
                        guide={someHike.guide}
                        shortDescription={someHike.shortDescription}
                        hikeId={someHike.hikeId}
                        difficulty={someHike.difficulty}
                        duration={someHike.duration}
                    />
                )}
            </Grid>
        </Container>
    </div>
  );
}

export default Home;