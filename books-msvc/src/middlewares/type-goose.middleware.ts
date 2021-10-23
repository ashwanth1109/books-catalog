import { Document, Model } from 'mongoose';
import { MiddlewareFn } from 'type-graphql';
import { getClassForDocument } from '@typegoose/typegoose';

export const TypeGooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next();

  if (Array.isArray(result)) {
    return result.map((item) =>
      item instanceof Model ? convertDocument(item) : item
    );
  }

  if (result instanceof Model) {
    return convertDocument(result);
  }

  return result;
};

function convertDocument(doc: Document): unknown {
  const convertedDocument = doc.toObject();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const DocumentClass = getClassForDocument(doc)!;
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);

  return convertedDocument;
}
