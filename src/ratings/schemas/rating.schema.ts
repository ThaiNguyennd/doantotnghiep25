import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: Object })
  book: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @Prop()
  score: number;

  @Prop({ type: Object })
  createdAt: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
