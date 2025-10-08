import styles from './Header.module.css';
export default function NavBar() {
  return (
    <div>
      <a className='text-2xl'  href='/'>UK Railway Times</a>
      <p>Enter a station code and find live arrivals and departures.</p>
    </div>
  );
}