// import { NavLink, Outlet } from "react-router-dom";
interface NavItem { label: string; path: string};
const navItems: NavItem[] = [
    { label: "Users", path: "/Users"},
    { label: "Equipment", path: "/Equipment"},
    { label: "Bookings", path: "/Bookings"}
]

export default function AppShell() {
    return (
        <div className="sideBar">
            {navItems.map((i) =>(
                <a href={i.path}></a>
            ))}
        </div>
        
    )    
};

