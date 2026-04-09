import './App.css'
import NavBar from './Components/navbar/NavBar.jsx';
import ResultsBoard from './Components/resultsBoard/ResultsBoard.jsx';
import InfoModal from './Components/infoModal/InfoModal.jsx';
import { useState } from 'react';
import axios from 'axios';
import Favourites from './Components/Favourites/Favourites.jsx';
import Footer from './components/footer/footer.jsx';

function App() {
  const [stationCode, setStationCode] = useState('');
  const [viaCode, setViaCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serviceUid, setServiceUid] = useState(null);
  const [favourites, setFavourites] = useState(localStorage);

  function handleSubmit(){
    if (viaCode === ''){
      axios.get(`${import.meta.env.VITE_SERVER_URL}/getDepartures/${stationCode}`)
      .then(response => {
        if (response.data.error !== undefined) {
          setError(() => setError(true));
          setResults(() => setResults(null));
          alert("Station code not found, please try again")
        } 
        if (response.data.services === null){
          setError(() => setError(true));
          setResults(() => setResults(null));
          alert("No departures scheduled for " + response.data.location.name + " at this time.")
        }
        else {
          setError(() => setError(false));
          setResults(response.data)
          
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    })} else {
      axios.get(`${import.meta.env.VITE_SERVER_URL}/getDepartures/${stationCode}/to/${viaCode}`)
      .then(response => {
        if (response.data.error !== undefined) {
          setError(() => setError(true));
          setResults(() => setResults(null));
          alert("Station code not found, please try again") // add better error message saying which stn code not found
        } 
        if (response.data.services === null){
          setError(() => setError(true));
          setResults(() => setResults(null));
          alert("No departures scheduled for " + response.data.location.name + " calling at " + response.data.filter.destination.name + " at this time.")
        }
        else {
          setError(() => setError(false));
          setResults(response.data)
          
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.log('errored')
    })}
}

  function handleStnCodeChange(event){
    setStationCode(event.target.value.toUpperCase());
  }
  function handleViaCodeChange(event){
    setViaCode(event.target.value.toUpperCase());
  }
  function handleDefaultSelect(code){
    setStationCode(code);
  }

  return (
    <>
    <div className="h-screen flex flex-col">
      <NavBar handleSubmit={handleSubmit} handleStnCodeChange={handleStnCodeChange} handleViaCodeChange={handleViaCodeChange} stationCode={stationCode} viaCode={viaCode}/>
      <div className="sm:w-full md:w-full lg:w-3/4 m-auto p-2 flex-1">
      {results != null ? <div className="results">
          <ResultsBoard data={results} setServiceUid={setServiceUid} setFavourites={setFavourites}  favourites={favourites}/>
        </div>  : 
       
        <div className="w-1/3 m-auto text-center">
          {favourites.length > 0 ? 
          <Favourites favourites={favourites} handleDefaultSelect={handleDefaultSelect}/> : 
          <div>
            <h2>Example Popular Stations:</h2>
            <ul>
              <li><a href="#" onClick={() => handleDefaultSelect("BHM")}>Birmingham New Street</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("CDF")}>Cardiff Central</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("EDB")}>Edinburgh Waverly</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("GLC")}>Glasgow Central</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("EUS")}>London Euston</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("WAT")}>London Waterloo</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("LIV")}>Liverpool Lime Street</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("MAN")}>Manchester Piccadilly</a></li>
              <li><a href="#" onClick={() => handleDefaultSelect("NCL")}>Newcastle</a></li>
            </ul>
          </div>
          }
        </div>
      }
      {
        serviceUid != null ? <InfoModal data={results} serviceUid={serviceUid} stationCode= {stationCode} setShowModal={setShowModal} setServiceUid={setServiceUid}/> : ""
      }
      </div>
      <Footer />
      </div>
    </>
  )
}

export default App
