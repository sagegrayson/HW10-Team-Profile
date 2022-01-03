// DEPENDENCIES ===========================================

const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");

// VARS ===================================================

const employees = [];

const top = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Team Profile</title>
        </head>
        <body>
            <header>My Team</header>`;

const fin = `
		</body>
	</html>`;

// FUNCTIONS ==============================================

// generation ---------------------------------------------

function topHTML() {
	fs.writeFile("./dist/output.html", top, function (err) {
		if (err) {
			console.log(err);
		}
	});
	midHTML(employees);
}

function midHTML(employees) {
	for (let i = 0; i < employees.length; i++) {
		const employee = employees[i];

		let role = employee.getRole();
		let id = employee.getId();
		let name = employee.getName();
		let email = employee.getEmail();

		let toAppend = ``;

		switch (role) {
			case "Manager":
				let office = employee.getOfficeNumber();
				toAppend = `
				<div>
					<h1>${name}</h1>
					<h3>Manager</h3>
					<ul>
						<li>ID: ${id}</li>
						<li>
							Email:
							<a href="mailto:${email}">${email}</a>
						</li>
						<li>Office Number: ${office}</li>
					</ul>
				</div>
				`;
				break;

			case "Engineer":
				let github = employee.getGitHub();
				toAppend = `
				<div>
					<h1>${name}</h1>
					<h3>Engineer</h3>
					<ul>
						<li>ID: ${id}</li>
						<li>
							Email:
							<a href="mailto:${email}">${email}</a>					</li>
						<li>
							Github:
							<a href="http://www.github.com/${github}">${github}</a>
						</li>
					</ul>
				</div>
				`;
				break;

			case "Intern":
				let school = employee.getSchool();
				toAppend = `
				<div>
					<h1>${name}</h1>
					<h3>Intern</h3>
					<ul>
						<li>ID: ${id}</li>
						<li>
							Email:
							<a href="mailto:${email}">${email}</a>					</li>
						</li>
						<li>School: ${school}</li>
					</ul>
				</div>
				`;
				break;

			default:
				break;
		}

		fs.appendFile("./dist/output.html", toAppend, function (err) {
			if (err) {
				console.log(err);
			}
		});
	}
	finHTML();
}

function finHTML() {
	fs.appendFile("./dist/output.html", fin, function (err) {
		if (err) {
			console.log(err);
		}
	});
}

// Inquirer ----------------------------------------------
function getInfo() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Employee ID?",
				name: "empID",
			},
			{
				type: "input",
				message: "Employee Name?",
				name: "empName",
			},
			{
				type: "input",
				message: "Employee Email?",
				name: "empEmail",
			},
			{
				type: "list",
				message: "Employee Role?",
				choices: ["Manager", "Engineer", "Intern"],
				name: "empRole",
			},
		])
		.then((answer) => {
			let promptMessage;
			switch (answer.empRole) {
				case "Manager":
					promptMessage = "Office number";
					break;

				case "Engineer":
					promptMessage = "github username";
					break;

				case "Intern":
					promptMessage = "school";
					break;

				default:
					console.log("how did you even do that?");
			}

			inquirer
				.prompt([
					{
						type: "input",
						message: `What is ${answer.empName}'s ${promptMessage}?`,
						name: "empInfo",
					},
					{
						type: "confirm",
						message: "Is there another employee?",
						name: "return",
					},
				])
				.then((response) => {
					let empToAdd;
					switch (answer.empRole) {
						case "Manager":
							empToAdd = new Manager(
								answer.empID,
								answer.empName,
								answer.empEmail,
								response.empInfo
							);
							employees.push(empToAdd);
							break;

						case "Engineer":
							empToAdd = new Engineer(
								answer.empID,
								answer.empName,
								answer.empEmail,
								response.empInfo
							);
							employees.push(empToAdd);
							break;

						case "Intern":
							empToAdd = new Intern(
								answer.empID,
								answer.empName,
								answer.empEmail,
								response.empInfo
							);
							employees.push(empToAdd);
							break;

						default:
							console.log("you did that again?");
					}

					if (response.return) {
						getInfo();
					} else {
						// console.log(employees);
						topHTML();
					}
				});
		});
}

// INITIAL ================================================
getInfo();
