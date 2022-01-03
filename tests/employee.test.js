const test = require("jest");
const Employee = require("../lib/employee");

describe("Employee", () => {
	it("Generate Employee", () => {
		const employee = new Employee();
		expect(typeof employee).toBe("object");
	});

	it("Generated Object Has ID", () => {
		const id = "01";
		const employee = new Employee("01", "Sage", "email@email.com");
		expect(employee.id).toBe(id);
	});

	it("Generated Object Has Name", () => {
		const name = "Sage";
		const employee = new Employee("01", "Sage", "email@email.com");
		expect(employee.name).toBe(name);
	});

	it("Generated Object Has Email", () => {
		const email = "email@email.com";
		const employee = new Employee("01", "Sage", "email@email.com");
		expect(employee.email).toBe(email);
	});

	describe("getId", () => {
		it("returns id from getId function", () => {
			const id = "01";
			const employee = new Employee("01", "Sage", "email@email.com");
			expect(employee.getId()).toBe(id);
		});
	});

	describe("getName", () => {
		it("returns name from getName function", () => {
			const name = "Sage";
			const employee = new Employee("01", "Sage", "email@email.com");
			expect(employee.getName()).toBe(name);
		});
	});

	describe("getEmail", () => {
		it("returns email from getEmail function", () => {
			const email = "email@email.com";
			const employee = new Employee("01", "Sage", "email@email.com");
			expect(employee.getEmail()).toBe(email);
		});
	});

	describe("getRole", () => {
		it("returns role from getRole function", () => {
			const role = "Employee";
			const employee = new Employee("01", "Sage", "email@email.com");
			expect(employee.getRole()).toBe(role);
		});
	});
});
