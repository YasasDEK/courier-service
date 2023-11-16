import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Stack, Typography } from "@mui/material";
import { getAllUsers, updateUserType } from "../../../api";
import { useQuery } from "react-query";
import { useState } from "react";
import Header from "../../shared/Header";

const Users = () => {
  const [error, setError] = useState("");

  const { data: users, refetch } = useQuery("users", () => getAllUsers());

  const handleAdmin = async (uid: number) => {
    try {
      await updateUserType(uid);

      refetch();
    } catch {
      setError("Error occured while updating the type");
    }
  };

  if (localStorage.getItem("userType") === "USER") {
    return (
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
          You are not allowed to visit this page
        </Typography>
      </Box>
    );
  }

  if (localStorage.getItem("userType") === "ADMIN") {
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
          <Typography variant="h3">All Users</Typography>
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
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Date of birth</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="center">User Type</TableCell>
                  <TableCell align="center">Options</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {users?.length === 0 ? (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={9}>
                      No Shipsments yet
                      {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  users?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.dob}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">
                        {row.type === "USER" && (
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ width: "100%", justifyContent: "center" }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => handleAdmin(row.id)}
                            >
                              Make Admin
                            </Button>
                          </Stack>
                        )}
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
  }

  return <></>;
};

export default Users;
