import { NextRequest } from "next/server";
import { callApiPost, callApiGet } from "@/lib/callApi";

export async function GET(request: NextRequest) {
  return callApiGet(request, "rapports/OS");
}

export async function POST(request: NextRequest) {
  return callApiPost(request, "rapports/OS", ["name"]);
}
