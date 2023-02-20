const form = document.getElementById('user-form')
const nameInput = document.getElementById('name-input')
const emailInput = document.getElementById('email-input')
const addUserBtn = document.getElementById('add-user-btn')
const updateUserBtn = document.getElementById('update-user-btn')
const cancelBtn = document.getElementById('cancel-btn')
const userList = document.getElementById('user-list')

let users = []

function renderUsers() {
  userList.innerHTML = ''
  users.forEach((user) => {
    const li = document.createElement('li')
    li.innerHTML = `<span>${user.name}</span><span>${user.email}</span><button class="delete-btn" data-id="${user.id}">Delete</button><button class="edit-btn" data-id="${user.id}">Edit</button>`
    userList.appendChild(li)
  })
}

function addUser() {
  const name = nameInput.value
  const email = emailInput.value
  if (name.trim() === '' || email.trim() === '') {
    return
  }
  const user = {
    id: Date.now(),
    name,
    email,
  }
  users.push(user)
  renderUsers()
  nameInput.value = ''
  emailInput.value = ''
}

function updateUser() {
  const name = nameInput.value
  const email = emailInput.value
  if (name.trim() === '' || email.trim() === '') {
    return
  }
  const id = updateUserBtn.getAttribute('data-id')
  const userIndex = users.findIndex((user) => user.id == id)
  if (userIndex === -1) {
    return
  }
  users[userIndex].name = name
  users[userIndex].email = email
  renderUsers()
  nameInput.value = ''
  emailInput.value = ''
  updateUserBtn.style.display = 'none'
  cancelBtn.style.display = 'none'
  addUserBtn.style.display = 'block'
}

function deleteUser(id) {
  users = users.filter((user) => user.id != id)
  renderUsers()
}

function editUser(id) {
  const user = users.find((user) => user.id == id)
  if (!user) {
    return
  }
  nameInput.value = user.name
  emailInput.value = user.email
  updateUserBtn.style.display = 'block'
  updateUserBtn.setAttribute('data-id', user.id)
  cancelBtn.style.display = 'block'
  addUserBtn.style.display = 'none'
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const id = updateUserBtn.getAttribute('data-id')
  if (id) {
    updateUser()
  } else {
    addUser()
  }
})

userList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id')
    deleteUser(id)
  }
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.getAttribute('data-id')
    editUser(id)
  }
})

cancelBtn.addEventListener('click', () => {
  nameInput.value = ''
  emailInput.value = ''
  updateUserBtn.style.display = 'none'
  cancelBtn.style.display = 'none'
  addUserBtn.style.display = 'block'
})

renderUsers()
