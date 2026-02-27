import { NextRequest } from "next/server";
import { callApiPost } from "@/lib/callApi";

export async function POST(request: NextRequest) {
    const requiredFields = ["dateDebut", "dateFin", "typeCalendrierId"];

    // Note: callApiPost uses getServerAxios which adds the Authorization header automatically
    return callApiPost(request, "calendriers", requiredFields);
}
