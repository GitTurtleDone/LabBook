import * as z from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.email("Invalid email"),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(["STUDENT", "RESEARCHER", "STAFF", "ADMIN"]).optional(),
  createdAt: z.string().optional(),
  lastLoginAt: z.string().optional(),
});

export const userInputSchema = userSchema.omit({
  id: true,
  createdAt: true,
  lastLoginAt: true,
});

export type User = z.infer<typeof userSchema>;
export type UserInput = z.infer<typeof userInputSchema>;

export const equipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  status: z.enum(["AVAILABLE", "IN_USE", "MAINTENANCE", "OUT_OF_SERVICE"]),
  connectingStr: z.string(),
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  serialNumber: z.string().optional(),
  purchaseYear: z.coerce.number('Number expected').optional(),
  calibrationDue: z.string().optional(),
  location: z.string().optional(),
  requiresTraining: z.coerce.boolean(),
  imageUrl: z.union([z.literal(""), z.url("Invalid URL")]).optional(),
  videoUrl: z.union([z.literal(""), z.url("Invalid URL")]).optional(),
  documentationUrl: z.union([z.literal(""), z.url("Invalid URL")]).optional(),
  notes: z.string().optional(),
});

export const equipmentInputSchema = equipmentSchema.omit({
  id: true,
  status: true,
});

export type Equipment = z.infer<typeof equipmentSchema>;
export type EquipmentInput = z.infer<typeof equipmentInputSchema>;

export const bookingSchema = z.object({
  id: z.string(),
  equipment: equipmentSchema,
  user: userSchema,
  startTime: z.string(),
  endTime: z.string(),
  purpose: z.string().optional(),
  status: z.enum(["CONFIRMED", "CANCELLED", "COMPLETED"]),
  createdAt: z.string().optional(),
});

export const bookingInputSchema = bookingSchema
  .omit({
    id: true,
    equipment: true,
    user: true,
    status: true,
    createdAt: true,
  })
  .extend({ equipmentId: z.string(), userId: z.string() });

export type Booking = z.infer<typeof bookingSchema>;
export type BookingInput = z.infer<typeof bookingInputSchema>;
