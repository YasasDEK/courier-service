import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getShipmentById, updateShipmentStatus } from "../../../api";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../shared/Header";

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
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: 20,
    pt: 16,
  },
};

const SingleShipment = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const userType = localStorage.getItem("userType");

  const {
    data: shipment,
    isFetching,
    refetch,
    error,
  } = useQuery("singleshipments", () => getShipmentById(parseInt(id!)), {
    enabled: Boolean(id),
  });

  const data = [
    { label: "Tracking Code", value: shipment?.tracknumber },
    { label: "Sender name", value: shipment?.sendername },
    { label: "Sender address", value: shipment?.senderaddress },
    { label: "Recipient name", value: shipment?.recipientname },
    { label: "Recipient address", value: shipment?.recipientaddress },
    { label: "Status", value: shipment?.status },
    { label: "Created Date", value: shipment?.created },
  ];

  const handleStatusUpdate = async () => {
    setLoading(true);

    if (status && id) {
      try {
        await updateShipmentStatus({ id: parseInt(id), status: status });

        await refetch();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setCustomError(error.response?.data.message);
        } else {
          setCustomError("An unexpected error occured while fetching the data");
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (shipment) {
      setStatus(shipment.status);
    }
  }, [shipment]);

  if (error) {
    return (
      <Box sx={customStyles.mainBox}>
        <Typography variant="h3" fontWeight={600}>
          No Shipment Found
        </Typography>
      </Box>
    );
  }

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

  return (
    <>
      <Header />

      <Box sx={customStyles.mainBox}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h3" fontWeight={600}>
            Shipment Details
          </Typography>

          <CardContent>
            {isFetching
              ? "Loading..."
              : data.map((detial) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight={600}>{detial?.label}</Typography>
                    </Box>

                    <Box>
                      <Typography>{detial?.value}</Typography>
                    </Box>
                  </Stack>
                ))}
          </CardContent>

          {userType === "ADMIN" && (
            <>
              <Divider />

              <Typography variant="h6" fontWeight={500} mt={2}>
                Change status
              </Typography>

              <Stack direction="row" spacing={2}>
                <Select
                  fullWidth
                  value={status}
                  defaultValue="PENDING"
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="IN-PROGRESS">IN-PROGRESS</MenuItem>
                  <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                  <MenuItem value="REJECTED">REJECTED</MenuItem>
                </Select>

                <Button variant="contained" onClick={handleStatusUpdate}>
                  {loading && (
                    <CircularProgress size={20} sx={customStyles.text} />
                  )}
                  Change
                </Button>
              </Stack>
            </>
          )}

          {showError && errorSection}
        </Card>
      </Box>
    </>
  );
};

export default SingleShipment;
