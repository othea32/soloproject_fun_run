import mongoose from "mongoose";

const frunSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const FrunModal = mongoose.model("Frun", frunSchema);

export default FrunModal;