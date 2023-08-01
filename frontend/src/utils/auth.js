export const BASE_URL = 'https://api.avtorian.frontend.nomoredomains.sbs';
function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};
export function register({password, email}){
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkRes)
}
export function authorize({password, email}){
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkRes)
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
}
export function checkToken(token){
return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkRes)
}
