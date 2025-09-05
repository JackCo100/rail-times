import styles from './ResultsBoard.module.css';
export default function ResultsBoard({data, setServiceUid,setShowModal}) {
    function handleClick(uid){
        console.log(uid)
        setServiceUid(uid)
        setShowModal(true)
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
                <tr onClick={() => handleClick(service.serviceUid)} key={service.serviceUid} className="odd:bg-white even:bg-gray-200">
                    <td>{service.locationDetail.gbttBookedDeparture}</td>
                    <td>{service.locationDetail.destination[0]['description']}</td>
                    <td>{service.serviceType === "bus" ? "Bus Replacement" : service.locationDetail.platform}</td>
                    <td>{service.locationDetail.realtimeDeparture}</td>
                    <td>{service.atocName}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
