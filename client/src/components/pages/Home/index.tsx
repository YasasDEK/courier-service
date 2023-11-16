import { Box, Card, Typography, TextField, Button } from "@mui/material";
import coverImage from "../../images/courier-service.jpg";
import { getShipmentByTrackingNumber } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../shared/Header";

const customStyles = {
  mainBox: {
    width: "100%",
    height: "92vh",
    backgroundImage: `url(${coverImage})`,
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (trackingNumber) {
      try {
        const data = await getShipmentByTrackingNumber(trackingNumber);

        setError("");

        navigate(`/shipments/${data.id}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message);
        } else {
          setError("An unexpected error occured while fetching the data");
        }
      }
    }
  };

  return (
    <>
      <Header />

      <Box sx={customStyles.mainBox}>
        <Card
          sx={{
            width: "40%",
            height: "50%",
            ml: 15,
            p: 4,
            pb: 8,
            borderRadius: 8,
            background: "#736e6e",
          }}
        >
          <Typography sx={{ color: "White", fontSize: 32, fontWeight: 600 }}>
            Welcome
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "orange",
            }}
          >
            Track Your Package
          </Typography>

          <Box
            sx={{ background: "white", p: 4, borderRadius: 4, mt: 1, mb: 8 }}
          >
            <Typography sx={{ color: "black", fontWeight: 600, fontSize: 16 }}>
              Enter tracking number
            </Typography>

            <TextField
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              onChange={(event) => setTrackingNumber(event.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleTrack}
            >
              Track
            </Button>

            <Typography sx={{ color: "red" }}>{error}</Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Home;
