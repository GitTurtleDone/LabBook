import { useState } from "react";
import EquipmentList from "./components/EquipmentList";
import BookingPanel from "./components/BookingPanel";
import AppShell from "./components/AppShell";
import type { Equipment } from './types';

function App() {
  const [selected, setSelected] = useState<Equipment | null>(null);
  return (
    <div>
      {/* <header>
        <h1>Lab Equipment Booking</h1>
      </header> */}
      <div >
        {/* <h1>LabBook</h1> */}
        <AppShell />
        {/* <EquipmentList
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
        <BookingPanel equipment={selected} /> */}

      </div>
    </div>
  );
}

export default App;
