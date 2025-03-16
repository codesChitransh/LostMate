import LostItem from "../models/lostItem.js";
import { errorHandler } from "../utils/error.js";

// Create a new lost item report
export const createLostItem = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "Unauthorized! Please log in."));
    }

    const newLostItem = await LostItem.create({
      ...req.body,
      reportedBy: req.user.id, // Ensure only logged-in users report lost items
    });

    return res.status(201).json(newLostItem);
  } catch (error) {
    next(error);
  }
};

// Delete a lost item report
export const deleteLostItem = async (req, res, next) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return next(errorHandler(404, "Lost item not found!"));
    }

    if (req.user.id !== lostItem.reportedBy.toString()) {
      return next(errorHandler(401, "You can only delete your own lost item reports!"));
    }

    await lostItem.deleteOne();
    return res.status(200).json({ message: "Lost item report has been deleted!" });
  } catch (error) {
    next(error);
  }
};

// Update a lost item report
export const updateLostItem = async (req, res, next) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return next(errorHandler(404, "Lost item not found!"));
    }

    if (req.user.id !== lostItem.reportedBy.toString()) {
      return next(errorHandler(401, "You can only update your own lost item reports!"));
    }

    const updatedLostItem = await LostItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedLostItem);
  } catch (error) {
    next(error);
  }
};

// Get a single lost item
export const getLostItem = async (req, res, next) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);
    if (!lostItem) {
      return next(errorHandler(404, "Lost item not found!"));
    }
    return res.status(200).json(lostItem);
  } catch (error) {
    next(error);
  }
};

// Get multiple lost items with filters, search, sorting, and pagination
export const getLostItems = async (req, res, next) => {
  try {
    const limit = isNaN(parseInt(req.query.limit)) ? 10 : parseInt(req.query.limit);
    const startIndex = isNaN(parseInt(req.query.startIndex)) ? 0 : parseInt(req.query.startIndex);

    const category = req.query.category || { $exists: true };
    const status = req.query.status || { $in: ["Lost", "Found", "Resolved"] };
    const searchTerm = req.query.searchTerm || "";
    const sortField = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const lostItems = await LostItem.find({
      title: { $regex: searchTerm, $options: "i" },
      category,
      status,
    })
      .sort({ [sortField]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(lostItems);
  } catch (error) {
    next(error);
  }
};
