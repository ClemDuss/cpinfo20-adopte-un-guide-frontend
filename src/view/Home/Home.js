import './Home.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from './../../shared/components/Card/Card';

import allHikes from './../../shared/data/allHikes';


function Home() {
  return (
    <div key={'home'} className="home">
        <Container maxWidth="lg">
            <Grid container className="home-content">
                {allHikes.map(someHike =>
                    <Card 
                        key={someHike.id}
                        title={someHike.title}
                        location={someHike.location}
                        guide={someHike.guide}
                        shortDescription={someHike.shortDescription}
                        hikeId={someHike.hikeId}
                        difficulty={someHike.difficulty}
                        duration={someHike.duration}
                        mainPicture={someHike.pictures[0]}
                    />
                )}
            </Grid>
        </Container>
    </div>
  );
}

export default Home;