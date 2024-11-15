// script.js

let selectedEmployeeId = null;

// Sample data for demo purpose (In real scenario, this data will come from the server)

const employeeData = [
    { EmployeeID: 1, EmployeeName: 'John Doe', Department: 'IT', Sex: 'Male', MaritalStatus: 'Single', Salary: 50000, Address: '123 Main St' },
    { EmployeeID: 2, EmployeeName: 'Jane Smith', Department: 'HR', Sex: 'Female', MaritalStatus: 'Married', Salary: 60000, Address: '456 Oak St' }
];

// Function to load employee data into the table
function loadEmployeeData() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = ''; // Clear existing data

    employeeData.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.EmployeeID}</td>
            <td>${emp.EmployeeName}</td>
            <td>${emp.Department}</td>
            <td>${emp.Sex}</td>
            <td>${emp.MaritalStatus}</td>
            <td>${emp.Salary}</td>
            <td>${emp.Address}</td>
            <td>
                <button onclick="editEmployee(${emp.EmployeeID})">Edit</button>
                <button onclick="deleteEmployee(${emp.EmployeeID})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to populate form with employee data for editing
function editEmployee(employeeID) {
    const employee = employeeData.find(emp => emp.EmployeeID === employeeID);
    if (employee) {
        document.getElementById('formTitle').textContent = 'Edit Employee';
        document.getElementById('employeeId').value = employee.EmployeeID;
        document.getElementById('employeeName').value = employee.EmployeeName;
        document.getElementById('department').value = employee.Department;
        document.querySelector(`input[name="sex"][value="${employee.Sex}"]`).checked = true;
        document.getElementById('maritalStatus').value = employee.MaritalStatus;
        document.getElementById('salary').value = employee.Salary;
        document.getElementById('address').value = employee.Address;

        document.getElementById('submitBtn').textContent = 'Update'; // Change button text
        selectedEmployeeId = employeeID;
    }
}

// Function to delete an employee
function deleteEmployee(employeeID) {
    const index = employeeData.findIndex(emp => emp.EmployeeID === employeeID);
    if (index !== -1) {
        employeeData.splice(index, 1);
        loadEmployeeData(); // Reload the table after deletion
    }
}

// Handle form submission (add or update employee)
document.getElementById('employeeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const employeeName = document.getElementById('employeeName').value;
    const department = document.getElementById('department').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const salary = document.getElementById('salary').value;
    const address = document.getElementById('address').value;

    if (selectedEmployeeId) {
        // Update existing employee
        const employee = employeeData.find(emp => emp.EmployeeID === selectedEmployeeId);
        employee.EmployeeName = employeeName;
        employee.Department = department;
        employee.Sex = sex;
        employee.MaritalStatus = maritalStatus;
        employee.Salary = salary;
        employee.Address = address;
        selectedEmployeeId = null;
    } else {
        // Add new employee
        const newEmployee = {
            EmployeeID: employeeData.length + 1,
            EmployeeName: employeeName,
            Department: department,
            Sex: sex,
            MaritalStatus: maritalStatus,
            Salary: salary,
            Address: address
        };
        employeeData.push(newEmployee);
    }

    // Reset form and reload data
    document.getElementById('employeeForm').reset();
    document.getElementById('submitBtn').textContent = 'Submit';
    loadEmployeeData();
});

// Load the initial employee data
loadEmployeeData();