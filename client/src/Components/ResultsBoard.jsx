export default function ResultsBoard({data}) {
    return (
    <div>
      <h1>Results</h1>
      <p>{data.location.name}</p>
      <table>
        <tr>
            <th>Scheduled Departure</th>
            <th>Destination</th>
            <th>Platform</th>
            <th>Status</th>
            <th>Operator</th>
        </tr>
            {data.services.map((service, index) => (
                <tr key={index}>
                    <td>{service.locationDetail.gbttBookedDeparture}</td>
                    <td>{service.locationDetail.destination[0]['description']}</td>
                    
                    <td>{service.locationDetail.platform}</td>
                    <td>{service.locationDetail.realtimeDeparture}</td>
                    <td>{service.atocName}</td>
                </tr>
            ))}
      </table>
    </div>
  );
}
