import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class User {
  @ApiProperty()
  _id?: Types.ObjectId;

  @ApiProperty()
  @Prop({
    required: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    required: false,
    select: false,
  })
  passwordHash: string;

  @ApiProperty()
  @Prop({
    type: [String],
    default: [],
  })
  roles: string[];

  @ApiProperty()
  @Prop({
    required: false,
    default: () => Date.now(),
  })
  createdAt?: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
