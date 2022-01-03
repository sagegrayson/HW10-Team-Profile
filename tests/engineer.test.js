const test = require("jest");
const Engineer = require("../lib/engineer");

describe("Engineer", () => {
	it("Generated Object Has Github", () => {
		const github = "sagegrayson";
		const employee = new Engineer(
			"01",
			"Sage",
			"email@email.com",
			"sagegrayson"
		);
		expect(employee.github).toBe(github);
	});
});

describe("getGithub", () => {
	it("returns github from getGithub function", () => {
		const github = "sagegrayson";
		const employee = new Engineer(
			"01",
			"Sage",
			"email@email.com",
			"sagegrayson"
		);
		expect(employee.getGitHub()).toBe(github);
	});
});

describe("getRole", () => {
	it("returns role from getRole function", () => {
		const role = "Engineer";
		const employee = new Engineer(
			"01",
			"Sage",
			"email@email.com",
			"sagegrayson"
		);
		expect(employee.getRole()).toBe(role);
	});
});
