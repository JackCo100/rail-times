import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InfoModal( {serviceUid}) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(false);
    const date = new Date()
    useEffect(() => {
      axios.get(`http://localhost:3000/getService/${serviceUid}/2025/09/05`) // temp hardcoded date
      .then(response => {
        if (response.data.error !== undefined) {
          setError(true)
          setResults(null)
          alert("Service not found, please try again")
        } else {
          setError(false);
          console.log(response.data)
          setResults(response.data)
        }})
      .catch(error => { console.error('Error fetching data:', error)})
    }, [serviceUid])
        
  return (
  <dialog open className="bg-white border-2 border-black p-4 fixed bottom-4 right-4">
    <h1 className="text-2xl mb-4">Service Details</h1>
    <h2 className="text-xl mb-2">{results.origin[0].publicTime} {results.origin[0].description} to {results.destination[0].description}</h2>
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