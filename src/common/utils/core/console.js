export function printErr(message, err) {
  if (process.env.VUE_APP_ENV == 'development')
    console.error('[hsa-error]', message, err)
}

export function printInfo(message, info) {
  if (process.env.VUE_APP_ENV == 'development')
    console.info('[hsa-info]', message, info)
}
