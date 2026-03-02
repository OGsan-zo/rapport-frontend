import { callApiPut } from "@/lib/callApi";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ idCalendrier: string }> }
) {
  const { idCalendrier } = await context.params;

  const url = `/api/rapports/${idCalendrier}`;

  return await callApiPut(req, url, []);
}