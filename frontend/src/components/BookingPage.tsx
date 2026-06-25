import {
  Stack,
  Box,
  Typography,
  OutlinedInput,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_EQUIPMENT_LIST } from "../graphql/queries";
import type { User, Equipment, Booking } from "../types";
import { set } from "zod";

export default function BookingPage() {
  const [userId, setUserId] = useState<string|undefined>(undefined)
  const [equipmentId, setEquipmentId] = useState<string|undefined> (undefined)


  const { error: userError, loading: userLoading, data: userData } = useQuery<{usersList: User[]}>(GET_USERS);
  const { error: equipmentError, loading: equipmentLoading, data: equipmentData} = useQuery<{equipmentList: Equipment[]}>(GET_EQUIPMENT_LIST);
//   console.log(userData?.usersList)
//   console.log(equipmentData)
  // const equipmentList = useQuery(GET_EQUIPMENT)
  return (
    <div>
      <h3>Booking an equipment</h3>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Box sx={{ pl: 5, align: "left" }}>
          <Typography>Users</Typography>
          {/* <Typography>{userData?.userList[0].email}</Typography> */}
            <List>
                {userData?.usersList.map((u) => (
                    <ListItemButton key={u.id} onClick={() => 
                        setUserId(u.id)}>
                        <ListItemText primary={u.firstName  + " " + u.lastName} />
                    </ListItemButton>
                ))}
            </List>
          <Typography>Equipment</Typography>
            <List>
                {equipmentData?.equipmentList.map((e) =>(
                    <ListItemButton key={e.id} onClick={() => setEquipmentId(e.id)}>
                        <ListItemText primary={e.name}></ListItemText>
                    </ListItemButton>

                ))}
            </List>
        
        </Box>
        <Stack>
          <Typography>Bookings</Typography>
        </Stack>
      </Box>
    </div>
  );
}