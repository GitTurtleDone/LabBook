import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_BOOKINGS_FOR_EQUIPMENT,
    GET_USERS,
    CREATE_BOOKING,
    CANCEL_BOOKING
} from '../graphql/queries'

import type { Equipment, Booking, User } from '../types';

interface Props {
    equipment: Equipment | null;
}

function BookingPage({ equipment }: Props) {
    const [userId, setUserId] = useState('')
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const { data: usersData } = useQuery<{usersList: User[]}>(GET_USERS);
    const { data: bookingsData, refetch} = useQuery<{bookingsByEquipment: Booking[]}>(
        GET_BOOKINGS_FOR_EQUIPMENT,
        {
            variables: {equipmentId: equipment?.id},
            skip: !equipment,
        }
    );    
    const [createBooking, { loading: creatingBooking, error: createBookingError }] = useMutation(
        CREATE_BOOKING, 
        {
            onCompleted: () => {
                setSuccessMsg('Booking confirmed');
                setUserId('');
                setStartTime('');
                setEndTime('');
                setPurpose('');
                refetch();
                setTimeout(() => setSuccessMsg(''), 3000)

            }
        }
    );
    const [cancelBooking] = useMutation (CANCEL_BOOKING,{
        onCompleted: () => refetch(),
    });

    if (!equipment) {
        return (
            <div className='card'>
                <p>Please select an equipment to see bookings</p>
            </div>
        );
    } 

    const handleSubmit = () => {
        if (!userId || !startTime || !endTime) {
            alert('Please fill in all required fields');
            return;
        };

        createBooking({
            variables: {
                bookingInput: {
                    equipmentId: equipment.id,
                    userId,
                    startTime: new Date(startTime).toISOString(),
                    endTime: new Date(endTime).toISOString(),
                    purpose,
                },
            },
        }).catch(() => {/* error will be displayed below */});
    }

    return (
        <div className='card'>
            <h2> {equipment.name} </h2>
            <p style={{ color: '#718096', marginTop: 0}}>{equipment.description}</p>
            <h3>Reserve a time slot</h3>
            {successMsg && <div className='success'>{successMsg}</div>}
            {createBookingError && <div className='error'> {createBookingError?.message}</div>}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit()}}>
                <label>User</label>
                <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                    <option value=''>--- Select user ---</option>
                    {usersData?.usersList.map((u) => (
                        <option key={u.id} value={u.id}>{u.firstName} {u.lastName} {u.department}</option>
                    ))}
                </select>

                <label>Start Time</label>
                <input
                    type='time-local'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />

                <label>End Time</label>
                <input
                    type='time-local'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />

                <label>Purpose (Optional)</label>
                <textarea
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={2}
                    placeholder='e.g. sputter AgOx'
                />

                <button type='submit' disabled={creatingBooking || 
                    equipment.status == 'OUT_OF_SERVICE'}>
                        {creatingBooking ? 'Booking ...' : 'Confirm Booking' }
                    </button>
            </form>

            <h3 style={{ marginTop: '2rem'}}>Existing bookings</h3>
            {bookingsData?.bookingsByEquipment.map((b) => (
                <li key={b.id} className={`booking-item ${b.status === 'CANCELLED' ? 'canceled' : '' }`}>
                    <div className='booking-time'>
                        {new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleString()}
                    </div>
                    <div className='booking-detail'>
                        {b.user.firstName} {b.user.lastName} · {b.purpose || '--'} · <em>{b.status}</em> 
                    </div>
                    {b.status === 'CONFIRMED' && (
                        <button
                        style={{
                            background: 'transparent',
                            color: '#c53030',
                            padding: '0.5rem 0',
                            fontSize: '0.8rem'
                        }}
                        onClick={() => cancelBooking({ variables: {id: b.id}})}
                       >
                        Cancel    
                        </button>
                    )}
                </li>
            ))}

        </div>

    );    
}

export default BookingPage;


    