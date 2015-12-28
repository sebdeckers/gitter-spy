const code = window.location.search
  .substr(1)
  .split('&')
  .map(pair => pair.split('=', 2))
  .find(([key, val]) => key === 'code')
  .pop()
console.log(code)

document.querySelector('#signin')
  .addEventListener('click', () => {
    const redirectUri = window.location.origin
    const clientId = 'd728051b42b404063308cfe73f21cd1b5e42a6a8'
    window.location = 'https://gitter.im/login/oauth/authorize?' + [
      'client_id=' + clientId,
      'response_type=code',
      'redirect_uri=' + redirectUri
    ].join('&')
  })
