import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InfoModal( {serviceUid, stationCode, setShowModal, setServiceUid} ) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(false);
    const date = new Date()
    const formattedMonth = date.getMonth()+1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) //add leading 0 to month for jan-sep as required by api call
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
    
    <div className="backdrop-blur-sm fixed inset-0 flex-auto items-center justify-center">
      <dialog open className="bg-white border-2 border-black p-4 w-1/2 h-9/10 my-10 overflow-auto inset-0 m-auto relative">
        <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1" onClick={() => {handleClose()}}>Close</button>
        {results == null ? 
        <><h1>Loading Data</h1> 
        <p>We're getting there</p>
        </>:
        <>
        <h1 className="text-2xl mb-4">Service Details</h1>
        <h2 className="text-xl mb-2">{results.origin[0].publicTime} {results.origin[0].description} to {results.destination[0].description}</h2>
        <h3 className="text-lg mb-2">Operated by {results.atocName}</h3>
        {results.serviceType == "bus"? <h3 className='bg-red-400 font-bold'>A replacement bus service is operating for this service, please see station signage and staff for information.</h3> : ""}
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
                <th className="px-4 py-2">Station</th>
                <th className="px-4 py-2">Scheduled</th>
                {results.serviceType == "bus"? "" : <th className="px-4 py-2">Expected / Actual</th>}
            </tr>
            </thead>
            <tbody>
              {
              results.locations.map((loc) => (
                <tr key={loc.crs} className={loc.crs === stationCode ? "bg-gray-200 border px-4 py-2" : "border px-4 py-2"}>
                    <td className="border px-4 py-2">{loc.description}</td>
                    <td className="border px-4 py-2">{loc.gbttBookedDeparture ? loc.gbttBookedDeparture : loc.gbttBookedArrival}</td>
                    {results.serviceType == "bus"? "" : loc.realtimeDeparture ? 
                    <td className= {loc.realtimeDeparture <= loc.gbttBookedDeparture ? "text-green-700 font-bold " : "text-red-800 font-bold"} >{loc.realtimeDeparture}</td>
                    :
                    <td className= {loc.realtimeArrival <= loc.gbttBookedArrival ? "text-green-700 font-bold " : "text-red-800 font-bold"} >{loc.realtimeArrival}</td>}
                </tr>
              ))
            }
            </tbody>
        </table>
        <p>If you arrive at your destination 15 or more minutes late, you may be entitled to compensation. Contact <a className={"underline text-blue-600 hover:text-blue-800"} href='https://www.nationalrail.co.uk/travel-information/find-a-train-company/'>{results.atocName}</a> for more information.</p> </>}
      </dialog>
    </div>
    
  )
}