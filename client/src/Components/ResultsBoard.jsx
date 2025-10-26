import styles from './ResultsBoard.module.css';
export default function ResultsBoard({data, setServiceUid}) {
    function handleClick(uid){
        setServiceUid(uid)
    }
    return (
    <div>
      <h1>Results</h1>
      <p>Live departures from <b>{data.location.name}</b></p>
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
                    <td>{service.serviceType === "bus" ? "Bus Replacement" : service.locationDetail.platform}</td>
                    <td>{(service.locationDetail.realtimeDeparture).slice(0,2) + ":" + (service.locationDetail.realtimeDeparture).slice(2,4) }</td>
                    <td>{service.atocName}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
