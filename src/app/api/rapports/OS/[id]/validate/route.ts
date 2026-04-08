import { callApiPut } from "@/lib/callApi";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const requiredFields: string[] = [];
  return callApiPut(req, `rapports/OS/${id}/validate`, requiredFields);
}
