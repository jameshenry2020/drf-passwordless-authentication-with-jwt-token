import { Link } from "react-router-dom";
function App() {
  return (
      <section className="w-full h-screen flex items-center justify-center">
          <Link to={"/login"} className="py-3 px-6 border shadow-md bg-blue-500 text-center text-white">Get Started</Link>
      </section> 
  )
}

export default App
