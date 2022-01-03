const test = require("jest");
const Intern = require("../lib/intern");

describe("Intern", () => {
	it("Generated Object Has School", () => {
		const school = "columbia";
		const employee = new Intern(
			"01",
			"Sage",
			"email@email.com",
			"columbia"
		);
		expect(employee.school).toBe(school);
	});
});

describe("getSchool", () => {
	it("returns school from getSchool function", () => {
		const school = "columbia";
		const employee = new Intern(
			"01",
			"Sage",
			"email@email.com",
			"columbia"
		);
		expect(employee.getSchool()).toBe(school);
	});
});

describe("getRole", () => {
	it("returns role from getRole function", () => {
		const role = "Intern";
		const employee = new Intern(
			"01",
			"Sage",
			"email@email.com",
			"columbia"
		);
		expect(employee.getRole()).toBe(role);
	});
});
