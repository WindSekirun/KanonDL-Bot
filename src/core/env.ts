import '../core/ext/string'

export let BOT_TOKEN = process.env.BOT_TOKEN || "730182561:AAGnYRSAir_pSMr0ToV3idHjnDhTHYCshmM"
export let ADMIN_USER_ID = process.env.ADMIN_USER_ID || ""
export let DEBUG_MODE: boolean = (process.env.DEBUG_MODE || "true").toBoolean()
export let LOG_MESSAGE_BODY: boolean = (process.env.LOG_MESSAGE_BODY || "true").toBoolean()
export let TIMEOUT_MILLIS: number = +(process.env.TIMEOUT_MILLIS || "20000")