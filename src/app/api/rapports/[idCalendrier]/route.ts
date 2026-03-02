import { NextRequest } from "next/server";
import {  callApiPut } from "@/lib/callApi";


export async function PUT(req: NextRequest, { params }: { params: { idCalendrier: string } }) {
  const { idCalendrier } = params;
  const requiredFields = [
    "idCalendrier",
  ];
  const url = `rapports/${idCalendrier}`;
  return await callApiPut(req, url, requiredFields);
}
