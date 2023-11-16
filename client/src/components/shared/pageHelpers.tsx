import { MouseEvent } from "react";

export const handleMouseDownPassword = (
  event: MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

export const requiredMessage = {
  message: "This field is required",
};

export const httpCodes = {
  successCode: 200,
  notFoundCode: 404,
  conflictCode: 409,
  dataAddedCode: 201,
};

export const userTypes = [
  { value: 1, label: "USER" },
  { value: 2, label: "ADMIN" },
];

export const getStatusColor = (status: String) => {
  if (status === "PENDING") {
    return "#ebd086";
  }

  if (status === "IN-PROGRESS") {
    return "#8bb5c4";
  }

  if (status === "COMPLETED") {
    return "#93c7a1";
  }

  if (status === "REJECTED") {
    return "#db4848";
  }
};
