import styles from './NavBar.module.css';
export default function NavBar({ handleSubmit, handleStnCodeChange, handleViaCodeChange, stationCode, viaCode }) {
  return (
    <>
    <div className='w-full bg-blue-950 p-2'>
      <ul>
        <li><a className='text-xl sm:text-2xl list-none text-white hover:text-blue-300' href='/'>UK Railway Times</a></li>
      </ul>
    </div>
    <div className='w-full bg-blue-100 p-4 text-center'>
      <p className='text-sm sm:text-base mb-4'>Enter a station code and find live arrivals and departures.</p>
      <form action={handleSubmit} className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 flex-wrap'>
        <label htmlFor="stationCode" className='text-sm sm:text-base'>Station Code: </label>
        <input type="text" id="stationCode" name="stationCode" onChange={handleStnCodeChange} value={stationCode} placeholder="Station code" className='border rounded px-2 py-1 w-full sm:w-auto' required maxLength={3}/>
        
        <label htmlFor="viaCode" className='text-sm sm:text-base'>Calling at (optional): </label>
        <input type="text" id="viaCode" name="viaCode" onChange={handleViaCodeChange} value={viaCode} placeholder='calling at' className='border rounded px-2 py-1 w-full sm:w-auto' maxLength={3}/>
        <button type="submit" className="bg-blue-300 hover:bg-blue-500 cursor-pointer px-3 py-1 rounded text-sm sm:text-base w-full sm:w-auto">Get Times</button>
      </form>
    </div>
    </>
  );
}