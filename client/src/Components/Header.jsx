import styles from './Header.module.css';
export default function NavBar({ handleSubmit, handleStnCodeChange, handleViaCodeChange, stationCode, viaCode }) {
  return (
    <div>
      <a className='text-2xl'  href='/'>UK Railway Times</a>
      <p>Enter a station code and find live arrivals and departures.</p>
      <form action={handleSubmit}>
        <label htmlFor="stationCode">Station Code: </label>
        <input type="text" id="stationCode" name="stationCode" onChange={handleStnCodeChange} value={stationCode} placeholder="Station code" className='border rounded px-2 m-2' required maxLength={3}/>
        
        <label htmlFor="viaCode"> Calling at (optional): </label>
        <input type="text" id="viaCode" name="viaCode" onChange={handleViaCodeChange} value={viaCode} placeholder='calling at' className='border rounded px-2 m-2' maxLength={3}/>
        <button type="submit" className="bg-blue-300 hover:bg-blue-500 cursor-pointer px-1 rounded">Get Times</button>
      </form>
    </div>
    
  );
}