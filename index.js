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
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
			crossorigin="anonymous"
		/>
	</head>
	<body class="bg-light">
		<nav class="navbar navbar-dark bg-dark">
			<div class="container-fluid">
				<span class="navbar-brand mb-0 h1">My Team</span>
			</div>
		</nav>
		<main class="album py-5">
			<div class="container">
				<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				`;
const fin = `
				</div>
			</div>
		</main>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
			crossorigin="anonymous"
		></script>
	</body>
</html>
`;

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
				<div class="col">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">${name}</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								Manager
							</h6>
							<p class="card-text">
							[Placeholder About Text]
							</p>
						</div>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">ID: ${id}</li>
							<li class="list-group-item">
								Office Number: ${office}
							</li>
							<li class="list-group-item">
							<a href="mailto:${email}">${email}</a>
							</li>
						</ul>
					</div>
				</div>
				`;
				break;

			case "Engineer":
				let github = employee.getGitHub();
				toAppend = `
				<div class="col">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">${name}</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								Engineer
							</h6>
							<p class="card-text">
							[Placeholder About Text]
							</p>
						</div>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">ID: ${id}</li>
							<li class="list-group-item">
								Github:
								<a href="http://www.github.com/${github}">${github}</a>
							</li>
							<li class="list-group-item">
								<a href="mailto:${email}">${email}</a>
							</li>
						</ul>
					</div>
				</div>
				`;
				break;

			case "Intern":
				let school = employee.getSchool();
				toAppend = `
				<div class="col">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">${name}</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								Intern
							</h6>
							<p class="card-text">
							[Placeholder About Text]
							</p>
						</div>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">ID: ${id}</li>
							<li class="list-group-item">School: ${school}</li>
							<li class="list-group-item">
								<a href="mailto:${email}">${email}</a>
							</li>
						</ul>
					</div>
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
