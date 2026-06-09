import * as z from "zod";
import { UserRole } from "../types";
const UserRoleSchema = z.enum(['STUDENT', 'RESEARCHER', 'STAFF', 'ADMIN'])
const userSchema = z.object({
    id: z.string(),
    password: z.string(),
    email: z.string().email("Invalid email"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    deparment: z.string().optional(),
    role: UserRoleSchema.optional(),
    lastLoginAt: z.string().optional
})

const User = z.infer<typeof userSchema>;



export default function UserPage() {
    return (
        <h3>Users</h3>
    )
};