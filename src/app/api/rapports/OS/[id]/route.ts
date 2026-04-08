import { callApiDelete, callApiPut } from "@/lib/callApi";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const requiredFields = ["name","li"];
  return callApiPut(req, `rapports/OS/${id}`, requiredFields);
}
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  // On construit l'url "rapports/1" dynamiquement
  return await callApiDelete(request, `/rapports/OS/${id}`);
}