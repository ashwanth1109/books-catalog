import { Field, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Book {
  @Field()
  readonly _id!: ObjectId;

  @Field()
  @Property({ required: true })
  title!: string;

  @Field({ nullable: true })
  @Property()
  description?: string;

  @Field()
  @Property({ required: true })
  year!: number;
}

export const BookModel = getModelForClass(Book);
