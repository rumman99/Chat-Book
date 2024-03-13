import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Chats from './components/Chats/Chats/Chats'

function App() {

  return (
    <div className='app'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/chats' element={<Chats/>}/>
    </Routes>
    </div>
  )
}

export default App
