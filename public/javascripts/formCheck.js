const form = document.querySelector('#restaurant-form')
const button = document.querySelector('.btn-restaurant')

button.addEventListener('click', function onSubmitButtonClicked(event) {
  form.classList.add('was-validated')
})

form.addEventListener('submit', (event) => {
  if (form.checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
})