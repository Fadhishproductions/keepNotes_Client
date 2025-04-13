import React from 'react'
import { useSelector } from 'react-redux'

function Notes() {

    const name = useSelector((state)=>state.auth.user.name)
 
  return (
    <div>
      Welcome {name} to notes
    </div>
  )
}

export default Notes
