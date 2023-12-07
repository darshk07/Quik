import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="body w-screen h-screen p-[30px] box-border">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
