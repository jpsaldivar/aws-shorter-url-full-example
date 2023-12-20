import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Link extends Document {
  @Prop({ type: String, required: false })
  code: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  newUrl: string;

  @Prop({ type: Date, required: false })
  lastAccess: Date;

  @Prop({ type: Number, required: true, default: 0 })
  count: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const LinkSchema = SchemaFactory.createForClass(Link);
