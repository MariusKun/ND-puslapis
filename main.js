const INITIAL_STUDENT_DATA = [
  {
    name: 'Vardas 1',
    surname: 'Pavarde 1',
    age: 20,
    phone: '+370654654654',
    email: 'vardas1@imone.lt',
    itKnowledge: 5,
    group: 10,
    interests: [
      'JavaScript',
      'TypeScript',
      'Node',
      'React Native'
    ]
  },
  {
    name: 'Vardas 2',
    surname: 'Pavarde 2',
    age: 35,
    phone: '+370654654654',
    email: 'vardas2@imone.lt',
    itKnowledge: 5,
    group: 10,
    interests: [
      'JavaScript',
      'TypeScript',
      'Node',
      'React Native'
    ]
  },
  {
    name: 'Vardas 3',
    surname: 'Pavarde 3',
    age: 32,
    phone: '+370654654654',
    email: 'vardas3@imone.lt',
    itKnowledge: 5,
    group: 10,
    interests: [
      'JavaScript',
      'TypeScript',
      'Node',
      'React Native'
    ]
  },
  {
    name: 'Vardas 4',
    surname: 'Pavarde 4',
    age: 25,
    phone: '+370654654654',
    email: 'vardas4@imone.lt',
    itKnowledge: 5,
    group: 10,
    interests: [
      'JavaScript',
      'TypeScript',
      'Node',
      'React Native'
    ]
  },
  {
    name: 'Vardas 5',
    surname: 'Pavarde 5',
    age: 18,
    phone: '+370654654654',
    email: 'vardas5@imone.lt',
    itKnowledge: 5,
    group: 10,
    interests: [
      'JavaScript',
      'TypeScript',
      'Node',
      'React Native'
    ]
  },
];
let studentForm = document.querySelector('#student-form');
let editStudent = null;
studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let validForm = formErrorHandler(studentForm);
  if (!validForm) {
    return;
  }
  let formInterests = document.querySelectorAll('input[name=interest]:checked');
  let interestValues = [...formInterests].map(element => {
    return element.value;
  });
  let studentFormData = {
    name: document.querySelector('input[name=name]').value,
    surname: document.querySelector('#student-surname').value,
    age: event.target.elements.age.value,
    phone: studentForm.querySelector('#student-phone').value,
    email: document.querySelector('#student-email').value,
    itKnowledge: event.target.elements['it-knowledge'].value,
    group: event.target.elements.group.value,
    interests: interestValues,
  };
  if (editStudent) {
    alertMessage(`Student edited (${studentFormData.name} ${studentFormData.surname})`);
  } else {
    alertMessage(`Student created (${studentFormData.name} ${studentFormData.surname})`);
  }
  renderStudent(studentFormData);
  studentForm.reset();
  itKnowledgeOutputReset();
});
function itKnowledgeOutputReset() {
  let itKnowledgeElement = document.querySelector('#student-it-knowledge');
  let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
  itKnowledgeOutput.textContent = itKnowledgeElement.value;
  itKnowledgeElement.addEventListener('input', () => {
    itKnowledgeOutput.textContent = itKnowledgeElement.value;
  });
}
function alertMessage(text, elementClass = '') {
  let alertElement = document.querySelector('#alert');
  alertElement.textContent = text;
  if (elementClass) {
    alertElement.classList.add(elementClass);
  }
  setTimeout(() => {
    alertElement.textContent = '';
    if (elementClass) {
      alertElement.classList.remove(elementClass);
    }
  }, 5000);
}
function renderInitialStudentData(students) {
  students.map((student) => {
    renderStudent(student);
  });
}
function renderStudent(studentData) {
  let personName = studentData.name;
  let personSurname = studentData.surname;
  let personAge = studentData.age;
  let personPhone = studentData.phone;
  let personEmail = studentData.email;
  let personItKnowledge = studentData.itKnowledge;
  let personGroup = studentData.group;
  let interests = studentData.interests;
  let studentsList = document.querySelector('#students-list');
  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');
  let studentNameEl = document.createElement('p');
  studentNameEl.innerHTML = `<strong>Name: </strong><span class="student-name">${personName}</span>`;
  let studentSurnameEl = document.createElement('p');
  studentSurnameEl.innerHTML = `<strong>Surname: </strong><span class="student-surname">${personSurname}</span>`;
  let studentAgeEl = document.createElement('p');
  studentAgeEl.innerHTML = `<strong>Age: </strong><span class="student-age">${personAge}</span>`;
  let studentPhoneEl = document.createElement('p');
  studentPhoneEl.innerHTML = `<strong>Phone: </strong><span class="hidden-area">****</span>`;
  let studentEmailEl = document.createElement('p');
  studentEmailEl.innerHTML = `<strong>Email: </strong><span class="hidden-area">****</span>`;
  let studentItKnowledgeEl = document.createElement('p');
  studentItKnowledgeEl.innerHTML = `<strong>IT Knowledge: </strong><span class="student-it-knowledge">${personItKnowledge}</span>`;
  let studentGroupEl = document.createElement('p');
  studentGroupEl.innerHTML = `<strong>Group: </strong><span class="student-group">${personGroup}</span>`;
  let interestWrapperEl = document.createElement('div');
  let interestTitleEl = document.createElement('h4');
  interestTitleEl.textContent = 'Interests:';
  let studentInterestsEl = document.createElement('ul');
  interests.forEach((interest) => {
    let interestItem = document.createElement('li');
    interestItem.textContent = interest;
    studentInterestsEl.append(interestItem);
  });
  interestWrapperEl.append(interestTitleEl, studentInterestsEl);
  let privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = 'Rodyti asmens duomenis';
  privateInfoButton.addEventListener('click', () => {
    if (privateInfoButton.classList.contains('hide')) {
      studentPhoneEl.querySelector('.hidden-area').textContent = '****';
      studentEmailEl.querySelector('.hidden-area').textContent = '****';
      privateInfoButton.textContent = 'Rodyti asmens duomenis';
    } else {
      studentPhoneEl.querySelector('.hidden-area').textContent = personPhone;
      studentEmailEl.querySelector('.hidden-area').textContent = personEmail;
      privateInfoButton.textContent = 'Sl??pti asmens duomenis';
    }
    privateInfoButton.classList.toggle('hide');
  });
  let deleteStudentButton = document.createElement('button');
  deleteStudentButton.textContent = 'I??trinti student??';
  deleteStudentButton.addEventListener('click', () => {
    studentItem.remove();
    alertMessage(`Studentas (${personName} ${personSurname}) s??kmingai i??trintas.`);
  });
  // 1. Sukurti Edit mygtuk??.
  let editStudentButton = document.createElement('button');
  editStudentButton.textContent = 'Redaguoti studento duomenis';
  // 2. Prie mygtuko prid??ti event listener'??.
  editStudentButton.addEventListener('click', () => {
    // 3. Surinkti studento duomenis ir jais u??pildyti formos laukelius.
    studentForm.querySelector('#student-name').value = personName;
    studentForm.querySelector('#student-surname').value = personSurname;
    studentForm.querySelector('#student-age').value = personAge;
    studentForm.querySelector('#student-phone').value = personPhone;
    studentForm.querySelector('[name=email]').value = personEmail;
    studentForm.querySelector('#student-it-knowledge').value = personItKnowledge;
    studentForm.elements.group.value = personGroup;
    itKnowledgeOutputReset();
    // 4. Pakeisti formos submit mygtuko tekst??.
    studentForm.querySelector('[type=submit]').value = 'Save Changes';
    // 5. I??saugoti studento HTML element?? kintam??jame.
    editStudent = studentItem;
  })
  studentItem.append(studentNameEl, studentSurnameEl, studentAgeEl, studentPhoneEl, studentEmailEl, studentItKnowledgeEl, studentGroupEl, interestWrapperEl, privateInfoButton, deleteStudentButton, editStudentButton);
  // 6. Submit event'o metu patikrinti ar kuriame nauj?? student??, ar redaguojame jau sukurt??.
  if (editStudent) {
    // 7. Jeigu studentas redaguojamas, ???? nauj?? (redaguot??) HTML element?? panaudoti perra??ant sen?? studento HTML element?? (kuris i??saugotas 5 ??ingsnyje).
    // editStudent kintamasis saugo originalaus studentItem reiksme.
    console.log(editStudent);
    // studentItem kintamasis saugo dabartines formos reike sukurt?? student??
    console.log(studentItem);
    // editStudent.innerHTML = studentItem.innerHTML;
    editStudent.replaceWith(studentItem);
    editStudent = null;
    // 8. Pakeisti formos submit mygtuko tekst?? ?? pradin?? ir pakeisti i????okan??io prane??imo tekst??.
    studentForm.querySelector('[type=submit]').value = 'Submit';
  } else {
    studentsList.prepend(studentItem);
  }
}
function formErrorHandler(form) {
  let inputErrorMessages = form.querySelectorAll('.input-error-message');
  inputErrorMessages.forEach(message => message.remove());
  form.querySelectorAll('input.input-error').forEach(input => input.classList.remove('input-error'));
  let requiredInputs = form.querySelectorAll('input.required');
  let formValid = true;
  requiredInputs.forEach(input => {
    if (!input.value) {
      formValid = false;
      inputErrorMessage(input, '??is laukelis yra privalomas');
    } else {
      if (input.name === 'name') {
        if (input.value.length < 3) {
          inputErrorMessage(input, 'Vardas yra per trumpas. Jis tur??t?? b??ti bent 3 simboli?? ilgio.');
          formValid = false;
        }
      }
      if (input.name === 'surname') {
        if (input.value.length < 3) {
          inputErrorMessage(input, 'Pavard?? yra per trumpa. Ji tur??t?? b??ti bent 3 simboli?? ilgio.');
          formValid = false;
        }
      }
      if (input.name === 'age') {
        if (input.value < 0) {
          inputErrorMessage(input, 'Am??ius privalo b??ti teigiamas skai??ius.');
          formValid = false;
        }
        if (input.value > 120) {
          inputErrorMessage(input, '??vestas am??ius yra per didelis. Maksimalus am??ius yra 120 met??.');
          formValid = false;
        } 
      }
      if (input.name === 'phone') {
        if (input.value.length < 9 || input.value.length > 12) {
          inputErrorMessage(input, '??vestas telefono numeris yra neteisingas');
          formValid = false;
        }
      }
      if (input.name === 'email') {
        if (!input.value.includes('@')) {
          inputErrorMessage(input, '??vestas elektroninis pa??tas yra neteisingas');
          formValid = false;
        }
      }
    }
  })
  return formValid;
}
function inputErrorMessage(inputElement, errorMessage) { 
  inputElement.classList.add('input-error');
  alertMessage('Ne visi laukeliai yra u??pildyti.', 'error-alert');
  let inputError = document.createElement('span');
  inputError.textContent = errorMessage;
  inputError.classList.add('input-error-message');
  inputElement.after(inputError);
}
// 1. Selektinti paie??kos forma javascript'e ir priskirti j?? kintam??jam.
let searchForm = document.querySelector('#search');
// 2. ??iam kintam??jam prid??ti event listener'?? - jo tipas submit.
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // 3. Submit metu, i??saugoti duomenis, kurie ??vesti paie??kos formoje (text input'e).
  let searchInput = event.target.elements.search.value.toLowerCase();
  console.log(searchInput);
  let searchVariation = event.target.elements.variations.value;
  console.log(searchVariation);
  // 4. Selektinti visus student?? elementus, jis pridedam ?? kintam??j??.
  let students = document.querySelectorAll('.student-item');
// 5. Leisti cikl?? per student?? masyv?? ir kiekvieno ciklo metu:
  students.forEach(student => {
    // 5.1. Paselektinti studento vard??.
    let studentName = student.querySelector('.student-name').textContent.toLowerCase();
    // 5.2. Paselektinti studento pavard??.
    let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();
    let studentAge = student.querySelector('.student-age').textContent;
    let studentItKnowledge = student.querySelector('.student-it-knowledge').textContent
    let studentGroup = student.querySelector('.student-group').textContent;
    // 5.3. Patikrinti ar varde arba pavard??je yra ie??koma fraz??.
    // if (studentName.includes(searchInput.toLowerCase()) || studentSurname.includes(searchInput.toLowerCase())) {
    //   // 5.3.2. Jeigu yra, tai reikia parodyti studento element?? (display: block).
    //   student.style.display = 'block';
    // } else {
    //   // 5.3.1. Jeigu n??ra, tai reikia pasl??pti studento element?? (display: none).
    //   student.style.display = 'none';
    // }
    switch (searchVariation) {
      case 'name':
        if (studentName.includes(searchInput)) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }
        break;
      case 'surname':
        if (studentSurname.includes(searchInput)) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }
        break;
      case 'age':
        if (studentAge == searchInput) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }
        break;
      case 'it-knowledge':
        if (studentItKnowledge == searchInput) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }
        break;
      case 'group':
        if (studentGroup.includes(searchInput)) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }
        break;
      default:
        console.log('Netinkamas')
    }
  })
})
// PIRMAS VARIANTAS
// studentForm.addEventListener('input', (event) => {
//   let name = studentForm.querySelector('#student-name').value;
//   localStorage.setItem('student-name', name);
//   let surname = studentForm.querySelector('#student-surname').value;
//   localStorage.setItem('student-surname', surname);
//   let age = studentForm.querySelector('#student-age').value;
//   localStorage.setItem('student-age', age);
//   let phone = studentForm.querySelector('#student-phone').value;
//   localStorage.setItem('student-phone', phone);
//   let email = studentForm.querySelector('#student-email').value;
//   localStorage.setItem('student-email', email);
//   let itKnowledge = studentForm.querySelector('#student-it-knowledge').value;
//   localStorage.setItem('student-it-knowledge', itKnowledge);
//   let group = studentForm.elements.group.value;
//   localStorage.setItem('student-group', group);
// });
// studentForm.querySelector('#student-name').value = localStorage.getItem('student-name');
// studentForm.querySelector('#student-surname').value = localStorage.getItem('student-surname');
// studentForm.querySelector('#student-age').value = localStorage.getItem('student-age');
// studentForm.querySelector('#student-phone').value = localStorage.getItem('student-phone');
// studentForm.querySelector('#student-email').value = localStorage.getItem('student-email');
// studentForm.querySelector('#student-it-knowledge').value = localStorage.getItem('student-it-knowledge');
// studentForm.elements.group.value = localStorage.getItem('student-group');
// ANTRAS VARIANTAS
// studentForm.addEventListener('input', (event) => {
//   let inputName = event.target.name;
//   let inputValue = event.target.value;
//   localStorage.setItem(inputName, inputValue);
// });
// studentForm.querySelector('#student-name').value = localStorage.getItem('name');
// studentForm.querySelector('#student-surname').value = localStorage.getItem('surname');
// studentForm.querySelector('#student-age').value = localStorage.getItem('age');
// studentForm.querySelector('#student-phone').value = localStorage.getItem('phone');
// studentForm.querySelector('#student-email').value = localStorage.getItem('email');
// studentForm.querySelector('#student-it-knowledge').value = localStorage.getItem('it-knowledge');
// studentForm.elements.group.value = localStorage.getItem('group');
// TRE??IAS VARIANTAS
studentForm.addEventListener('input', (event) => {
  let formInfo = {
    name: studentForm.querySelector('#student-name').value,
    surname: studentForm.querySelector('#student-surname').value,
    age: studentForm.querySelector('#student-age').value,
    phone: studentForm.querySelector('#student-phone').value,
    email: studentForm.querySelector('#student-email').value,
    itKnowledge: studentForm.querySelector('#student-it-knowledge').value,
    group: studentForm.elements.group.value,
  }
  // let formInfoInString = JSON.stringify(formInfo);
  // localStorage.setItem('form-info', formInfoInString);
  localStorage.setItem('form-info', JSON.stringify(formInfo));
});
let localStorageFormInfo = JSON.parse(localStorage.getItem('form-info'));
console.log(localStorageFormInfo);
studentForm.querySelector('#student-name').value = localStorageFormInfo.name;
studentForm.querySelector('#student-surname').value = localStorageFormInfo.surname;
studentForm.querySelector('#student-age').value = localStorageFormInfo.age;
studentForm.querySelector('#student-phone').value = localStorageFormInfo.phone;
studentForm.querySelector('#student-email').value = localStorageFormInfo.email;
studentForm.querySelector('#student-it-knowledge').value = localStorageFormInfo.itKnowledge;
studentForm.elements.group.value = localStorageFormInfo.group;
renderInitialStudentData(INITIAL_STUDENT_DATA);
itKnowledgeOutputReset();