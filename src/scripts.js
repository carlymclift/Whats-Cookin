


const pickRandomUser = () => {
  let randomUser = Math.floor((Math.random() * 49));
  user = new User(usersData[randomUser].id, usersData[randomUser].name, usersData[randomUser].pantry)
  const welcomeMessage = document.querySelector('.welcome-user');
  welcomeMessage.innerHTML = `Welcome ${user.name}`;
  return user;
}

const loadWindow = () => {
  pickRandomUser()
}

window.onload = loadWindow()