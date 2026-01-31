import React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div>
        {isRouteErrorResponse(error) ? (
          <>
            <h1>{error.status}</h1>
            <p>{error.data}</p>
          </>
        ) : error instanceof Error ? (
          <p>{error.message}</p>
        ) : (
          <p>Something went wrong! :(</p>
        )}
        <Link to="/" className="underline text-indigo-400">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
