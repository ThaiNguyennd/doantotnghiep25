import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema({ timestamps: true })
export class Chapter {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Object })
  book: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @Prop()
  isPremium: boolean;

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

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
