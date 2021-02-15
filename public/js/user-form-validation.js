document.addEventListener("DOMContentLoaded", () => {

  // DOM elements - Contact form
  const contactForm = document.querySelector('.new-user')
  const formSubmit = document.querySelector('.new-user button[type="submit"]')

  // don't validate form via HTML
  contactForm.setAttribute("novalidate", true)

  formSubmit.onclick = (event) => {

    // first name validation
    const firstName = document.querySelector('.new-user #firstname')
    const firstNameAlert = document.querySelector('.alert.firstname')
    if (firstName.value === '') {
      event.preventDefault()
      firstNameAlert.innerHTML = 'First name required.'
      firstNameAlert.style.visibility = 'visible'
    } else if (/^([A-Za-zÀ-ÖØ-öø-ÿ])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+$/.test(firstName.value) !== true) {
      event.preventDefault()
      firstNameAlert.innerHTML = 'Please use a valid name (restricted to only characters, spaces and hyphens).'
      firstNameAlert.style.visibility = 'visible'
    } else {
      firstNameAlert.style.visibility = 'hidden'
    }

    // last name validation
    const lastName = document.querySelector('.new-user #lastname')
    const lastNameAlert = document.querySelector('.alert.lastname')
    if (lastName.value === '') {
      event.preventDefault()
      lastNameAlert.innerHTML = 'Last name required.'
      lastNameAlert.style.visibility = 'visible'
    } else if (/^([A-Za-zÀ-ÖØ-öø-ÿ])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+$/.test(lastName.value) !== true) {
      event.preventDefault()
      lastNameAlert.innerHTML = 'Please use a valid name (restricted to only characters, spaces and hyphens).'
      lastNameAlert.style.visibility = 'visible'
    } else {
      lastNameAlert.style.visibility = 'hidden'
    }

    // email validation - regex courtesy of Tripleaxis
    const email = document.querySelector('.new-user #email')
    const emailAlert = document.querySelector('.alert.email')
    if (email.value === '') {
      event.preventDefault()
      emailAlert.innerHTML = 'Email required.'
      emailAlert.style.visibility = 'visible'
    } else if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email.value) !== true) {
      event.preventDefault()
      emailAlert.innerHTML = 'Please use a valid email address.'
      emailAlert.style.visibility = 'visible'
    } else {
      emailAlert.style.visibility = 'hidden'
    }

    // password validation - regex courtesy of psutton3756
    const password = document.querySelector('.new-user #password')
    const passwordAlert = document.querySelector('.alert.password')
    if (password.value === '') {
      event.preventDefault()
      passwordAlert.innerHTML = 'Password required.'
      passwordAlert.style.visibility = 'visible'
    } else if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password.value) !== true) {
      event.preventDefault()
      passwordAlert.innerHTML = 'Please choose a valid password.'
      passwordAlert.style.visibility = 'visible'
    }
    else {
      passwordAlert.style.visibility = 'hidden'
    }
  }
})