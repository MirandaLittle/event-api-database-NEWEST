import { Router } from "express";
import getCategories from "../services/categories/getCategories.js";
import createCategory from "../services/categories/createCategory.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import deleteCategoryById from "../services/categories/deleteCategoryById.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = Router();

router.get("/", async (req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

router.post("/", auth, async (req, res, next) => {
  try {
  const { name } = req.body;
  const newCategory = await createCategory(name);

  res.status(201).json(newCategory);
} catch (error) {
  next(error) // Express Error Handling mechanism does not catch the errors coming from asynchronous code by default
}
}, notFoundErrorHandler);


router.get("/:id", async (req, res, next) => {
  try {
  const { id } = req.params;
  const category = await getCategoryById(id);

  res.status(200).json(category);
} catch (error) {
  next(error) 
}
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const category = await deleteCategoryById(id);
    res.status(200).send({
      message: `Category with id ${id} successfully deleted`,
      category,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

router.put("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const { name } = req.body;
  const category = await updateCategoryById(id, { name });

    res.status(200).send({
      message: `Category with id ${id} successfully updated`,
      category,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);


export default router;
