import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    filePath: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);
