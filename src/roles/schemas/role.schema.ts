import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RolesDocument = HydratedDocument<Roles>;

@Schema({ timestamps: true })
export class Roles {
  @Prop()
  name: string;

  @Prop()
  des: string;

  @Prop()
  isActive: boolean;

  @Prop()
  permission: mongoose.Schema.Types.ObjectId[];

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

export const RolesSchema = SchemaFactory.createForClass(Roles);
