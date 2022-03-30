import React from 'react'

const Food = ({ dot }) => {
  return (
    <div style={{left: `${dot[0]}%`, top: `${dot[1]}%`}} className='food'/>
  )
}

export default Food