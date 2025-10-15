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
  function handleDefaultSelect(code){
    setStationCode(code);
  }
  return (
    <>
      <Header />
      <form action={handleSubmit}>
        <label htmlFor="stationCode">Station Code: </label>
        <input type="text" id="stationCode" name="stationCode" onChange={handleChange} value={stationCode} placeholder="Station code" className='border rounded px-2 m-2'/>
        <button type="submit" className="bg-blue-300 hover:bg-blue-500 px-1 rounded">Get Times</button>
      </form>
      {results != null ? <div className="results">
          <ResultsBoard data={results} setServiceUid={setServiceUid}/>
        </div>  : 
        <div className="w-1/3 m-auto text-center">
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
          </ul>
        </div>
      }
      {
        serviceUid != null ? <InfoModal data={results} serviceUid={serviceUid} stationCode= {stationCode} setShowModal={setShowModal} setServiceUid={setServiceUid}/> : ""
      }
    </>
  )
}

export default App
