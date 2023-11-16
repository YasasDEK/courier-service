import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import {
  Shipment,
  deleteShipment,
  getAllShipments,
  getShipmentsByUser,
} from "../../../api";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getStatusColor } from "../../shared/pageHelpers";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../shared/Header";

const AllShipments = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState<Shipment[]>([]);
  const [error, setError] = useState("");

  const userType = localStorage.getItem("userType");

  const fetchData = useCallback(async () => {
    try {
      if (userType === "USER") {
        await setData(await getShipmentsByUser(parseInt(userId!)));
      } else {
        await setData(await getAllShipments());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data.message);
      } else {
        setError("An unexpected error occured while fetching the data");
      }
    }
  }, [userId, userType]);

  const handleDelete = async (id: number) => {
    try {
      await deleteShipment(id);

      await fetchData();
    } catch {
      setError("An error occured while deleting the shipment");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 20,
          pt: 4,
        }}
      >
        <Typography variant="h3">
          {userType === "USER" ? "My Shipments" : "All Shipments"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 20,
          pt: 4,
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  "& .MuiTableCell-head": {
                    color: "white",
                    backgroundColor: "#1976d2",
                  },
                }}
              >
                <TableCell>Tracking Code</TableCell>
                <TableCell align="left">Sender name</TableCell>
                <TableCell align="left">Sender address</TableCell>
                <TableCell align="left">Recipient name</TableCell>
                <TableCell align="left">Recipient address</TableCell>
                <TableCell align="left">Item Code</TableCell>
                <TableCell align="center">Item Count</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((row: Shipment, index: number) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.tracknumber}
                    </TableCell>
                    <TableCell align="left">{row.sendername}</TableCell>
                    <TableCell align="left">{row.senderaddress}</TableCell>
                    <TableCell align="left">{row.recipientname}</TableCell>
                    <TableCell align="left">{row.recipientaddress}</TableCell>
                    <TableCell align="left">{row.itemcode}</TableCell>
                    <TableCell align="center">{row.itemcount}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          background: getStatusColor(row.status),
                          py: 1,
                          px: 1,
                          width: "100%",
                          borderRadius: 4,
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Link to={`/shipments/${row.id}`}>
                        <IconButton>
                          <KeyboardArrowRightIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AllShipments;
