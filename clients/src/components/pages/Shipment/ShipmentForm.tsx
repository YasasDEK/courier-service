import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFTextField } from "../../shared/RHFFields/RHFTextField";
import { addShipment } from "../../../api";
import Header from "../../shared/Header";
import { v4 as uuid } from "uuid";

const customStyles = {
  inputStack: {
    alignItems: "center",
    justifyContent: "space-between",
    py: 1,
    px: 4,
    mb: 6,
    borderRadius: 1,
    background: "red",
    opacity: 0.6,
  },
  text: {
    color: "white",
  },
  label: {
    mt: 4,
    mb: 1,
  },
  boxWidth: {
    width: "100%",
  },
  icon: {
    fontSize: 20,
  },
  button: {
    my: 4,
    height: 40,
    width: "100%",
  },
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    overflow: "auto",
  },
  innerBox: {
    mb: {
      xs: "15%",
      md: "auto",
    },
    position: "fixed",
    border: "1px solid",
    borderRadius: 8,
    p: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainStack: {
    width: "100%",
    justifyContent: "center",
  },
  innerStack: {
    alignItems: "center",
  },
};

const requiredMessage = { message: "This field is required" };

const formSchema = z.object({
  senderName: z.string().min(1, requiredMessage),
  senderAddress: z.string().min(1, requiredMessage),
  recipientName: z.string().min(1, requiredMessage),
  recipientAddress: z.string().min(1, requiredMessage),
  itemCode: z.string().min(1, requiredMessage),
  itemCount: z
    .number()
    .min(1, requiredMessage)
    .max(10, "Cant order more than 10 items at once"),
});

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValue = {
  senderName: "",
  senderAddress: "",
  recipientName: "",
  recipientAddess: "",
  itemCode: "",
  itemCount: 0,
};

const ShipmentForm = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const { handleSubmit, control, setValue, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: formDefaultValue,
  });

  const errorSection = (
    <Stack direction="row" sx={customStyles.inputStack}>
      <Box>
        <Typography style={customStyles.text}>{customError} </Typography>
      </Box>

      <Box>
        <IconButton onClick={() => setShowError(false)}>
          <CloseIcon fontSize="small" sx={customStyles.text} />
        </IconButton>
      </Box>
    </Stack>
  );

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setLoading(true);

    try {
      await addShipment({
        trackNumber: uuid(),
        uid: parseInt(localStorage?.getItem("userId")!),
        senderName: data.senderName,
        senderAddress: data.senderAddress,
        recipientName: data.recipientName,
        recipientAddress: data.recipientAddress,
        itemCode: data.itemCode,
        itemCount: data.itemCount,
        status: "PENDING",
      });

      navigate("/shipments");
    } catch {
      setCustomError("Error occured while creating the shipmnet");

      setShowError(true);
    }

    setLoading(false);
  };

  const inputSection = (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        setCustomError("Error occured while creating the shipmnet");

        setShowError(true);
      })}
    >
      <Stack spacing={2} width="30vw" mt={4}>
        <RHFTextField
          name="senderName"
          label="Sender's Full name"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.senderName?.message ?? ""}
          error={Boolean(formState.errors.senderName?.message)}
        />

        <RHFTextField
          name="senderAddress"
          label="Sender's Address"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.senderAddress?.message ?? ""}
          error={Boolean(formState.errors.senderAddress?.message)}
        />

        <RHFTextField
          name="recipientName"
          label="recipient's Full name"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.recipientName?.message ?? ""}
          error={Boolean(formState.errors.recipientName?.message)}
        />

        <RHFTextField
          name="recipientAddress"
          label="recipient's Address"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.recipientAddress?.message ?? ""}
          error={Boolean(formState.errors.recipientAddress?.message)}
        />

        <RHFTextField
          name="itemCode"
          label="Item Code"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.itemCode?.message ?? ""}
          error={Boolean(formState.errors.itemCode?.message)}
        />

        <RHFTextField
          name="itemCount"
          label="Item Count"
          type="number"
          size="small"
          control={control}
          onChange={(event) =>
            setValue("itemCount", parseInt(event.target.value))
          }
          fullWidth={true}
          helperText={formState.errors.itemCount?.message ?? ""}
          error={Boolean(formState.errors.itemCount?.message)}
        />
      </Stack>

      <Button
        type="submit"
        size="small"
        variant="contained"
        disabled={loading}
        sx={customStyles.button}
      >
        <Stack direction="row" spacing={2} sx={customStyles.innerStack}>
          {loading && <CircularProgress size={20} sx={customStyles.text} />}
          <Typography variant="h6">Submit</Typography>
        </Stack>
      </Button>
    </form>
  );

  return (
    <>
      <Header />

      <Box sx={customStyles.mainBox}>
        <Box sx={customStyles.innerBox}>
          <Stack sx={customStyles.mainStack}>
            <Typography
              variant="h3"
              display="flex"
              justifyContent="center"
              fontWeight={600}
            >
              Add a new Shipmnet
            </Typography>

            {inputSection}

            {showError && errorSection}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ShipmentForm;
