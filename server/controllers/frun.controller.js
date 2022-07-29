import FrunModal from "../models/frun.model.js";
import mongoose from "mongoose";

export const createFrun = async (req, res) => {
  const frun = req.body;
  const newFrun = new FrunModal({
    ...frun,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newFrun.save();
    res.status(201).json(newFrun);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFruns = async (req, res) => {
  try {
    const fruns = await FrunModal.find();
    res.status(200).json(fruns);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFrun = async (req, res) => {
  const { id } = req.params;
  try {
    const frun = await FrunModal.findById(id);
    res.status(200).json(frun);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFrunsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userFruns = await FrunModal.find({ creator: id });
  res.status(200).json(userFruns);
};

export const deleteFrun = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No funRun exist with id: ${id}` });
    }
    await FrunModal.findByIdAndRemove(id);
    res.json({ message: "FunRun deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateFrun = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No funRun exist with id: ${id}` });
    }

    const updatedFrun = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await FrunModal.findByIdAndUpdate(id, updatedFrun, { new: true });
    res.json(updatedFrun);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};