import { NextRequest } from "next/server";
import { callApiPost, callApiGet } from "@/lib/callApi";

export async function POST(request: NextRequest) {
    const requiredFields = ["dateDebut", "dateFin", "typeCalendrierId"];

    // Note: callApiPost uses getServerAxios which adds the Authorization header automatically
    return callApiPost(request, "calendriers", requiredFields);
}

export async function GET(request: NextRequest) {
    return callApiGet(request, "calendriers");
}
