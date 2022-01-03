// DEPENDENCIES ===========================================

const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const { Console } = require("console");

// VARS ===================================================

const employees = [];

const topHTML = `
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

const bottomHTML = `
		</body>
	</html>`;

// FUNCTIONS ==============================================

function generate(employees) {
	// Top HTML
	fs.writeFile("./dist/output.html", topHTML, function (err) {
		if (err) {
			console.log(err);
		}
	});

	

	fs.appendFile("./dist/output.html", bottomHTML, function (err) {
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
					employees.push({
						id: answer.empID,
						name: answer.empName,
						email: answer.empEmail,
						role: answer.empRole,
						info: response.empInfo,
					});

					if (response.return) {
						generate();
					} else {
						console.log(employees);
						generate(employees);
					}
				});
		});
}

// INITIAL ================================================
getInfo();
