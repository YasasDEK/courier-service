const getShipments = "SELECT * FROM shipments";

const getShipmentById = "SELECT * FROM shipments WHERE id = $1";

const addShipment =
  "INSERT INTO shipments (tracknumber, uid, sendername, senderaddress, recipientname, recipientaddress, itemcode, itemcount, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

const deleteUSer = "DELETE FROM shipments WHERE id = $1";

const updateShipmentById =
  "UPDATE shipments SET recipientname = $1, recipientaddress = $2, itemcode = $3, itemcount = $4, status = $5 WHERE id = $6";

const getShipmentByUser = "SELECT * FROM shipments WHERE uid = $1";

const updateShipmentStatus = "UPDATE shipments SET status = $1 WHERE id = $2";

const getShipmentByTrackingNumber =
  "SELECT * FROM shipments WHERE tracknumber = $1";

export const shipmentQuery = {
  getShipments,
  getShipmentById,
  addShipment,
  deleteUSer,
  updateShipmentById,
  getShipmentByUser,
  updateShipmentStatus,
  getShipmentByTrackingNumber,
};
