import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  handleMouseDownPassword,
  httpCodes,
  requiredMessage,
} from "../../shared/pageHelpers";
import { signUpAPI } from "../../../api";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { RHFTextField } from "../../shared/RHFFields/RHFTextField";

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

const isValidPhoneNumber = (value: string): boolean => {
  const phoneNumberRegex = /^\d{10}$/; // Assuming a 10-digit phone number

  return phoneNumberRegex.test(value);
};

const formSchema = z.object({
  email: z.string().min(1, requiredMessage).email(),
  name: z.string().min(1, requiredMessage),
  dob: z.string().min(1, requiredMessage),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  password: z.string().min(1, requiredMessage),
});

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValue = {
  email: "",
  name: "",
  dob: "",
  phone: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const { handleSubmit, control, formState, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: formDefaultValue,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
      const response = await signUpAPI({
        email: data.email,
        name: data.name,
        dob: data.dob,
        type: "USER",
        phone: data.phone,
        password: data.password,
      });

      if (response.data.code === httpCodes.dataAddedCode) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userType", response.data.data.type);

        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setCustomError(error.response?.data.message);
      } else {
        setCustomError("An unexpected error occured");
      }

      setShowError(true);
    }

    setLoading(false);
  };

  const inputSection = (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        if (!Boolean(customError)) {
          setCustomError("Fix all the validation erros");

          setShowError(true);
        }
      })}
    >
      <Stack spacing={2} width="30vw" mt={4}>
        <RHFTextField
          name="name"
          label="Full Name"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.name?.message ?? ""}
          error={Boolean(formState.errors.name?.message)}
        />

        <RHFTextField
          name="email"
          label="Email"
          type="email"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.email?.message ?? ""}
          error={Boolean(formState.errors.email?.message)}
        />

        <Controller
          name="dob"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dayjs(value)}
                onChange={(event) => {
                  setValue("dob", dayjs(event).format("DD-MM-YYYY"));
                }}
                ref={ref}
              />
            </LocalizationProvider>
          )}
        />

        {Boolean(formState.errors.dob?.message) && (
          <Typography
            color="#d32f2f"
            fontSize="0.75rem"
            px={2}
            position="relative"
            bottom={10}
          >
            This field is required
          </Typography>
        )}

        <TextField
          name="type"
          label="Type"
          type="text"
          size="small"
          value="USER"
          defaultValue="USER"
          disabled
          fullWidth={true}
        />

        <RHFTextField
          name="phone"
          label="Contact number"
          type="text"
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.phone?.message ?? ""}
          error={Boolean(formState.errors.phone?.message)}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          size="small"
          control={control}
          fullWidth={true}
          helperText={formState.errors.password?.message ?? ""}
          error={Boolean(formState.errors.password?.message)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon sx={customStyles.icon} />
                  ) : (
                    <VisibilityOutlinedIcon sx={customStyles.icon} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          <Typography variant="h6"> Sign-up</Typography>
        </Stack>
      </Button>
    </form>
  );

  return (
    <Box sx={customStyles.mainBox}>
      <Box sx={customStyles.innerBox}>
        <Stack sx={customStyles.mainStack}>
          <Typography
            variant="h3"
            display="flex"
            justifyContent="center"
            fontWeight={600}
          >
            Sign-up
          </Typography>

          {inputSection}

          {showError && errorSection}

          <Typography>
            Already have have an account?
            <Link to="/login" color="primary">
              Login
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Signup;
