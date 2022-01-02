// DEPENDENCIES ===========================================

const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");

// VARS ===================================================

const employees = [];

// FUNCTIONS ==============================================

function topHTML() {
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

	fs.writeFile("./dist/output.html", topHTML, function (err) {
		if (err) {
			console.log(err);
		}
	});
}

function bottomHTML() {
	const bottomHTML = `
    	</body>
    </html>
    `;
	fs.appendFile("./dist/output.html", bottomHTML, function (err) {
		if (err) {
			console.log(err);
		}
	});
}

// Inquirer ----------------------------------------------
function generate() {
	inquirer.prompt([
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
	]);
}

// INITIAL ================================================
generate();
