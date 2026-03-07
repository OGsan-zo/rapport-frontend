import { callApiDelete, callApiPut } from "@/lib/callApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  return NextResponse.json({ 
    message: `Rapport ${id} récupéré avec succès`,
    id: id
  });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const url = `/calendriers/${id}`;

  return await callApiPut(req, url, []);
}
// app/api/rapports/[id]/route.ts

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  // On construit l'url "rapports/1" dynamiquement
  return await callApiDelete(request, `/calendriers/${id}`);
}