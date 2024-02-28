import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'
import Header from './Header'

const Private = (props) => {
  const loggedData = useContext(UserContext)
  return (
    loggedData.loggedUser !== null
      ? <div>
        <Header />
        <props.Component />
      </div>
      : <Navigate to="/login" />
  )
}

export default Private