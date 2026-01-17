import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const buildTime = process.env.BUILD_TIME ?? new Date().toISOString();
const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
  null;

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      ok: true,
      env: process.env.NODE_ENV,
      buildTime,
      version: commitSha ?? "dev",
      commit: commitSha,
    });
  } catch {
    return NextResponse.json(
      { ok: false, env: process.env.NODE_ENV, buildTime, version: "error" },
      { status: 500 }
    );
  }
}
