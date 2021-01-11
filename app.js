const requestURL = 'https://jsonplaceholder.typicode.com/users';

const form = document.forms['formUsers'];
const nameForm = form.elements['name'];
const emailForm = form.elements['email'];
const passwordForm = form.elements['password'];
const phoneForm = form.elements['phone'];
const websiteForm = form.elements['website'];

const usersList = document.querySelector('.users-list');
gettHttp().then((users) => users.forEach((user) => createUserCard(user)));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameValue = nameForm.value;
  const emailValue = emailForm.value;
  const passwordValue = passwordForm.value;
  const phoneValue = phoneForm.value;
  const websiteValue = websiteForm.value;

  const userObj = {
    userId: 1,
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    phone: phoneValue,
    website: websiteValue,
  };
  postHttp(userObj, createUserCard);
  e.currentTarget.reset();
});

function postHttp(user, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', requestURL);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', () => {
    const responce = JSON.parse(xhr.responseText);
    cb(responce);
  });
  xhr.send(JSON.stringify(user));
}

function gettHttp() {
  return new Promise((resolve, reject) => {
    fetch(requestURL)
      .then((users) => {
        return users.json();
      })
      .then((users) => resolve(users))
      .catch((err) => console.log(err));
  });
}

function createUserCard(user) {
  usersList.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="card border-dark">
      <div class="card-header">
      <h6 class='mt-2 mb-2'>Name:</h6>
        ${user.name}
      </div>
      <div class="card-body">
      <h6>Phone:</h6>
        ${user.phone}
      <h6>E-mail:</h6>
        ${user.email}
      <h6>Website:</h6>
        ${user.website}
      </div>
    </div>
    `
  );
}
