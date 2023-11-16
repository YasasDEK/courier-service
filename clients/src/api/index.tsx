import axios from "axios";

const baseURL = "http://localhost:8080";

interface LoginProps {
  email: string;
  password: string;
}

interface SignUpProps {
  email: string;
  name: string;
  dob: string;
  type: string;
  phone: string;
  password: string;
}

interface ShipmentProps {
  trackNumber: string;
  uid: number;
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  itemCode: string;
  itemCount: number;
  status: string;
}

interface UpdataShipmentStatusProps {
  id: number;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  dob: string;
  phone: string;
  type: string;
}

export interface Shipment {
  id: number;
  tracknumber: string;
  uid: number;
  sendername: string;
  senderaddress: string;
  recipientname: string;
  recipientaddress: string;
  itemname: string;
  itemcode: string;
  itemcount: number;
  status: string;
  created: string;
}

export const loginAPI = async ({ email, password }: LoginProps) => {
  const response = await axios.post(`${baseURL}/api/v1/users/login`, {
    email,
    password,
  });

  return response;
};

export const signUpAPI = async ({
  email,
  name,
  dob,
  type,
  phone,
  password,
}: SignUpProps) => {
  const response = await axios.post(`${baseURL}/api/v1/users/signup`, {
    email,
    name,
    dob,
    type,
    phone,
    password,
  });

  return response;
};

export const addShipment = async ({
  trackNumber,
  uid,
  senderName,
  senderAddress,
  recipientName,
  recipientAddress,
  itemCode,
  itemCount,
  status,
}: ShipmentProps) => {
  const response = await axios.post(`${baseURL}/api/v1/shipments`, {
    trackNumber,
    uid,
    senderName,
    senderAddress,
    recipientName,
    recipientAddress,
    itemCode,
    itemCount,
    status,
  });

  return response;
};

export const getUserById = async (userId: number) => {
  const response = await axios.get(`${baseURL}/api/v1/users/${userId}`);

  return response;
};

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(`${baseURL}/api/v1/users/email/${email}`);

  return response;
};

export const getShipmentsByUser = async (uid: number) => {
  const response = await axios.get(`${baseURL}/api/v1/shipments/user/${uid}`);

  return response.data as Shipment[];
};

export const getShipmentById = async (id: number) => {
  const response = await axios.get(`${baseURL}/api/v1/shipments/${id}`);

  return response.data as Shipment;
};

export const getAllShipments = async () => {
  const response = await axios.get(`${baseURL}/api/v1/shipments`);

  return response.data as Shipment[];
};

export const updateShipmentStatus = async ({
  id,
  status,
}: UpdataShipmentStatusProps) => {
  const response = await axios.put(`${baseURL}/api/v1/shipments/status/${id}`, {
    status,
  });

  return response;
};

export const getShipmentByTrackingNumber = async (trackingNumber: string) => {
  const response = await axios.get(
    `${baseURL}/api/v1/shipments/track/${trackingNumber}`
  );

  return response.data as Shipment;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseURL}/api/v1/users`);

  return response.data as User[];
};

export const deleteShipment = async (id: number) => {
  const response = await axios.delete(`${baseURL}/api/v1/shipments/${id}`);

  return response;
};

export const updateUserType = async (id: number) => {
  const response = await axios.put(`${baseURL}/api/v1/users/type/${id}`, {
    type: "ADMIN",
  });

  return response;
};
