import './App.css'
import Header from './Components/Header.jsx'
import ResultsBoard from './Components/ResultsBoard.jsx';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [stationCode, setStationCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

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
      {/*response.data.error !== undefined ?
      setResults(null) : setResults(response.data) ; */}
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
          <ResultsBoard data={results} />
        </div>  : ""
      }
    </>
  )
}

export default App
