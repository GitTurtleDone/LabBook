import {
  Stack,
  Box,
  Typography,
  OutlinedInput,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_EQUIPMENT_LIST, CREATE_BOOKING } from "../graphql/queries";
import {
  type User,
  type Equipment,
  type Booking,
  type BookingInput,
  bookingInputSchema,
} from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

type BookingInputElementLayout = {
  label: string;
  type: string;
  elementKey: keyof BookingInput | "id";
  // source: 'equipment' | 'booking' | 'user',
  disabled: boolean;
  registered: boolean;
};

export default function BookingPage() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [equipmentId, setEquipmentId] = useState<string | undefined>(undefined);
  const bookingInputElementLayout: BookingInputElementLayout[] = [
    {
      label: "Booking ID",
      type: "string",
      elementKey: "id",
      disabled: true,
      registered: false,
    },
    {
      label: "Equipment ID",
      type: "string",
      elementKey: "equipmentId",
      disabled: true,
      registered: true,
    },
    {
      label: "User ID",
      type: "string",
      elementKey: "userId",
      disabled: true,
      registered: true,
    },
    {
      label: "Start Time",
      type: "datetime-local",
      elementKey: "startTime",
      disabled: false,
      registered: true,
    },
    {
      label: "End Time",
      type: "datetime-local",
      elementKey: "endTime",
      disabled: false,
      registered: true,
    },
    {
      label: "Purpose",
      type: "string",
      elementKey: "purpose",
      disabled: false,
      registered: true,
    },
  ];

  const {
    error: userError,
    loading: userLoading,
    data: userData,
  } = useQuery<{ usersList: User[] }>(GET_USERS);
  const {
    error: equipmentError,
    loading: equipmentLoading,
    data: equipmentData,
  } = useQuery<{ equipmentList: Equipment[] }>(GET_EQUIPMENT_LIST);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingInputSchema),
    defaultValues: {
      equipmentId: "",
      userId: "",
      startTime: "",
      endTime: "",
      purpose: "",
    },
  });
  const createBooking = useMutation (CREATE_BOOKING)
  // const onCreateBooking = async (bookingInput: BookingInput) => {
  //   await createBooking ({ variables: {booking: {bookingInput.id, bookingInput.startTime,} }})
  // } 
  return (
    <div>
      <h3>Booking an equipment</h3>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Box sx={{ pl: 5, align: "left" }}>
          <Typography variant='h6' sx={{textAlign: 'left'}}>Select an equipment</Typography>
          <List>
            {equipmentData?.equipmentList.map((e) => (
              <ListItemButton key={e.id} onClick={() => { setEquipmentId(e.id); setValue('equipmentId', e.id); }}>
                <ListItemText primary={e.name}></ListItemText>
              </ListItemButton>
            ))}
          </List>
          <Typography variant="h6" sx={{textAlign: 'left'}}>Select user</Typography>
          {/* <Typography>{userData?.userList[0].email}</Typography> */}
          <List>
            {userData?.usersList.map((u) => (
              <ListItemButton key={u.id} onClick={() => { setUserId(u.id); setValue('userId', u.id); }}>
                <ListItemText primary={u.firstName + " " + u.lastName} />
              </ListItemButton>
            ))}
          </List>
          
        </Box>
        <Stack>
          <Typography variant="h5" sx={{pb: 5}}>Reserve a Booking</Typography>
          {bookingInputElementLayout.map(
            ({ label, type, elementKey, disabled, registered }) => (
              <Box
                key={elementKey}
                sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", pt: 2, pr:10 }}
              >
                <Typography sx={{ textAlign: "left" }}>{label}</Typography>
                {registered ? (
                  <OutlinedInput
                    {...register(elementKey as keyof BookingInput)}
                    type={type}
                    disabled={disabled}
                  ></OutlinedInput>
                ) : (
                  <OutlinedInput
                    type={type}
                    disabled={disabled}
                  ></OutlinedInput>
                )}
              </Box>
            ),
          )}
          <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', mt: 5, gap: 5}}>
            <Button variant="contained" sx={{width: 100}} > Create</Button>
            <Button variant="contained" sx={{width: 100}} color="error">Cancel</Button>
          </Box>
          
        </Stack>
        
      </Box>
    </div>
  );
}
