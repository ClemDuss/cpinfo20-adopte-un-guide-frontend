import './Home.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from './../../shared/components/Card/Card';

// import allHikes from './../../shared/data/allHikes';
import { getAllHikes } from '../../shared/services/functions';
import React, {useEffect, useState} from 'react';
import Loader from "../Loader/Loader";


function Home() {
    const [allHikes, setAllHikes] = useState([]);

    useEffect(()=>{
        getAllHikes({setAllHikes});
    }, []);

    return (
        <div key={'home'} className="home">
            {allHikes.length > 0 ?
                <Container maxWidth="lg" style={{minHeight: "100%"}}>
                        <Grid container className="home-content">
                            {allHikes.map(someHike => {
                                return <Card
                                    key={someHike.id}
                                    title={someHike.title}
                                    location={someHike.location}
                                    guide={someHike.userId}
                                    shortDescription={someHike.description}
                                    hikeId={someHike.id}
                                    difficulty={someHike.difficulty}
                                    altitude={someHike.altitude}
                                    duration={someHike.duration}
                                />
                            })}
                        </Grid>
                </Container>
            :
                <Loader/>
            }
        </div>
    );
}

export default Home;