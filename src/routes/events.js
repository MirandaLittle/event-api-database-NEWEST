import { Router } from "express";
import getEvents from "../services/events/getEvents.js";
import createEvent from "../services/events/createEvent.js";
import getEventById from "../services/events/getEventById.js";
import deleteEventById from "../services/events/deleteEventById.js";
import updateEventById from "../services/events/updateEventById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/NotFoundErrorHandler.js';

const router = Router();

router.get("/", async (req, res) => {
  const { title, location } = req.query;
  const events = await getEvents(title, location);
  res.json(events);
});

router.post("/", auth, async (req, res) => {
  const {
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    createdBy,
    categoryIds,
  } = req.body;
  const newEvent = await createEvent(
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    createdBy,
    categoryIds
  );
  res.status(201).json(newEvent);
});

router.get("/:id", async (req, res, next) => {
  try {
  const { id } = req.params;
  const event = await getEventById(id);

  res.status(200).json(event);
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const event = await deleteEventById(id);
    res.status(200).send({
      message: `Event with id ${id} successfully deleted`,
      event,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);


router.put("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    createdBy,
    categoryIds,
  } = req.body;
  const event = await updateEventById(id, {
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    createdBy,
    categoryIds,
  });

 
    res.status(200).send({
      message: `Event with id ${id} successfully updated`,
      event,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

export default router;
