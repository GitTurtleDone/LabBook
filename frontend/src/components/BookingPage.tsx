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
import { type User, type Equipment, type Booking, type BookingInput, bookingInputSchema } from "../types";
import { set } from "zod";
import { id } from "zod/locales";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

type BookingInputElementLayout = {
    label: string,
    type: string,
    elementKey: keyof BookingInput | 'id', 
    // source: 'equipment' | 'booking' | 'user', 
    disabled: boolean,
    registered: boolean,
}


export default function BookingPage() {
  const [userId, setUserId] = useState<string|undefined>(undefined)
  const [equipmentId, setEquipmentId] = useState<string|undefined> (undefined)
  const bookingInputElementLayout: BookingInputElementLayout[] = [
    {label: "Booking ID", type: "string", elementKey: "id", disabled: true, registered: false},
    {label: "Equpipment ID", type: "string", elementKey: "equipmentId",  disabled: false, registered: true},
    {label: "User ID", type: "string", elementKey: "userId",  disabled: false, registered: true},
    {label: "Start Time", type: "string", elementKey: "startTime", disabled: false, registered: true},
    {label: "End Time", type: "string", elementKey: "endTime", disabled: false, registered: true},
    {label: "Purpose", type: "string", elementKey: "purpose", disabled: false, registered: true},
  ]

  const { error: userError, loading: userLoading, data: userData } = useQuery<{usersList: User[]}>(GET_USERS);
  const { error: equipmentError, loading: equipmentLoading, data: equipmentData} = useQuery<{equipmentList: Equipment[]}>(GET_EQUIPMENT_LIST);
  const { register, handleSubmit, formState: {errors, isSubmitting } } = useForm({
    resolver: zodResolver(bookingInputSchema),
    defaultValues: {
      equipmentId: "",
      userId: "",
      startTime: "",
      endTime: "",
      purpose: "",
    }
  })
  return (
    <div>
      <h3>Booking an equipment</h3>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Box sx={{ pl: 5, align: "left" }}>
          <Typography>Select user</Typography>
          {/* <Typography>{userData?.userList[0].email}</Typography> */}
            <List>
                {userData?.usersList.map((u) => (
                    <ListItemButton key={u.id} onClick={() => 
                        setUserId(u.id)}>
                        <ListItemText primary={u.firstName  + " " + u.lastName} />
                    </ListItemButton>
                ))}
            </List>
          <Typography>Select an equipment</Typography>
            <List>
                {equipmentData?.equipmentList.map((e) =>(
                    <ListItemButton key={e.id} onClick={() => setEquipmentId(e.id)}>
                        <ListItemText primary={e.name}></ListItemText>
                    </ListItemButton>

                ))}
            </List>
        
        </Box>
        <Stack>
          <Typography>Reserve a Booking</Typography>
          {bookingInputElementLayout.map(({label, type, elementKey, disabled, registered}) => (          
              <Box key={elementKey} sx={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
                <Typography>{label}</Typography>
                { registered ? (
                  <OutlinedInput {...register(elementKey)} type={type} disabled={disabled} ></OutlinedInput>
                ) : ()}
              </Box>
              
            ))}
          
        </Stack>
      </Box>
    </div>
  );
}