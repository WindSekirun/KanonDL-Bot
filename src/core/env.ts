import '../core/ext/string'

export let BOT_TOKEN = process.env.BOT_TOKEN || ""
export let ADMIN_USER_ID = process.env.ADMIN_USER_ID || ""
export let DEBUG_MODE: boolean = (process.env.DEBUG_MODE || "").toBoolean()
export let LOG_MESSAGE_BODY: boolean = (process.env.LOG_MESSAGE_BODY || "").toBoolean()
export let TIMEOUT_MILLIS: number = +(process.env.TIMEOUT_MILLIS || "")