import { useState } from "react";
import EquipmentList from "./components/EquipmentList";
import BookingPanel from "./components/BookingPanel";
import AppShell from "./components/AppShell";
// import type { Equipment } from './types';
import UserPage from "./components/UserPage";
import BookingPage from "./components/BookingPage";
import EquipmentPage from "./components/EquipmentPage";
import HomePage from "./components/HomePage";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  // const [selected, setSelected] = useState<Equipment | null>(null);
  const router = createBrowserRouter([{
    path:'/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage />},
      { path: '/users', element: <UserPage />},
      { path: '/equipment', element: <EquipmentPage />},
      { path: '/bookings', element: <BookingPage />},
    ]                        
  },
  ])
  return (
    <RouterProvider router={router} />
  );
}


export default App;
