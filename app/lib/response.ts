import { NextResponse } from "next/server";

export function success<T>(
  data: T,
  message: string = "Success",
  status: number = 200
) {
  return NextResponse.json(
    {
      status: "success",
      message,
      data,
    },
    { status }
  );
}

export function fail(
  message: string = "Error",
  status: number = 400
) {
  return NextResponse.json(
    {
      status: "fail",
      message,
    },
    { status }
  );
}

export function validationError(
  errors: unknown,
  message: string = "Validation failed"
) {
  return NextResponse.json(
    {
      status: "validation_error",
      message,
      errors,
    },
    { status: 422 }
  );
}
