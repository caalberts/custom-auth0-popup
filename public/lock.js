/* global Auth0Lock */

// config
const auth0ClientId = '' // Your Auth0 Client ID
const connectionName = '' // Your Auth0 Connection Name
const auth0Domain = '' // Your Auth0 Domain

const lock = new Auth0Lock(auth0ClientId, auth0Domain)

document.getElementById('btn-login').addEventListener('click', () => {
  // Use facebook login as default
  lock.showSignin({ connections: ['facebook'] }, authCallback)

  // add custom connection in Auth0 Lock
  lock.once('signin ready', function () {
    const link = document.createElement('a')
    link.className = 'a0-zocial a0-custom'
    link.setAttribute('href', '#')

    const text = document.createElement('span')
    text.textContent = 'Custom Login'
    link.appendChild(text)

    link.addEventListener('click', (e) => {
      e.preventDefault()
      lock.getClient().login({
        connection: connectionName,
        popup: true // popup: true is required for callback to be executed
      }, authCallback)
    })
    document.querySelector('.a0-iconlist').appendChild(link)
  })
})

function authCallback (err, profile, token) {
  console.log('callback called')
  if (err) {
    // Error callback
    console.error('Something went wrong: ', err)
    window.alert('Something went wrong, check the Console errors')
  } else {
    // Success callback
    console.log('callback success')
    // Save the JWT token.
    window.localStorage.setItem('userToken', token)

    // Greet user by his first name
    document.getElementById('first-name').textContent = profile.given_name || profile.firstname || profile.name.given_name

    document.querySelector('.btn-login').classList.toggle('hidden')
    document.querySelector('.greeting').classList.toggle('hidden')
  }
}
