import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <section className="container nf">
        <div className='not-found'>
        <h1>404 | Not Found</h1>
        <p><Link to='/register'>Regist</Link> - to use</p>
    </div>
    </section>
  )
}

export default Notfound