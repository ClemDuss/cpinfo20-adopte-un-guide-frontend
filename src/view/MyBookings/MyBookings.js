import './MyBookings.css';
import firebaseApp from "../../shared/services/firebase";
import {useEffect, useState} from "react";
import Loader from './../Loader/Loader';

function getReservationsByUser(user, {setOnLoad, setAllBooks}){
    console.log(user)
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
            })
            .catch((error)=>{
                console.log(`getReservationsByUser ${error.code} | ${error.message}`)
            })

    }
}

function MyBookings({user}) {
    const [onLoad, setOnLoad] = useState(true);
    const [allBooks, setAllBooks] = useState(null);

    useEffect(()=>{
        getReservationsByUser(user, {setOnLoad, setAllBooks})
    }, [user])

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