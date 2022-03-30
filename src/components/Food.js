import React from 'react'

const Food = ({ dot }) => {
  return (
    <div style={{top: `${dot[0]}%`, left: `${dot[1]}%`}} className='food'/>
  )
}

export default Food