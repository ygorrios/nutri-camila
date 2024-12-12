export const COLORS_ENUM = {
  RESET: '\u001B[0m',
  RED_COLOR: '\u001B[31m',
  GREEN_COLOR: '\u001B[32m',
  YELLOW_COLOR: '\u001B[33m',
  BLUE_COLOR: '\u001B[34m',
  PURPLE_COLOR: '\u001B[35m',
  CYAN_COLOR: '\u001B[36m',
  WHITE_COLOR: '\u001B[37m',
  BLACK_COLOR: '\u001B[30m',
  MAGENTA_COLOR: '\u001B[35m',
  // background color
  RED_BG: '\u001B[41m',
  GREEN_BG: '\u001B[42m',
  YELLOW_BG: '\u001B[43m',
  BLUE_BG: '\u001B[44m',
  PURPLE_BG: '\u001B[45m',
  CYAN_BG: '\u001B[46m',
  WHITE_BG: '\u001B[47m',
  BLACK_BG: '\u001B[40m',
  MAGENTA_BG: '\u001B[45m',
}

export const getInitials = (str?: string) => {
  if (!str) {
    return ''
  }

  return str
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export const isObjectEmpty = (objectName: any) => {
  return (objectName && Object.keys(objectName).length === 0 && objectName.constructor === Object) || !objectName
}

export const getUsernameFromEmail = (email?: string) => {
  if (!email) {
    return null
  }
  const username = email.match(/^([^@]*)src/)
  if (!username || !username[1]) {
    return null
  }
  return username?.[1]?.toLowerCase()
}

export const getMatchesFromString = (str: string, regex: any) => {
  if (!str || !regex) return []
  return str.match(regex) || []
}

export const convertToBool = (input: any) => {
  if (typeof input === 'boolean') {
    return input
  }
  // TODO This might need to be looked at
  if (input === '') {
    return false
  }

  if (input == undefined) {
    return false
  }

  const positive = {
    Y: null,
    TRUE: null,
    '1': null,
    Yes: null,
    YES: null,
    FY: null,
  }
  return typeof input.toUpperCase === 'function' ? input.toUpperCase() in positive : input in positive
}
export const convertToInd = (input: any) => {
  if (input) {
    return 'Y'
  }
  return 'N'
}

export const writeMessageConsole = (message: string, color: string = COLORS_ENUM.CYAN_COLOR) => {
  console.log(`${color}${getDateTime()} - ${message}${COLORS_ENUM.RESET}`)
}

export const writeErrorConsole = (message: string) => {
  console.log(`${COLORS_ENUM.RED_COLOR}${getDateTime()} - ${message}${COLORS_ENUM.RESET}`)
}

const getDateTime = () => {
  const dt = new Date()
  const day = dt.toLocaleString('en-IE', { day: '2-digit' })
  const month = dt.toLocaleString('en-IE', { month: '2-digit' })
  const year = dt.getFullYear()
  const time = dt.toLocaleTimeString()

  return `${day}/${month}/${year} ${time}`
}
