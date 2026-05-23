import { useState } from 'react'
import { EquipmentList } from './components/EquipmentList'

function App() {
  
  return (
    <div>
      <header>
        <h1>Lab Equipment Booking</h1>
      </header>
      <div className='grid'>
        <EquipmentList/>
      </div>
    </div>
  )
}

export default App
