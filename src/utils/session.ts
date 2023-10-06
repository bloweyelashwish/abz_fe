export function setSessionToken(token: string) {
  sessionStorage.setItem('token', JSON.stringify(token));
}

export function getSessionToken() {
  return sessionStorage.getItem('token');
}
