import {
  Stack,
  Box,
  Typography,
  OutlinedInput,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USERS,
  GET_EQUIPMENT_LIST,
  CREATE_BOOKING,
  GET_BOOKINGS_FOR_USER,
  GET_BOOKINGS_FOR_EQUIPMENT,
} from "../graphql/queries";
import {
  type User,
  type Equipment,
  type Booking,
  type BookingInput,
  bookingInputSchema,
} from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Add } from "@mui/icons-material";
import { id } from "zod/locales";

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
  const [bookingId, setBookingId] = useState<string | undefined>(undefined);
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showBookingByUserList, setShowBookingByUserList] = useState(false);
  const [showBookingByEquipmentList, setShowBookingByEquipmentList] =
    useState(false);
  const [showReserveABooking, setShowReserveABooking] = useState(false);
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
    error: bookingsByUserError,
    loading: bookingsByUserLoading,
    data: bookingsByUserData,
  } = useQuery<{ bookingsByUser: Booking[] }>(GET_BOOKINGS_FOR_USER, {
    variables: {userId: userId},
    skip: !userId,
  });

  const {
    error: bookingsByEquipmentError,
    loading: bookingsByEquipmentLoading,
    data: bookingsByEquipmentData,
  } = useQuery<{ bookingsByEquipment: Booking[] }>(GET_BOOKINGS_FOR_EQUIPMENT, {
    variables: {equipmentId: equipmentId },
    skip: !equipmentId,
  });
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
  const [createBooking] = useMutation(CREATE_BOOKING);
  const onCreateBooking = async (bookingInput: BookingInput) => {
    await createBooking({ variables: { bookingInput } });
  };

  return (
    <div>
      {/* Select Equipment Expand */}
      <Typography variant="h4" sx={{ mt: 5, mb: 5 }} color="black">
        Bookings
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Box sx={{ pl: 5, align: "left" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              onClick={() => setShowEquipmentList((prev) => !prev)}
            >
              {showEquipmentList ? <ExpandLessIcon /> : <AddIcon />}
            </IconButton>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Select an equipment
            </Typography>
          </Box>
          <Collapse in={showEquipmentList}>
            <List>
              {equipmentData?.equipmentList.map((e) => (
                <ListItemButton
                  key={e.id}
                  onClick={() => {
                    setEquipmentId(e.id);
                    setValue("equipmentId", e.id);
                  }}
                >
                  <ListItemText primary={e.name}></ListItemText>
                </ListItemButton>
              ))}
            </List>
          </Collapse>


          {/* Select User Expand */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              onClick={() => setShowUserList(!showUserList)}
            >
              {showUserList ? (
                <ExpandLessIcon></ExpandLessIcon>
              ) : (
                <AddIcon></AddIcon>
              )}
            </IconButton>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Select a user
            </Typography>
          </Box>

          <Collapse in={showUserList}>
            <List>
              {userData?.usersList.map((u) => (
                <ListItemButton
                  key={u.id}
                  onClick={() => {
                    setUserId(u.id);
                    setValue("userId", u.id);
                  }}
                >
                  <ListItemText primary={u.firstName + " " + u.lastName} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Right panel */}
        <Stack>

          {/* Bookings by Equipment */}
          <Box sx={{display: "flex", alignItems: "center"}}>
              <IconButton size="small" onClick={()=> setShowBookingByEquipmentList(!showBookingByEquipmentList)}>
                {showBookingByEquipmentList 
                ? <ExpandLessIcon></ExpandLessIcon>
                : <AddIcon></AddIcon>}
              </IconButton>
              <Typography variant="h6">Bookings by Equipment</Typography>
          </Box>
          <Collapse in={showBookingByEquipmentList}>
            {bookingsByEquipmentData?.bookingsByEquipment.map((b) =>
              <Box sx={{display:"flex", alignItems: "top"}}>
                <ListItemButton key={b.id} onClick={() => {
                  setBookingId(b.id)
                  setValue("equipmentId", b.equipment.id)
                  setValue("userId", b.user.id)
                  setValue("startTime", b.startTime)
                  setValue("endTime", b.endTime)}}>
                  <ListItemText primary={b.id + " | " + b.startTime + " | "
                    + b.endTime + " | " + b.user.firstName + " " + b.user.lastName + " | " + b.status} />
                </ListItemButton>
              </Box>
            )}
          </Collapse>
          
          {/*Bookings By User*/ }
          <Box sx={{display: "flex", alignItems: "center"}}>
            <IconButton size="small" onClick={() => setShowBookingByUserList(!showBookingByUserList)}>
              {showBookingByUserList 
                ? <ExpandLessIcon></ExpandLessIcon>
                : <AddIcon></AddIcon>
              }
            </IconButton>
            <Typography variant="h6">Bookings by User</Typography>
          </Box>  
          <Collapse in={showBookingByUserList}>
            {
              bookingsByUserData?.bookingsByUser.map((b) => 
                <ListItemButton key={b.id} onClick={() => {
                  setBookingId(b.id)
                  setValue("equipmentId", b.equipment.id)
                  setValue("userId", b.user.id)
                  setValue("startTime", b.startTime)
                  setValue("endTime", b.endTime)
                  setValue("purpose", b.purpose) 
                } 

                }>
                  <ListItemText primary={b.id + " | " + b.startTime + " | " + b.endTime
                     + " | " + b.equipment.name + " | " + b.status
                  }/>
                </ListItemButton>

              )
            }
          </Collapse>  
          {/*Resever A Booking*/}
          <Box sx={{ display: "flex", alignItems: "top" }}>
            <IconButton
              size="small"
              onClick={() =>
                setShowReserveABooking(!showReserveABooking)
              }
            >
              {showReserveABooking ? (
                <ExpandLessIcon></ExpandLessIcon>
              ) : (
                <AddIcon></AddIcon>
              )}
            </IconButton>
            <Typography variant="h6" >
              Reserve a Booking
            </Typography>
          </Box>
          <Collapse in={showReserveABooking}>
            {bookingInputElementLayout.map(
              ({ label, type, elementKey, disabled, registered }) => (
                <Box
                  key={elementKey}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    pt: 2,
                    pr: 10,
                  }}
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
                      value={bookingId ?? ""}
                    ></OutlinedInput>
                  )}
                </Box>
              ),
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                mt: 5,
                gap: 5,
              }}
            >
              <Button
                variant="contained"
                sx={{ width: 100 }}
                onClick={handleSubmit(onCreateBooking)}
              >
                {" "}
                Create
              </Button>
              <Button variant="contained" sx={{ width: 100 }} color="error">
                Cancel
              </Button>
            </Box>
          </Collapse>
        </Stack>
      </Box>
    </div>
  );
}
