// GenerateJWT and VerifyJWT
import { Handler } from "worktop"
import { genJWT, signJWT, verifyJWT } from "../../lib/auth"
import { jsonResponse, commonResponse } from "../../lib/utils"

export const jwtHandler: Handler = async function (req, res) {
    if (req.method != "POST") return await commonResponse(res, 405)

    const auth = req.headers.get("Authorization")?.replace("Bearer ", "") || ""

    if (!auth) return await commonResponse(res, 401)
    if (await verifyJWT(auth) != "valid") return await commonResponse(res, 401)

    const data = genJWT("XynBio-Next", "Generate JWT", "api")
    const jwt = await signJWT(data, "1h");
    return await jsonResponse(res, 200, { data: data, jwt: jwt })
}