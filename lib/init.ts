export const checkEnvInit = () => {
    if (!process.env.DATA_API_URL) {
        console.log("DATA_API_URL not set")
        return false
    }
    if (!process.env.JWT_SECRET) {
        console.log("JWT_SECRET not set")
        return false
    }
    return true
}