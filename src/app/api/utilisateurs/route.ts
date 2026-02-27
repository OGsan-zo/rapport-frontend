import { NextRequest } from "next/server";
import { callApiGet, callApiPost } from "@/lib/callApi";

export async function GET(request: NextRequest) {
    return callApiGet(request, "utilisateurs");
}

export async function POST(request: NextRequest) {
    const requiredFields = ["email", "mdp", "idRole", "entite"];
    return callApiPost(request, "utilisateurs", requiredFields);
}
