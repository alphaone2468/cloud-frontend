import './App.css'
import Home from './components/Home'
import Video from './components/Video'
import Upload from './components/Upload'
import { Routes,Route,Link } from 'react-router-dom'
function App() {
  
  return (
    <>
   <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Neonflake Enterprises</Link>
      </div>
      <ul className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/upload" className="navbar-link">Upload</Link>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/upload" element={<Upload/>}></Route>
      <Route path="/video/:id" element={<Video/>}></Route>
    </Routes>
    </>
  )
}

export default App
