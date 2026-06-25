import { Stack, Box, Typography, OutlinedInput, List, ListItem} from '@mui/material';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_EQUIPMENT } from '../graphql/queries';


export default function BookingPage() {
    const [userId, setUserId] = useState<number|undefined>(undefined)
    const [equipmentId, setEquipmentId] = useState<number|undefined> (undefined)

    const { userLoading, userError, userList } = useQuery(GET_USERS);
    const equipmentList = useQuery(GET_EQUIPMENT)
    return (
        <div>
            <h3>Booking an equipment</h3>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
                
                <Box sx={{pl: 5, align: 'left'}} >
                    <Typography>Users</Typography>
                    {userList.map((u) => (
                        <ListItem>
                            {u.firstName} {u.lastName}
                        <ListItem
                    ))}
                    <Typography>Equipment</Typography>
                </Box>
                <Stack>
                    <Typography>Bookings</Typography>
                </Stack>
            </Box>
        </div>
    )

};