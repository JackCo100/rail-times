import './App.css'
import Header from './Components/Header.jsx'
import ResultsBoard from './Components/ResultsBoard.jsx';
import InfoModal from './Components/InfoModal.jsx';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [stationCode, setStationCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serviceUid, setServiceUid] = useState(null);

  function handleSubmit(){
    console.log(`localhost:3000/getDepartures/${stationCode}`)
    axios.get(`http://localhost:3000/getDepartures/${stationCode}`)
    .then(response => {
      if (response.data.error !== undefined) {
        setError(true)
        setResults(null)
        alert("Station code not found, please try again")
      } else {
        setError(false);
        setResults(response.data)
        
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      console.log('errored')
  })}
  function handleChange(event){
    setStationCode(event.target.value);
  }
  return (
    <>
      <Header />
      <form action={handleSubmit}>
        <label htmlFor="stationCode">Station Code:</label>
        <input type="text" id="stationCode" name="stationCode" onChange={handleChange} value={stationCode}/>
        <button type="submit">Get Times</button>
      </form>
      {results != null ? <div className="results">
          <ResultsBoard data={results} setServiceUid={setServiceUid} setShowModal={setShowModal} />
        </div>  : "" 
      }
      {
        showModal ? <InfoModal data={results} serviceUid={serviceUid}/> : ""
      }
      
    </>
  )
}

export default App
