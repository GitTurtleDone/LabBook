import { Drawer, Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import { NavLink, Outlet} from "react-router-dom";
// import Drawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import List from "@mui/material/Button";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import type { from } from "@apollo/client";
// import { PersonIcon, PrecisionManufacturingIcon} from '@mui/icons-material';
interface NavItem { label: string; path: string};


export default function AppShell() {
    const [showSideBar, setShowSideBar] = useState(true);
    const navItems: NavItem[] = [
        { label: "Home", path: "/"},
        { label: "Users", path: "/users"},
        { label: "Equipment", path: "/equipment"},
        { label: "Bookings", path: "/bookings"}
    ]
    return (
    <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" anchor="left" open={showSideBar}>
            <Box sx={{ width: 150 }}>
                <List>
                    {navItems.map((i) => (
                        <NavLink key={i.path} to={i.path} end>
                            {({ isActive }: { isActive: boolean }) => (
                                <ListItem disablePadding>
                                    <ListItemButton selected={isActive}>
                                        <ListItemText primary={i.label} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    ))}
                </List>
            </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <Outlet />
        </Box>
    </Box>
);
    
}

