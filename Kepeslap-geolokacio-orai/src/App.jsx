import {useEffect, useRef, useState} from 'react';
import Places from './components/Places.jsx';
import {AVAILABLE_PLACES} from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

// LocalStorage-be tárol egy id listát, ez alapján szűri le az elérhető helyekből a storedPlaces-t
// Az app-on kívül van, hogy csak az oldal frissítése/első betöltése alkalmával fusson le egyszer

const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {

    // Elérhető helyek listája (default üres)
    const [availablePlace, setAvailablePlace] = useState([]);
    // Kiválasztott helyek listája (default: local storage)
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
    // Modal állapota
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // A kiválasztott hely id-ja refernciába kerül
    const selectedPlace = useRef();

    // Lekérdezi a böngésző geolokációját
    // Sorba rendezi ez alapján az elérhető helyeket
    // Majd frissíti az elérhető helyek tömbjét

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlace = sortPlacesByDistance(
                AVAILABLE_PLACES,
                position.coords.altitude,
                position.coords.longitude
            )

            setAvailablePlace(sortedPlace);
        })
    }, []);

    function handleStartRemovePlace(id) {
        setModalIsOpen(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

        if (storedIds.indexOf(id) === -1) {
            localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
        }
    }

    function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        setModalIsOpen(false);

        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
    }

    return (
        <>
            <Modal modalIsOpen = {modalIsOpen} onClose = {handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel = {handleStopRemovePlace}
                    onConfirm = {handleRemovePlace}
                />
            </Modal>

            <header>
                <img src = {logoImg} alt = "Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or you have visited.
                </p>
            </header>
            <main>
                <Places
                    title = "I'd like to visit ..."
                    fallbackText = {'Select the places you would like to visit below.'}
                    places = {pickedPlaces}
                    onSelectPlace = {handleStartRemovePlace}
                />
                <Places
                    title = "Available Places"
                    places = {availablePlace}
                    onSelectPlace = {handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
