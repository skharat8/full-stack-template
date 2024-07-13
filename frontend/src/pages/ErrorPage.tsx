import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import type { ResponseError } from "@/data/types";
import Button from "@/components/Button";
import styles from "./ErrorPage.module.css";

function getErrorMessage(error: unknown): string {
  let msg: string;

  if (axios.isAxiosError<ResponseError>(error)) {
    msg = error.response?.data.error ?? error.message;
  } else if (isRouteErrorResponse(error)) {
    msg = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    msg = error.message;
  } else if (typeof error === "string") {
    msg = error;
  } else {
    console.error(error);
    msg = "Unknown error";
  }

  return msg;
}

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div className={styles.errorPageContainer}>
      <h1 className="main-title">Oops!</h1>

      <p>Sorry, an unexpected error has occurred</p>
      <p className={styles.errorMessage}>
        <i>{getErrorMessage(error)}</i>
      </p>

      <Button onClick={navigateBack}>Go Back</Button>
    </div>
  );
}

export default ErrorPage;
