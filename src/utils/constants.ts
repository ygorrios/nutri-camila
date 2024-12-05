/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
export const gitlabUrl = 'https://gitlab.tds.ie/general/'
export const allCharactersRegex = /a-zA-Z0-9!@#\$%\^\&*\)\(+=._-/gim
export const urlRegex = /^(http(s)?:\/\/|localhost(:\d+)?\/)[\s\S]*$/gim
// /https|http?:\/\/(www|localhost\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gim
export const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$)/gim
export const usernamePasswordSlashRegex = /[a-z0-9/-_]{6,}(\s*\/\s*|\s*\/\/\s*)[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/gim
export const specificTextRegex =
  /(?:sid|port|username|user|workspace|host)(?:: | |:|)+[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/gim
export const specificPwRegex = /(?:pw|password|pasword|pass|pwd|pw)[\s:]*([a-zA-Z0-9!@#\$%\^\&*\)\(+=._?-]+)/gim
// export const specificPwRegex = /(?:pw|password|pasword|pass|pwd|pw)(?:[:\s]*)[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/gim

export const totalRowsPerPage = 6
export const isDev = process.env.IS_LOCALHOST === 'TRUE'

export const localization = {
  signUp: {
    start: {
      title: 'Create your account',
      subtitle: 'to continue to {{applicationName}}',
      actionText: 'Have an account?',
      actionLink: 'Sign in',
    },
    emailLink: {
      title: 'Verify your email',
      subtitle: 'to continue to {{applicationName}}',
      formTitle: 'Verification link',
      formSubtitle: 'Use the verification link sent to your email address',
      resendButton: "Didn't receive a link? Resend",
      verified: {
        title: 'Successfully signed up',
      },
      loading: {
        title: 'Signing up...',
      },
      verifiedSwitchTab: {
        title: 'Successfully verified email',
        subtitle: 'Return to the newly opened tab to continue',
        subtitleNewTab: 'Return to previous tab to continue',
      },
    },
    emailCode: {
      title: 'Verify your email',
      subtitle: 'to continue to {{applicationName}}',
      formTitle: 'Verification code',
      formSubtitle: 'Enter the verification code sent to your email address',
      resendButton: "Didn't receive a code? Resend",
    },
    phoneCode: {
      title: 'Verify your phone',
      subtitle: 'to continue to {{applicationName}}',
      formTitle: 'Verification code',
      formSubtitle: 'Enter the verification code sent to your phone number',
      resendButton: "Didn't receive a code? Resend",
    },
    continue: {
      title: 'Fill in missing fields',
      subtitle: 'to continue to {{applicationName}}',
      actionText: 'Have an account?',
      actionLink: 'Sign in',
    },
  },
}
