import { ReplaySubject } from "rxjs";
import { Logger } from "@ashwanth1109/books-catalog-common";

export interface ClientError {
  message?: string;
  code?: string;
  type?: string;
}

export enum ErrorType {
  GRAPHQL_CLIENT_ERROR = "GRAPHQL_CLIENT_ERROR",
}

export enum ErrorCode {
  NETWORK_ERROR = "NETWORK_ERROR",
  CLIENT_ERROR = "CLIENT_ERROR",
}

class ErrorsState {
  // We prefer replay subject in case we need to explore history of errors
  public error: ReplaySubject<ClientError> = new ReplaySubject<ClientError>(5);

  constructor() {
    this.error.subscribe((error) => {
      Logger.error("Ran into error: ", error?.message);
      // TODO: Throw a toast error here with "error?.message"
      // TODO: send platform errors to some event bus for observability
      // This way, we will be notified of errors even before users report it
      // With all the necessary debugging information
      // This also lets us know if we have any buggy releases recently.
    });
  }
}

export default ErrorsState;
