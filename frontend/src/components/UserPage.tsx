
import { Typography, Button, Stack, Box, OutlinedInput } from '@mui/material';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { type User, type UserInput, userInputSchema, userSchema} from "../types";
import { id } from 'zod/locales';
import { ForkLeft } from '@mui/icons-material';
import { CREATE_USER } from '../graphql/queries';
import {gql, useMutation} from '@apollo/client';
import type { grey } from '@mui/material/colors';

type UserElementLayout = {
    label: string,
    type: string,
    elementKey: keyof User,
    disabled: boolean,
    registered: boolean,
    
};



export default function UserPage() {
    const userElemnentLayout: UserElementLayout[] = [
        {label: "User ID", type: 'string', elementKey: 'id', registered: false, disabled: true},
        {label: "Email", type: 'string', elementKey: 'email', registered: true, disabled: false},
        {label: "Password", type: 'string', elementKey: 'password', registered: true, disabled: false},
        {label: "First Name", type: 'string', elementKey: 'firstName', registered: true, disabled: false},
        {label: "Last Name", type: 'string', elementKey: 'lastName', registered: true, disabled: false},
        {label: "Department", type: 'string', elementKey: 'department', registered: true, disabled: false},
        {label: "Role", type: 'string', elementKey: 'role', registered: true, disabled: false},
    ]
    


    const {handleSubmit, register, formState: { errors , isSubmitting }} = useForm({
        resolver: zodResolver(userInputSchema),
        defaultValues: {
            email: "John.Setler@yahoo.com",
            password: "johsetA@45",
            firstName: "John",
            lastName: "Setler",
            department: "ECE",
            role: 'STUDENT',
        }
    })

    const [createUser] = useMutation(CREATE_USER)
    const onCreateUser = async (userInput: UserInput) => {
        console.log("User to be created: ", JSON.stringify(userInput))
        await createUser({ variables: {user: userInput}})
        
    }
    return (
        <div>
            <h3>Users</h3>
            <Stack sx={{width: '60%', pl: 10, pr: 10}}>
                {userElemnentLayout.map(({label, type, elementKey, disabled, registered}) => (
                    <Box key={elementKey} sx={{display: 'grid', gridTemplateColumns: '1fr 2fr', align: 'left', pt: 2, gap: 5   }}>
                        <Typography sx={{textAlign: 'left'}}>{label}</Typography>
                        {registered ? ( <OutlinedInput {...register(elementKey)} type={type} disabled={disabled} size='small'></OutlinedInput>
                        ) : (
                            <OutlinedInput type={type} disabled={disabled} size='small'></OutlinedInput>
                        )}

                        <ErrorMessage 
                            errors={errors}
                            name={elementKey}
                            render={({message}) => (
                                <Typography variant='caption' color='error'>{message}</Typography>
                            )}
                        />
                    </Box>
                ))}

                <Button variant="contained" sx={{mt: 5, width: "20%"}} onClick={handleSubmit(onCreateUser) }>
                    CREATE
                </Button>
            </Stack>
        </div>
        
    )
};