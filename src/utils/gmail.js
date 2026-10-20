const emailAddress = 'gokulgk0666@gmail.com'

export function gmailComposeUrl(subject = '', body = '') {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: emailAddress,
    su: subject,
    body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}
