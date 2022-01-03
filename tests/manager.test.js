const test = require("jest");
const Manager = require("../lib/manager");

describe("Manager", () => {
	it("Generated Object Has Office", () => {
		const office = "05";
		const employee = new Manager(
			"01",
			"Sage",
			"email@email.com",
			"05"
		);
		expect(employee.officeNumber).toBe(office);
	});
});

describe("getOfficeNumber", () => {
	it("returns school from getOfficeNumber function", () => {
		const office = "05";
		const employee = new Manager(
			"01",
			"Sage",
			"email@email.com",
			"05"
		);
		expect(employee.getOfficeNumber()).toBe(office);
	});
});

describe("getRole", () => {
	it("returns role from getRole function", () => {
		const role = "Manager";
		const employee = new Manager(
			"01",
			"Sage",
			"email@email.com",
			"05"
		);
		expect(employee.getRole()).toBe(role);
	});
});
