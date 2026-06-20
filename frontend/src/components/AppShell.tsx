import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Menu,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
// import Drawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import List from "@mui/material/Button";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import type { from } from "@apollo/client";
// import { PersonIcon, PrecisionManufacturingIcon} from '@mui/icons-material';
interface NavItem {
  label: string;
  path: string;
}
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function AppShell() {
  const [showSideBar, setShowSideBar] = useState(true);
  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Users", path: "/users" },
    { label: "Equipment", path: "/equipment" },
    { label: "Bookings", path: "/bookings" },
  ];
  return (
    <div>
      {/* <Button sx={{ width: 100, background: '#ffffff' }} onClick={() => setShowSideBar(!showSideBar)}>Side Bar</Button> */}

      <Box sx={{ display: "flex" }}>
        <Drawer variant="persistent" anchor="left" open={showSideBar}>
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
        <IconButton
          onClick={() => setShowSideBar(!showSideBar)}
          sx={{
            position: "fixed",
            left: showSideBar ? 110 : 0,
            top: 8,
            trasition: "left 1s",
            zIndex: 1300,
          }}
        >
          {showSideBar ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Box
          component="main"
          sx={{
            marginLeft: showSideBar ? '150px' : 0,
            flexGrow: 1,
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            transition: 'margin-left 0.3s'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}
