// GenerateJWT and VerifyJWT
import { genJWT, signJWT, verifyJWT } from "../../lib/auth"
import { checkEnvInit } from "../../lib/init"
import { commonResponse, jsonResponse } from "../../lib/utils"


export default async function handleRequest(req: Request) {
    if (!checkEnvInit()) return await commonResponse(500)
    if (req.method != "POST") return await commonResponse(405)

    const auth = req.headers.get("Authorization")?.replace("Bearer ", "") || ""

    if (!auth) return await commonResponse(401)
    if (await verifyJWT(auth) != "valid") return await commonResponse(401)

    const data = genJWT("XynBio-Next", "Generate JWT", "api")
    const jwt = await signJWT(data, "1h");
    return await jsonResponse(200, { data: data, jwt: jwt });
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
}