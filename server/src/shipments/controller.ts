import pool from "../db";
import { shipmentQuery } from "./queries";

const getInternalServerError = (res) => {
  return res.status(500).json({
    code: 500,
    message: "Internal Server Error",
  });
};

const getShipmentNotFoundError = (res) => {
  return res.status(404).json({
    code: 404,
    message: "Shipment not found",
  });
};

const getShipments = (req, res) => {
  pool.query(shipmentQuery.getShipments, (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    return res.status(200).json(results.rows);
  });
};

const getShipmentById = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);

  pool.query(shipmentQuery.getShipmentById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getShipmentNotFoundError(res);
    }

    return res.status(200).json(results.rows[0]);
  });
};

const addShipment = (req, res) => {
  const {
    trackNumber,
    uid,
    senderName,
    senderAddress,
    recipientName,
    recipientAddress,
    itemCode,
    itemCount,
    status,
  } = req.body;

  pool.query(
    shipmentQuery.addShipment,
    [
      trackNumber,
      uid,
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      itemCode,
      itemCount,
      status,
    ],
    (error, results) => {
      if (error) {
        return getInternalServerError(error);
      }

      return res.status(201).json({
        code: 201,
        message: "Shipment added successfully",
      });
    }
  );
};

const deleteShipment = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(shipmentQuery.getShipmentById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getShipmentNotFoundError(res);
    }

    pool.query(shipmentQuery.deleteUSer, [id], (error, results) => {
      if (error) {
        return getInternalServerError(error);
      }

      return res.status(200).json({
        code: 200,
        message: "Shipment deleted successfully",
      });
    });
  });
};

const updateShipment = (req, res) => {
  const id = parseInt(req.params.id);
  const { recipientName, recipientAddress, itemCode, itemCount, status } =
    req.body;

  pool.query(shipmentQuery.getShipmentById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getShipmentNotFoundError(res);
    }

    pool.query(
      shipmentQuery.updateShipmentById,
      [recipientName, recipientAddress, , itemCode, itemCount, , status, id],
      (error, results) => {
        if (error) {
          return getInternalServerError(error);
        }

        return res.status(200).json({
          code: 200,
          message: "Shipment updated successfully",
        });
      }
    );
  });
};

const getShipmentsByUser = (req, res) => {
  const uid = parseInt(req.params.uid);

  pool.query(shipmentQuery.getShipmentByUser, [uid], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    return res.status(200).json(results.rows);
  });
};

export const shipmentController = {
  getShipments,
  getShipmentById,
  addShipment,
  deleteShipment,
  updateShipment,
  getShipmentsByUser,
};
