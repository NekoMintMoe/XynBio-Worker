// Path: lib\auth.ts
import { SignJWT, jwtVerify } from 'jose'

// SignJWT using jose kit
export const signJWT = async (payload: any, expTime: string) => {
    if (!process.env.JWT_SECRET) {
        console.log("JWT_SECRET not set")
        return 'JWT_SECRET not set'
    }
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expTime)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    return jwt
}

// Decode JWT using jose kit
export const decodeJWT = async (token: string) => {
    try {
        const jwt = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
        return jwt
    } catch (error) {
        if (!process.env.JWT_SECRET) console.log("JWT_SECRET not set")
        return false
    }
}

// Verify JWT using jose kit
export const verifyJWT = async (token: string) => {
    const jwt = await decodeJWT(token)
    if (!jwt) {
        return "invalid"
    }
    if (jwt.payload.issuer !== process.env.DATA_API_URL) {
        return "invalid"
    }
    const jwtExp = jwt.payload.exp??0
    const timeNow = Date.now() / 1000
    if (timeNow > jwtExp) {
        return "expired"
    }
    return "valid"
}

// JWT Data Structure
export const genJWT = (audience: string, action: string, scope: string) => {
    const data = { issuer: process.env.DATA_API_URL, audience: audience, action: action, scope: scope }
    return data
}