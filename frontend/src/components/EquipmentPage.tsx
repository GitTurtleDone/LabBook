import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, Stack, Typography, Input, OutlinedInput } from "@mui/material";
import { Category } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipmentSchema, equipmentInputSchema, type Equipment, type EquipmentInput } from "../types";
import { CREATE_EQUIPMENT } from "../graphql/queries";





export default function EquipmentPage() {

  // const { register, handleSubmit, formState: { errors, isSubmitting},} = useForm<EquipmentInput>({
  //   resolver: zodResolver(equipmentSchema),
  // })
  return (
    <div>
      {/* <h3>Equipment</h3> */}
      <Typography variant="h3" sx={{pt:3}}>Equipment</Typography>
      <Stack>
        <Stack direction="row" pt={5} gap={5}>
          <Typography >Equipment ID: </Typography>
          <OutlinedInput type="text" size="small"></OutlinedInput>
        </Stack>
        <Button variant="outlined" sx={{width: 1.5}}>Create</Button>
      </Stack>
      
      

      
      
    </div>
    
  );
}
