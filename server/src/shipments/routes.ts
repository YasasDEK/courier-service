import { Router } from "express";
import { shipmentController } from "./controller";

const shipmentRouter = Router();

shipmentRouter.get("/", shipmentController.getShipments);
shipmentRouter.post("/", shipmentController.addShipment);
shipmentRouter.get("/:id", shipmentController.getShipmentById);
shipmentRouter.delete("/:id", shipmentController.deleteShipment);
shipmentRouter.put("/:id", shipmentController.updateShipment);
shipmentRouter.get("/user/:uid", shipmentController.getShipmentsByUser);

export default shipmentRouter;
