import './MyBookings.css';
import firebaseApp from "../../shared/services/firebase";
import {useEffect, useState} from "react";
import Loader from './../Loader/Loader';

/**
 * Récupérer toutes les réservations d'un utilisateur
 * @param user  objet user contenant un uid
 * @param setOnLoad
 * @param setAllBooks
 */
function getReservationsByUser(user, {setOnLoad, setAllBooks}){
    if(user != null) {
        firebaseApp.firestore().collection('booking')
            .where('userId', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
                setOnLoad(false);
            })
            .catch((error)=>{
                console.log(`getReservationsByUser ${error.code} | ${error.message}`)
                setOnLoad(false)
            })
    }
}


function ReservationsToHikes(allBooks, {setAllHikesBooked}){
    let allHikes = [];
    for(let i = 0; i < allBooks.length; i++){
        firebaseApp.firestore().collection('hikes').get()
            .then(()=>{

            })
            .catch((error)=>{
                console.log(`getReservationsByUser ${error.code} | ${error.message}`)
            })
    }
}

function MyBookings({user}) {
    const [onLoad, setOnLoad] = useState(true);
    const [allBooks, setAllBooks] = useState([]);
    const [allHikesBooked, setAllHikesBooked] = useState(null)

    useEffect(()=>{
        getReservationsByUser(user, {setOnLoad, setAllBooks})
    }, [user]);

    useEffect(()=>{
        setAllHikesBooked([]);
        ReservationsToHikes(allBooks, {setAllHikesBooked});
    }, [allBooks]);

    return (
        <>
            {!onLoad ?
                <div className={'my-bookings'}>
                    {allBooks.length > 0 ?
                        <div>Toutes les réservations pour vous</div>
                        :
                        <div>Aucune réservation</div>
                    }
                </div>
                :
                <Loader/>
            }
        </>
    );
}

export default MyBookings;