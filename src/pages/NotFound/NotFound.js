import React from 'react'
import { Link } from 'react-router-dom'


const styles404 = {
  color: '#7b7b7b',
  fontWeight: 'bold',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
  alignItems: 'center',
}

export const NotFound = () => {
  return (
    <div style={{...styles404}}>
      <h1> 404 Not Found Page </h1>
      <p> Deesculpe mais essa página não existe </p>
      <Link to="/" className='button'> Voltar </Link>
    </div>
  )
}
