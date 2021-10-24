import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  serialize(value: ObjectId): string {
    return value?.toHexString();
  },
  parseValue(value: unknown): ObjectId {
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values');
    }

    return new ObjectId(value);
  },
  parseLiteral(ast): ObjectId {
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values');
    }

    return new ObjectId(ast.value);
  },
});
