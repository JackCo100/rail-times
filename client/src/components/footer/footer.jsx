export default function Footer() {
  return (
    <footer className="bg-blue-950 border-blue-600 mt-6 pt-4 pb-4 static bottom-0 w-full">
      <div className="w-full flex justify-between ">
        <p className="text-white text-sm text-center w-full">
          UK Railway Times. Powered by <a href="https://www.realtimetrains.co.uk/" className="text-blue-200 hover:text-white transition-colors">Real Time Trains API</a>.
        </p>
      </div>
    </footer>
  );
}