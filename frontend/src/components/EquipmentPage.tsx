import * as z from "zod";
import { useForm } from "react-hook-form";
import { Category } from "@mui/icons-material";

const equipmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  connectingString: z.string(),
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  serialNumber: z.string().optional(),
  purchaseYear: z.number().optional(),
  calibrationDur: z.string().optional(),
  loation: z.string().optional(),
  requiresTraining: z.boolean().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  documentationUrl: z.string().optional(),
  notes: z.string().optional,
})



export default function EquipmentPage() {

  return (
    <h3>Equipment</h3>
  );
}
