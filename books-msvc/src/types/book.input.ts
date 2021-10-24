import { Book } from '../entities/book.model';
import { Field, InputType } from 'type-graphql';

@InputType()
export class BookInput implements Partial<Book> {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  year!: number;
}
