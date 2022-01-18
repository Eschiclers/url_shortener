import { Schema, model, Document } from 'mongoose';



interface IShortUrl extends Document {
  short_id: string;
  target: string;
  owner: string;
  created_at: Date;
  password: string;
  is_protected: boolean;
  clicks: number;
}

const ShortUrlSchema: Schema = new Schema({
  short_id: {
    type: String,
    required: true,
    unique: true,
  },
  target: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    default: () => {
      return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toUpperCase();
    }
  },
  is_protected: {
    type: Boolean,
    default: false,
  },
  clicks: {
    type: Number,
    default: 0,
  }
});

export default model<IShortUrl>('ShortUrl', ShortUrlSchema);
