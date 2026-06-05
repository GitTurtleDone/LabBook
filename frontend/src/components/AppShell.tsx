import { Drawer, Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
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
        { label: "Users", path: "/Users"},
        { label: "Equipment", path: "/Equipment"},
        { label: "Bookings", path: "/Bookings"}
    ]
    return (
        <div>
            <Drawer anchor="left" open={showSideBar}>
                <Box sx={{ width: 150}} >
                    <List>               
                        { navItems.map((i) => (
                            <ListItem key={i.label} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={i.label} />
                                </ListItemButton>
                            </ListItem>
                            
                        ))}    
                    </List>
                </Box>
            </Drawer>
            
        </div>
        
    );    
}

