import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Track from './components/Track';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';
import Private from './components/Private';
import Diet from './components/Diet';
import 'remixicon/fonts/remixicon.css'

function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('nutrify-user')))

  // useEffect(() => {
  //   // console.log('user context', loggedUser);
  //   // if (localStorage.getItem('nutrify-user') !== null) {
  //   //   setLoggedUser(JSON.parse(localStorage.getItem('nutrify-user')))
  //   // } else {
  //   //   navigate('/login')
  //   // }


  //   if (localStorage.getItem('nutrify-user') !== null) {
  //     setLoggedUser(JSON.parse(localStorage.getItem('nutrify-user')))
  //   }
  // }, [])

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/track' element={<Private Component={Track} />} />
            <Route path='/diet' element={<Private Component={Diet} />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;