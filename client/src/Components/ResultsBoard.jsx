import styles from './ResultsBoard.module.css';
import { useState } from 'react';

export default function ResultsBoard({data, setServiceUid}) {
    const [favourite, setFavourite] = useState(localStorage.getItem(data.location.crs) != null ? true : false);
    function handleClick(uid){
        setServiceUid(uid)
    }
    function addFavourite(){
        localStorage.setItem(data.location.crs, data.location.name);
        setFavourite(true);
    }
    function removeFavourite(){
        localStorage.removeItem(data.location.crs);
        setFavourite(false);
    }
    console.log(favourite)
    return (
    <div>
      <h1>Results</h1>
      <p>Live departures from <b>{data.location.name}</b> {data.filter ? " calling at" : ""} {data.filter ? <b>{data.filter.destination.name}</b> : ""}</p>
      <button className="absolute top-20 right-2 bg-orange-500 text-white px-2 py-1 cursor-pointer hover:bg-orange-600" onClick={favourite ? () => removeFavourite() : () => addFavourite()}>{favourite ? "Remove Favourite" : "Favourite"}</button>
      <table className="border border-slate-400 table-fixed w-full text-center">
        <thead className="bg-slate-800 text-white">
            <tr>
                <th>Scheduled</th>
                <th>Destination</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Operator</th>
            </tr>
        </thead>
        <tbody>
            {data.services.map((service) => (
                <tr onClick={() => handleClick(service.serviceUid)} key={service.serviceUid} className="odd:bg-white even:bg-gray-200 hover:bg-gray-300 cursor-pointer">
                    <td>{(service.locationDetail.gbttBookedDeparture).slice(0,2) + ":" + (service.locationDetail.gbttBookedDeparture).slice(2,4)}</td>
                    <td>{service.locationDetail.destination[0]['description']}</td>
                    <td>{service.serviceType === "bus"  ? "Bus Replacement" : service.serviceType === "ship" ? "Ferry" : service.locationDetail.platform}</td>
                    <td className={service.locationDetail.displayAs === "CANCELLED_CALL" ? " text-red-800 font-bold" : ""}>{service.serviceType === "bus" || service.serviceType === "ship" || service.locationDetail.realtimeDeparture == null ? "See station signage" : service.locationDetail.displayAs === "CANCELLED_CALL" ? "Cancelled" : (service.locationDetail.realtimeDeparture).slice(0,2) + ":" + (service.locationDetail.realtimeDeparture).slice(2,4)}</td>
                    <td>{service.atocName}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
