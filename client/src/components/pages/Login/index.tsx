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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  handleMouseDownPassword,
  httpCodes,
  requiredMessage,
} from "../../shared/pageHelpers";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserByEmail, loginAPI } from "../../../api";
import { RHFTextField } from "../../shared/RHFFields/RHFTextField";

const customStyles = {
  inputStack: {
    alignItems: "center",
    justifyContent: "space-between",
    py: 1,
    pl: 4,
    pr: 2,
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

const formSchema = z.object({
  email: z.string().min(1, requiredMessage).email(),
  password: z.string().min(1, requiredMessage),
});

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValue = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  const { handleSubmit, control, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: formDefaultValue,
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setLoading(true);

    try {
      const response = await loginAPI({
        email: data.email,
        password: data.password,
      });

      const user = await getUserByEmail(data.email);

      if (response.data.code === httpCodes.successCode) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", user.data.id);
        localStorage.setItem("userType", user.data.type);

        navigate("/");
      }
    } catch {
      setCustomError("Invalid Email or Password");

      setShowError(true);
    }

    setLoading(false);
  };

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

  const inputSection = (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        setCustomError("Fix all the validation erros");

        setShowError(true);
      })}
    >
      <Stack spacing={4} mt={4} width="20vw">
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
          <Typography variant="h6">log in</Typography>
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
            Log-in
          </Typography>

          {inputSection}

          {showError && errorSection}

          <Typography>
            Don't have an account?{" "}
            <Link to="/signup" color="primary">
              SignUp
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
