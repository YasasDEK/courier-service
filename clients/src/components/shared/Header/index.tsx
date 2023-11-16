import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const customStyles = {
  icon: {
    mr: 1,
  },
  headingIcon: {
    fontSize: 32,
    mr: 1,
  },
  headingText: {
    flexGrow: 1,
    fontSize: 24,
    fontWeight: 600,
  },
  optionsText: {
    fontSize: 14,
    fontWeight: 600,
  },
  button: {
    color: "white",
  },
};

const Header = () => {
  const isAuthenticated = Boolean(localStorage.getItem("email"));
  const user = localStorage.getItem("userType");

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          background: "#736e6e !important",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Link to="/">
            <Button sx={customStyles.button}>
              <RocketLaunchIcon sx={customStyles.headingIcon} />

              <Typography sx={customStyles.headingText}>
                Rocket Courier Service
              </Typography>
            </Button>
          </Link>

          {isAuthenticated && (
            <Box>
              <Link to="/login">
                <Button
                  sx={customStyles.button}
                  onClick={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userType");
                  }}
                >
                  <LogoutIcon sx={customStyles.icon} />

                  <Typography sx={customStyles.optionsText}>Logout</Typography>
                </Button>
              </Link>

              <Link to="/add-shipment">
                <Button sx={customStyles.button}>
                  <AddCircleIcon sx={customStyles.icon} />

                  <Typography sx={customStyles.optionsText}>
                    Add shipment
                  </Typography>
                </Button>
              </Link>

              <Link to="/shipments">
                <Button sx={customStyles.button}>
                  <LocalShippingIcon sx={customStyles.icon} />

                  <Typography sx={customStyles.optionsText}>
                    Shipments
                  </Typography>
                </Button>
              </Link>

              {user === "ADMIN" && (
                <Link to="/users">
                  <Button sx={customStyles.button}>
                    <GroupIcon sx={customStyles.icon} />

                    <Typography sx={customStyles.optionsText}>Users</Typography>
                  </Button>
                </Link>
              )}
            </Box>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
