class Employee {
	constructor(id, name, email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	getName() {
		return this.name;
	}

	getId() {
		return this.email;
	}

	getEmail() {
		return this.email;
	}

	getRole() {
		return "Employee";
	}
}

module.exports = Employee;
