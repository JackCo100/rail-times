import styles from './ResultsBoard.module.css';
export default function ResultsBoard({data}) {
    return (
    <div>
      <h1>Results</h1>
      <p>Departures for the next two hours from <b>{data.location.name}</b></p>
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
            {data.services.map((service, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-200">
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
