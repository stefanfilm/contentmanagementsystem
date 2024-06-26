const inquirer = require("inquirer")
const db = require("./db/db.js")
function main () {
    console.log("Hello")
    inquirer.prompt(questions).then(res => {
        console.log(res)
        switch (res.Action){
            case "viewEmployees":
                viewEmployees()
                break;
            case "addEmployee":
                addEmployee()
                break;
            case "updateEmployeeRole":
                updateEmployeeRole()
                break;
            case "viewAllRoles":
                viewAllRoles()
                break;
            case "addRole":
                addRole()
                break;
            case "viewAllDepartments":
                viewAllDepartments()
                break;
            case "addDepartment":
                addDepartment()
                break;
            case "quit":
                quit()
                break;
                default: console.log("something went wrong")
                
        }
    });
}

function viewEmployees() {
    db.findAllEmployees().then((after) => {
        console.log(after.rows)
    }).then(() => {
        main()
    })
}

function addEmployee() {
    const newEmployeeQuestions = [{name:"role_id",message: "What is the role_id?"}, {name: "first_name", message: "What is the first_name?"}, {name: "last_name", message: "What is the last_name?"}, {name: "manager_id", message: "What is the manager_id?"}]
    inquirer.prompt(newEmployeeQuestions).then((employee) => {
        employee.manager_id= employee.manager_id.length > 0 ? employee.manager_id : null
        db.createEmployee(employee).then((after) => {
            console.log(after.rows)
        }).then(() => {
            main()
        })
    })

   
}
function updateEmployeeRole() {
    const updateEmployeeQuestions = [{name:"id",message: "What is the employee_id to update?"}, {name: "role_id", message: "What is the new role?"}]
    inquirer.prompt(updateEmployeeQuestions).then((employee) => {
        db.updateEmployeeRole(employee).then((after) => {
            console.log(after.rows)
        }).then(() => {
            main()
        })
    })
}

function viewAllRoles() {
    db.findAllRoles().then((after) => {
        console.log(after.rows)
    }).then(() => {
        main()
    })
}

function addRole() {
    const newRoleQuestions = [{name:"title",message: "What is the title?"}, {name: "salary", message: "What is the salary?"}, {name: "department_id", message: "What is the department_id?"}]
    inquirer.prompt(newRoleQuestions).then((employee) => {
        db.addRole(employee).then((after) => {
            console.log(after.rows)
        }).then(() => {
            main()
        })
    })
}

function viewAllDepartments() {
    db.findAllDepartments().then((after) => {
        console.log(after.rows)
    }).then(() => {
        main()
    })
}

function addDepartment() {
    const newDepartmentQuestions = [{name:"name",message: "What is the name?"}]
    inquirer.prompt(newDepartmentQuestions).then((employee) => {
        db.addDepartment(employee).then((after) => {
            console.log(after.rows)
        }).then(() => {
            main()
        })
    })
}

function quit() {
process.exit()
}

const questions = [{
    type: "list",
    name: "Action",
    message: "What would you like to do?",
    choices: [{
        name: "View all employees",
        value: "viewEmployees",
    }, {
        name: "Add Employee",
        value: "addEmployee"
    }, {
        name: "Update Employee Role",
        value: "updateEmployeeRole"
    }, {
        name: "View All Roles",
        value: "viewAllRoles"
    }, {
        name: "Add Role",
        value: "addRole"
    }, {
        name: "View All Departments",
        value: "viewAllDepartments"
    }, {
        name: "Add Department",
        value: "addDepartment"
    }, {
        name: "Quit",
        value: "quit"
    }]
}]
main();