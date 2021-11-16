export function isProdEnv() {
  return process.env.NODE_ENV === "production" ? true : false
}
