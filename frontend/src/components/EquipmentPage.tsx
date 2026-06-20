import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, Stack, Typography, Input, OutlinedInput, Card } from "@mui/material";
import { Category } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipmentSchema, equipmentInputSchema, type Equipment, type EquipmentInput } from "../types";
import { CREATE_EQUIPMENT } from "../graphql/queries";

type ElementInput = {
  label: string,
  type: string,
  elementKey: string,
  disabled: boolean,
  registered: boolean
};
type EquipmentLayout = ElementInput[];
  


export default function EquipmentPage() {

  const equipmentLayout: EquipmentLayout = [
    {label: 'Id', type: "string", elementKey: 'id', disabled: true, registered: true},
    {label: 'Name', type: "string", elementKey: 'name', disabled: true, registered: true},
  ]

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting}
  } = useForm<EquipmentInput>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      id: "",
      name: "",
      category: "Electrical",
      description: "",
      status: "AVAILABLE",
      connectingStr: "",
      model: "",
      manufacturer: "",
      serialNumber: "",
      purchaseYear: "2006",
      calibrationDue: "19-06-2027",
      location: "",
      requiresTraining: true,
      imageUrl: "",
      videoUrl: "",
      documentationUrl: "",
      notes: "",
    }
  })
  return (
    <div>
      {/* <h3>Equipment</h3> */}
      <Card sx={{paddingLeft: 20}}>
        <Typography variant="h3" sx={{pt:3}}>Equipment</Typography>
        <Stack>
          <Stack direction="row" pt={5} gap={10} >
            {equipmentLayout.map((e) => {
              <Typography>{e.label}</Typography>
              <OutlinedInput e.registered ? {...register(e.elementKey)}: "" type={e.type}></OutlinedInput>
            })}
          </Stack>
          <Button variant="contained" sx={{width: '10%', mt: 10}}>Create</Button>
        </Stack>
      </Card>
            
    </div>
    
  );
}
