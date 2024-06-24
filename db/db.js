const pool = require("./connection.js");
class Database {
    constructor () {}
    async query(sql, params = []) {
        const client = await pool.connect()
        try {
            const result = await client.query(sql, params) 
            return result
        }
        finally {
            client.release()
        }
    }
    findAllEmployees() {
        return this.query("select * from employee")
    }

    createEmployee(employee) {
        const {role_id, first_name, last_name, manager_id} = employee

        return this.query ("insert into employee(first_name, last_name, role_id, manager_id) values ($1, $2, $3, $4)",[first_name, last_name, role_id, manager_id])
    }

    updateEmployeeRole(employee) {
        const {id, role_id} = employee

        return this.query ("update employee SET role_id = $1 WHERE id=$2",[role_id, id])
    }

    findAllRoles() {
        return this.query("select * from employee")
    }

    addRole(employee) {
        const {title, salary, department_id} = employee
        return this.query ("insert into role(title, salary, department_id) values ($1, $2, $3)",[title, salary, department_id])
    }
 
    findAllDepartments () {
        return this.query("select * from employee")
    }

    addDepartment (employee) {
        const {name} = employee
        return this.query ("insert into department(name) values ($1)",[name])
    }
}

// update table name set value column = $1 etc

module.exports = new Database()