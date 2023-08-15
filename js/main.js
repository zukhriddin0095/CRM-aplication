const GroupsFilter = document.querySelector(".groups-filter");
const GroupsSelect = document.querySelector(".groups-select");
const StateUser = document.querySelector(".state-filter");
const studentsForm = document.querySelector(".students-form");
const saveBtn = document.querySelector(".save-btn");
const exampleModal = document.querySelector("#exampleModal");
const studentsTableBody = document.querySelector(".studentsTable tbody");
const openModal = document.querySelector(".open-modal");
const studentSearch = document.querySelector(".student-search");
// console.log(StateUser);

GroupsFilter.innerHTML += `<option value="all">All</option>;`;

let search = "";

// groups mapping

Groups.map((el) => {
  GroupsFilter.innerHTML += `<option value="${el}">${el}</option>;`;
  GroupsSelect.innerHTML += `<option value="${el}">${el}</option>;`;
});
Groups.map((el) => {});

// groups mapping

// city mapping
state.map((st) => {
  StateUser.innerHTML += `<option value="${st}">${st}</option>;`;
});
// city mapping

// saveBtn.addEventListener("click", () => {

//   let elements = studentsForm.elements;

//   let student = {
//     firstName: elements.firstName.value,
//     lastName: elements.lastName.value,
//     salary: elements.Salary.value,
//     Group: elements.GroupsRow.value,
//     doeswork: elements.doesWork.checked,
//     isMarried: elements.isMarried.checked,
//   };
//   students.push(student);
//   console.log(students);
// })

let studentsJson = localStorage.getItem("students");
let students = JSON.parse(studentsJson) || [];

let selected = null;
let group = "All";

studentsForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let elements = studentsForm.elements;

  let student = {
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    salary: elements.Salary.value,
    Group: elements.GroupsRow.value,
    doeswork: elements.doesWork.checked,
    isMarried: elements.isMarried.checked,
  };

  if (this.checkValidity()) {
    bootstrap.Modal.getInstance(exampleModal).hide();
    if (selected == null) {
      students.push(student);
    } else {
      students[selected] = student;
    }

    localStorage.setItem("students", JSON.stringify(students));
    getstudentsForm();
  } else {
    this.classList.add("was-validated");
  }
  console.log(students);
});

// form mapping

function getStudentsTable(student, i) {
  return `<tr>
        <th scope="row">${i + 1}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.Group}</td>
        <td>${student.doeswork ? "ha" : "yoq"}</td>
        <td>${student.salary}</td>
        <td>${student.isMarried ? "ha" : "yoq"}</td>
        <td class="text-end">
        <button onClick="editStudent(${i})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Edit </button>
        <button onClick="deleteStudent(${i})" class="btn btn-danger">Delete</button>
        
        </td>
    </tr>`;
}

function getstudentsForm() {
  studentsTableBody.innerHTML = "";

  let results = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(search) ||
      student.lastName.toLowerCase().includes(search)
  );

  if (group != "All") {
    results = results.filter((student) => student.Group === group);
  }

  if (results.length === 0) {
    studentsTableBody.innerHTML = "No Student"
  }else {
    results.map((student, i) => {
      studentsTableBody.innerHTML += getStudentsTable(student, i);
    });
}
  }
    

getstudentsForm();

// form mapping

// edit

function editStudent(i) {
  selected = i;
  saveBtn.textContent = "Save Student";

  let { firstName, lastName, salary, Group, doeswork, isMarried } = students[i];
  let elements = studentsForm.elements;

  elements.firstName.value = firstName;
  elements.lastName.value = lastName;
  elements.Salary.value = salary;
  elements.GroupsRow.value = Group;
  elements.doesWork.checked = doeswork;
  elements.isMarried.checked = isMarried;
}

// edit

openModal.addEventListener("click", () => {
  selected = null;
  saveBtn.textContent = "Add Student";

  let elements = studentsForm.elements;

  elements.firstName.value = "";
  elements.lastName.value = "";
  elements.Salary.value = "";
  elements.GroupsRow.value = "";
  elements.doesWork.checked = false;
  elements.isMarried.checked = false;
});

function deleteStudent(i) {
  let isDelete = confirm("Do you want to delete this student");
  if (isDelete) {
    students.splice(i, 1);
    localStorage.setItem("students", JSON.stringify(students));
    getstudentsForm();
  }
}

// search

studentSearch.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  getstudentsForm();
});
// search

// All

GroupsFilter.addEventListener("change", function () {
  group = this.value;
  getstudentsForm();
});

// All
