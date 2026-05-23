import { useState } from "react";
import EquipmentList from "./components/EquipmentList";
import type { Equipment } from './types';

function App() {
  const [selected, setSelected] = useState<Equipment | null>(null);
  return (
    <div>
      <header>
        <h1>Lab Equipment Booking</h1>
      </header>
      <div className='grid'>
        <EquipmentList
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
}

export default App;
