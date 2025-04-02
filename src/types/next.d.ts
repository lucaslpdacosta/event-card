// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: { id: number; email: string };
  }
}