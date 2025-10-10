const dateTimeFormat = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});


function dateToString(date) {
  return dateTimeFormat.format(date * 1000);
}

function getUserId() {
  return window.localStorage.getItem('userId');
}

function getUserName() {
  return window.localStorage.getItem('userName');
}

const headers = () => new Headers({
  'Content-Type': 'application/json',
  'Authorization': window.localStorage.getItem('accessToken')
})

const ajax = (url, options) => {
  const body = options?.body;
  const method = options?.method;

  return fetch(url, { method, body, headers: headers() });
}

function logout() {
  window.localStorage.clear();
  window.location.href = '/login';
}