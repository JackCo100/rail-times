import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InfoModal( {serviceUid, setShowModal, setServiceUid} ) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(false);
    const date = new Date()
    const formattedMonth = date.getMonth() > 10 ? date.getMonth() : '0' + (date.getMonth() + 1) //add leading 0 to month for jan-sep as required by api call
    const formattedDay = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()  //add leading 0 to day for 0-9 as required by api call
    useEffect(() => {
      axios.get(`http://localhost:3000/getService/${serviceUid}/${date.getFullYear()}/${formattedMonth}/${formattedDay}`)
      .then(response => {
        if (response.data.error !== undefined) {
          setError(true)
          setResults(null)
        } else {
          setError(false);
          setResults(response.data)
          setShowModal(true)
        }})
      .catch(error => { console.error('Error fetching data:', error)})
    }, [serviceUid])

    function handleClose(){ //set all states back to null/false to close modal
        setResults(null)
        setShowModal(false)
        setServiceUid(null)
    }
        
  return (
    results == null ? <p>Getting Data</p> :
  <dialog open className="bg-white border-2 border-black p-4 fixed bottom-4 left-0 w-3/4 h-3/4 overflow-auto">
    <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1" onClick={() => {handleClose()}}>Close</button>
    <h1 className="text-2xl mb-4">Service Details</h1>
    <h2 className="text-xl mb-2">{results.origin[0].publicTime} {results.origin[0].description} to {results.destination[0].description}</h2>
    <h3 className="text-lg mb-2">Operated by {results.atocName}</h3>
    <table className="table-auto">
      <thead>
        <tr>
            <th className="px-4 py-2">Station</th>
            <th className="px-4 py-2">Scheduled</th>
            <th className="px-4 py-2">Expected / Actual</th>
        </tr>
        </thead>
        <tbody>
          {
          results.locations.map((loc) => (
            <tr key={loc.crs}>
                <td className="border px-4 py-2">{loc.description}</td>
                <td className="border px-4 py-2">{loc.gbttBookedDeparture}</td>
                <td className="border px-4 py-2">{loc.realtimeDeparture}</td>
            </tr>
          ))
        }
        </tbody>
    </table>
</dialog>
  )
}