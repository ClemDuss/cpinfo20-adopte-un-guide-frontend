import './MyBookings.css';
import firebaseApp from "../../shared/services/firebase";
import {useEffect, useState} from "react";
import Loader from './../Loader/Loader';
import {Container} from "@material-ui/core";
import {Redirect} from "react-router-dom";

/**
 * Récupérer toutes les réservations d'un utilisateur
 * @param user  objet user contenant un uid
 * @param setOnLoad
 * @param setAllBooks
 */
function getReservationsByUser(user, {setAllBooks}){
    if(user != null) {
        firebaseApp.firestore().collection('booking')
            .where('userId', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then((querySnapshot) => {
                let myReservations = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    myReservations.push(doc.data());
                });
                setAllBooks(myReservations);
            })
            .catch((error)=>{
                console.log(`getReservationsByUser ${error.code} | ${error.message}`)
            })
    }
}


function ReservationsToHikes(allBooks, {setAllHikesBooked, setOnLoad}){
    let allHikes = [];
    for(let i = 0; i < allBooks.length; i++){
        firebaseApp.firestore().collection('hikes').doc(allBooks[i].hikeId).get()
            .then((doc)=>{
                allHikes.push({
                    booking: allBooks[i],
                    hike: doc.data()
                });
                console.log(allHikes)
                setAllHikesBooked(allHikes);
                setOnLoad(false);
            })
            .catch((error)=>{
                console.log(`getReservationsByUser ${error.code} | ${error.message}`)
                setOnLoad(false);
            })
    }
}

function SomeBooking({...props}){
    const [myHike, setMyHike] = useState(null);
    const [isGetted, setIsGetted] = useState(false);
    const [guide, setGuide] = useState(null)

    useEffect(()=> {
        if (!isGetted){
            if (props.hikeId != null) {
                firebaseApp.firestore().collection('hikes').doc(props.hikeId).get()
                    .then((doc) => {
                        console.log(doc.data());
                        setIsGetted(true)
                        setMyHike(doc.data());
                    })
                    .catch((error) => {
                        console.log(`getReservationsByUser ${error.code} | ${error.message}`)
                        setIsGetted(true)
                    })
            }
        }
    }, [isGetted])

    useEffect(()=>{
        if (myHike != null) {
            firebaseApp.firestore().collection('users').doc(myHike.userId).get()
                .then((doc) => {
                    setGuide(doc.data());
                })
                .catch((error) => {
                    console.log(`getReservationsByUser ${error.code} | ${error.message}`)
                })
        }
    }, [myHike])

    return (
        <>
            {myHike != null ?
                <div className={'booking-line'}>
                    {myHike.title} avec {guide?.firstname}
                </div>
                :
                <></>
            }
        </>
    )
}

function MyBookings({user}) {
    const [onLoad, setOnLoad] = useState(true);
    const [allBooks, setAllBooks] = useState([]);
    const [allHikesBooked, setAllHikesBooked] = useState(null)

    useEffect(() => {
        getReservationsByUser(user, {setAllBooks})
    }, [user]);

    useEffect(() => {
        setAllHikesBooked([]);
        ReservationsToHikes(allBooks, {setAllHikesBooked, setOnLoad});
    }, [allBooks]);

    return (
        <>
            {user ?
                <>
                    {!onLoad ?
                        <Container className={'my-bookings'} maxWidth={'lg'}>
                            {allHikesBooked.length > 0 ?
                                <div>
                                    <h2>Toutes vos réservations :</h2>
                                    {allBooks.map(someBook => {
                                        return (
                                            <SomeBooking hikeId={someBook.hikeId}/>
                                        )
                                    })}
                                </div>
                                :
                                <h2>Aucune réservation</h2>
                            }
                        </Container>
                        :
                        <Loader/>
                    }
                </>
                :
                <Redirect to={'/'}/>
            }
        </>
    );
}

export default MyBookings;