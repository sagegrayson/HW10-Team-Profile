const Employee = require("./employee.js");

class Engineer extends Employee {
	constructor(name, id, email, github) {
		super(name, id, email);
		this.github = github;
	}

	getGitHub() {
		return this.gitHub;
	}

	getRole() {
		return "Engineer";
	}
}

module.exports = Engineer;
