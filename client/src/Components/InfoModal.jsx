import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InfoModal( {serviceUid, stationCode, setShowModal, setServiceUid,setFavourites} ) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(false);
    const [stationIndex, setStationIndex] = useState(null);
    const [DisruptionInfo, setDisruptionInfo] = useState([]);

    const date = new Date()
    const formattedMonth = date.getMonth()+1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) //add leading 0 to month for jan-sep as required by api call
    const formattedDay = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()  //add leading 0 to day for 0-9 as required by api call
    const year = date.getFullYear() //needed to maintain correct year for favourites
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_SERVER_URL}/getService/${serviceUid}/${date.getFullYear()}/${formattedMonth}/${formattedDay}`)
      .then(response => {
        if (response.data.error !== undefined) {
          setError(true)
          setResults(null)
        } else {
          setError(false);
          setResults(response.data)
          setStationIndex(response.data.locations.findIndex(loc => loc.crs === stationCode))
          if (response.data.locations.find(loc => loc.displayAs === "STARTS") != undefined ){
            if (response.data.locations.find(loc => loc.displayAs === "TERMINATES") != undefined){
              setDisruptionInfo([response.data.locations.find(loc => loc.displayAs === "STARTS"), response.data.locations.find(loc => loc.displayAs === "TERMINATES")])
            }
            else{
              setDisruptionInfo([response.data.locations.find(loc => loc.displayAs === "STARTS"), null])
            }
          } else if (response.data.locations.find(loc => loc.displayAs === "TERMINATES") != undefined){ 
            setDisruptionInfo([null,response.data.locations.find(loc => loc.displayAs === "TERMINATES")])
          } else {setDisruptionInfo([])}
          setShowModal(true)
        }})
      .catch(error => { console.error('Error fetching data:', error)})
    }, [serviceUid])

    function handleClose(){ //set all states back to null/false to close modal
        setResults(null)
        setShowModal(false)
        setServiceUid(null)
        setStationIndex(null)
    }
    function handleClickPrevious(){
      setStationIndex(0)
    }
  return (
    
    <div className="backdrop-blur-sm fixed inset-0 flex-auto items-center justify-center">
      <dialog open className="bg-white border-2 border-black p-4 w-1/2 h-9/10 my-10 overflow-auto inset-0 m-auto relative">
        <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 cursor-pointer hover:bg-red-600" onClick={() => {handleClose()}}>Close</button>
        {results == null ? 
        <>
          <h1>Loading Data</h1> 
          <p>We're getting there</p>
        </>:
        <>
        <h1 className="text-2xl mb-4">Service Details</h1>
        <h2 className="text-xl mb-2">{results.origin[0].publicTime} {results.origin[0].description} to {results.destination[0].description}</h2>
        <h3 className="text-lg mb-2">Operated by {results.atocName}</h3>
        {results.serviceType == "bus" ? <h3 className='bg-red-400 font-bold'>A replacement bus service is operating for this service, please see station signage and staff for information.</h3> : ""}
        {results.serviceType == "ship" ? <h3 className='bg-red-400 font-bold'>This is a ferry service, please see station signage and staff for information.</h3> : ""}
        {results.locations[0].displayAs ==="CANCELLED_CALL" && results.locations[results.locations.length - 1].displayAs === "CANCELLED_CALL" ? <h3 className='bg-red-400 font-bold'>This service has been cancelled due to {results.locations[0].cancelReasonLongText}</h3> : ""}
        {DisruptionInfo.length > 0 ? 
        <h3 className='bg-red-400 font-bold'>
          This service 
          {DisruptionInfo[0] != null ? " is partially cancelled between " + results.locations[0].description + " and " + DisruptionInfo[0].description + ", due to " + DisruptionInfo[0].cancelReasonLongText : ""}
          {DisruptionInfo[1] != null ? "is partially cancelled between " + DisruptionInfo[1].description + " and " + results.locations[results.locations.length -1].description + ", due to " + DisruptionInfo[1].cancelReasonLongText : ""}.
          </h3> : ""}
          
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
                <th className="px-4 py-2">Station</th>
                <th className="px-4 py-2">Scheduled</th>
                <th className="px-1 py-2">Platform</th>
                {results.serviceType == "bus"? null : <th className="px-4 py-2">Expected / Actual</th>}
            </tr>
            </thead>
            <tbody>
              {stationIndex === 0 ? null : 
              <tr className='border cursor-pointer hover:bg-gray-100' onClick={handleClickPrevious}><td colSpan={4}>Show earlier stations</td></tr>}
              {
              results.locations.slice(stationIndex).map((loc) => (
                <tr key={loc.crs} className={loc.crs === stationCode ? "bg-gray-200 border px-4 py-2" : "border px-4 py-2"}>
                    <td className="border px-4 py-2">{loc.description}</td>
                    <td className="border px-4 py-2">{loc.gbttBookedDeparture ? (loc.gbttBookedDeparture).slice(0,2) + ":" + (loc.gbttBookedDeparture).slice(2,4) : (loc.gbttBookedArrival).slice(0,2) + ":" + (loc.gbttBookedArrival).slice(2,4) }</td>
                    {loc.platform == null ? <td className="border px-1 py-2">{"Check signage"}</td> :
                    <td className="border px-1 py-2">{loc.platform}</td> }
                    {loc.displayAs ==="CANCELLED_CALL" ? 
                    <td className=" text-red-800 font-bold">Cancelled</td> :
                    results.serviceType == "bus" || results.serviceType == "ship" ? <td className="border px-4 py-2">{"See station signage"}</td> : loc.realtimeDeparture ? 
                    <td className= {loc.realtimeDeparture <= loc.gbttBookedDeparture ? "text-green-700 font-bold " : "text-red-800 font-bold"} >{(loc.realtimeDeparture).slice(0,2) + ":" + (loc.realtimeDeparture).slice(2,4)}</td>
                    :
                    <td className= {loc.realtimeArrival <= loc.gbttBookedArrival ? "text-green-700 font-bold " : "text-red-800 font-bold"} >{(loc.realtimeArrival).slice(0,2) + ":" + (loc.realtimeArrival).slice(2,4)}</td>}
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