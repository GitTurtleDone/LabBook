import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Stack,
  Typography,
  Input,
  InputLabel,
  Box,
  OutlinedInput,
  Card,
} from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { Category } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  equipmentSchema,
  equipmentInputSchema,
  type Equipment,
  type EquipmentInput,
} from "../types";
import { CREATE_EQUIPMENT } from "../graphql/queries";
import { useMutation } from "@apollo/client";

type ElementInput = {
  label: string;
  type: string;
  elementKey: keyof Equipment;
  disabled: boolean;
  registered: boolean;
};
type EquipmentLayout = ElementInput[];

export default function EquipmentPage() {
  const equipmentLayout: ElementInput[] = [
    {
      label: "Id",
      type: "string",
      elementKey: "id",
      disabled: true,
      registered: false,
    },
    {
      label: "Name",
      type: "string",
      elementKey: "name",
      disabled: false,
      registered: true,
    },
    {
      label: "Category",
      type: "string",
      elementKey: "category",
      disabled: false,
      registered: true,
    },
    {
      label: "Description",
      type: "string",
      elementKey: "description",
      disabled: false,
      registered: true,
    },
    {
      label: "Status",
      type: "string",
      elementKey: "status",
      disabled: true,
      registered: false,
    },
    {
      label: "Connecting String",
      type: "string",
      elementKey: "connectingStr",
      disabled: false,
      registered: true,
    },
    {
      label: "Manufacturer",
      type: "string",
      elementKey: "manufacturer",
      disabled: false,
      registered: true,
    },
    {
      label: "Serial Number",
      type: "string",
      elementKey: "serialNumber",
      disabled: false,
      registered: true,
    },
    {
      label: "Purchase Year",
      type: "string",
      elementKey: "purchaseYear",
      disabled: false,
      registered: true,
    },
    {
      label: "Calibration Due",
      type: "date",
      elementKey: "calibrationDue",
      disabled: false,
      registered: true,
    },
    {
      label: "Location",
      type: "string",
      elementKey: "location",
      disabled: false,
      registered: true,
    },
    {
      label: "Require Training",
      type: "string",
      elementKey: "requiresTraining",
      disabled: false,
      registered: true,
    },
    {
      label: "Image URL",
      type: "url",
      elementKey: "imageUrl",
      disabled: false,
      registered: true,
    },
    {
      label: "Video URL",
      type: "url",
      elementKey: "videoUrl",
      disabled: false,
      registered: true,
    },
    {
      label: "Documentation URL",
      type: "url",
      elementKey: "documentationUrl",
      disabled: false,
      registered: true,
    },
    {
      label: "Notes",
      type: "string",
      elementKey: "notes",
      disabled: false,
      registered: true,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentInput>({
    resolver: zodResolver(equipmentInputSchema),
    defaultValues: {
      name: "Equipment 1",
      category: "Electrical",
      description: "",
      connectingStr: "::STR::0023",
      model: "",
      manufacturer: "",
      serialNumber: "",
      purchaseYear: 2006,
      calibrationDue: "19-06-2027",
      location: "",
      requiresTraining: true,
      imageUrl: "https://local.host.com",
      videoUrl: "https://local.host.com",
      documentationUrl: "https://local.host.com",
      notes: "",
    },
  });

  const [createEquipment] = useMutation(CREATE_EQUIPMENT);

  const onCreateEquipment = async (equipment: EquipmentInput) => {
    console.log("Submitting:", JSON.stringify(equipment));
    await createEquipment({ variables: { equipment } });
  };

  return (
    <div>
      {/* <h3>Equipment</h3> */}
      <Box sx={{ width: "40%", paddingLeft: 10 }}>
        <Typography variant="h3" sx={{ pt: 3, pb: 5 }}>
          Equipment
        </Typography>
        <Stack spacing={2}>
          {equipmentLayout.map(
            ({ label, type, elementKey, disabled, registered }) => (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  align: "left",
                  pt: 2,
                  gap: 5,
                }}
                key={elementKey}
                direction="row"
                pt={5}
              >
                <Typography sx={{ textAlign: "left" }}>{label}</Typography>
                {registered ? (
                  <OutlinedInput
                    {...register(elementKey)}
                    type={type}
                    disabled={disabled}
                    size="small"
                  ></OutlinedInput>
                ) : (
                  <OutlinedInput
                    type={type}
                    disabled={disabled}
                    size="small"
                  ></OutlinedInput>
                )}
                <ErrorMessage
                  sx={{ textAlign: "right" }}
                  errors={errors}
                  name={elementKey}
                  render={({ message }) => (
                    <Typography variant="caption" color="error">
                      {message}
                    </Typography>
                  )}
                />
              </Box>
            ),
          )}
          <Button
            variant="contained"
            sx={{ width: "10%", mt: 10 }}
            onClick={handleSubmit(onCreateEquipment, (errors) =>
              console.log(errors),
            )}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
