const addemployeebtn = document.getElementById("addemployee");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementById("closeModalBtn");
const form = document.getElementById("employeeForm");
const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sort");
const paginationSelect = document.getElementById("pagination");

let employeesList = [
  {
    id: 1,
    firstName: "Aman",
    lastName: "Sharma",
    email: "aman.sharma@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 2,
    firstName: "Priya",
    lastName: "Verma",
    email: "priya.verma@example.com",
    department: "hr",
    role: "Manager",
  },
  {
    id: 3,
    firstName: "Ravi",
    lastName: "Kumar",
    email: "ravi.kumar@example.com",
    department: "finance",
    role: "Analyst",
  },
  {
    id: 4,
    firstName: "Simran",
    lastName: "Kapoor",
    email: "simran.kapoor@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 5,
    firstName: "Ankit",
    lastName: "Joshi",
    email: "ankit.joshi@example.com",
    department: "hr",
    role: "Manager",
  },
  {
    id: 6,
    firstName: "Nidhi",
    lastName: "Singh",
    email: "nidhi.singh@example.com",
    department: "finance",
    role: "Analyst",
  },
  {
    id: 7,
    firstName: "Rahul",
    lastName: "Mehra",
    email: "rahul.mehra@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 8,
    firstName: "Kavya",
    lastName: "Nair",
    email: "kavya.nair@example.com",
    department: "hr",
    role: "Manager",
  },
  {
    id: 9,
    firstName: "Varun",
    lastName: "Patel",
    email: "varun.patel@example.com",
    department: "finance",
    role: "Analyst",
  },
  {
    id: 10,
    firstName: "Meena",
    lastName: "Yadav",
    email: "meena.yadav@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 1,
    firstName: "Aman",
    lastName: "Sharma",
    email: "aman.sharma@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 2,
    firstName: "Priya",
    lastName: "Verma",
    email: "priya.verma@example.com",
    department: "hr",
    role: "Manager",
  },
  {
    id: 3,
    firstName: "Ravi",
    lastName: "Kumar",
    email: "ravi.kumar@example.com",
    department: "finance",
    role: "Analyst",
  },
  {
    id: 4,
    firstName: "Simran",
    lastName: "Kapoor",
    email: "simran.kapoor@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 5,
    firstName: "Ankit",
    lastName: "Joshi",
    email: "ankit.joshi@example.com",
    department: "hr",
    role: "Manager",
  },
  {
    id: 6,
    firstName: "Nidhi",
    lastName: "Singh",
    email: "nidhi.singh@example.com",
    department: "finance",
    role: "Analyst",
  },
  {
    id: 7,
    firstName: "Rahul",
    lastName: "Mehra",
    email: "rahul.mehra@example.com",
    department: "it",
    role: "Developer",
  },
  {
    id: 8,
    firstName: "Kavya",
    lastName: "Nair",
    email: "kavya.nair@example.com",
    department: "hr",
    role: "Manager",
  },
  {
    id: 9,
    firstName: "Varun",
    lastName: "Patel",
    email: "varun.patel@example.com",
    department: "finance",
    role: "Analyst",
  },
  {
    id: 10,
    firstName: "Meena",
    lastName: "Yadav",
    email: "meena.yadav@example.com",
    department: "it",
    role: "Developer",
  },
];

let isEditing = false;
let editingId = null;
let itemsPerPage = 10;
let currentPage = 1;

paginationSelect.addEventListener("change", () => {
  itemsPerPage = parseInt(paginationSelect.value);
  currentPage = 1;
  renderPaginatedEmployees();
});

addemployeebtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  if (
    !firstName ||
    !lastName ||
    !email ||
    department === "all" ||
    role === "all"
  ) {
    alert("Please fill out all fields correctly.");
    return;
  }

  if (isEditing) {
    // Find and update employee
    const index = employeesList.findIndex((emp) => emp.id === editingId);
    if (index !== -1) {
      employeesList[index] = {
        id: editingId,
        firstName,
        lastName,
        email,
        department,
        role,
      };
      renderAllEmployees(); // re-render all cards
    }
    isEditing = false;
    editingId = null;
  } else {
    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      department,
      role,
    };
    employeesList.push(newEmployee);
    renderEmployeeCard(newEmployee);
  }

  form.reset();
  modal.style.display = "none";
});

function renderEmployeeCard(employee) {
  const card = document.createElement("div");
  card.className = "employee-card";

  card.innerHTML = `
    <h3>${employee.firstName} ${employee.lastName}</h3>
    <p><strong>Email:</strong> ${employee.email}</p>
    <p><strong>Department:</strong> ${employee.department}</p>
    <p><strong>Role:</strong> ${employee.role}</p>
    <div class="employee-buttons"><button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button></div>
    
  `;

  // Attach button events
  card.querySelector(".delete-btn").addEventListener("click", () => {
    employeesList = employeesList.filter((emp) => emp.id !== employee.id);
    renderAllEmployees();
  });

  card.querySelector(".edit-btn").addEventListener("click", () => {
    // Open modal with data pre-filled
    document.getElementById("firstName").value = employee.firstName;
    document.getElementById("lastName").value = employee.lastName;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("role").value = employee.role;

    isEditing = true;
    editingId = employee.id;
    modal.style.display = "block";
  });

  cardContainer.appendChild(card);
}

function renderAllEmployees() {
  renderPaginatedEmployees();
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filtered = employeesList.filter((emp) =>
    emp.firstName.toLowerCase().includes(searchTerm)
  );
  renderFilteredEmployees(filtered);
});

function renderFilteredEmployees(filteredList) {
  cardContainer.innerHTML = "";
  filteredList.forEach(renderEmployeeCard);
}

sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  let sorted = [...employeesList];

  if (value === "name") {
    sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (value === "department") {
    sorted.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderFilteredEmployees(sorted);
});

function renderPaginatedEmployees() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = employeesList.slice(start, end);

  cardContainer.innerHTML = "";
  paginated.forEach(renderEmployeeCard);

  renderPaginationControls();
}

function renderPaginationControls() {
  let totalPages = Math.ceil(employeesList.length / itemsPerPage);
  let paginationDiv = document.getElementById("pagination-controls");

  if (!paginationDiv) {
    paginationDiv = document.createElement("div");
    paginationDiv.id = "pagination-controls";
    cardContainer.after(paginationDiv);
  }

  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active-page" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPaginatedEmployees();
    });
    paginationDiv.appendChild(btn);
  }
}

renderAllEmployees();
