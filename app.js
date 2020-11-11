const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { choices } = require("yargs");


//Empty array, employees are to be added to it as their info is added
const employeeList = [];

//All questions
const employeeQs = [
    {
        type: 'list',
        name: 'role',
        message: 'Choose your role: ',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
    type: 'input',
    name: 'name',
    message: 'What is your name?'
    },
    {
    type: 'input',
    name: 'id',
    message: 'What is your id?'
    },
    {
    type: 'input',
    name: 'email',
    message: 'What is your email?'
    },
    {
        when: answer => {
            return answer.role === 'Manager'
        },
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?'
    },
    {
        when: answer => {
            return answer.role === 'Engineer'
        },
        type: 'input',
        name: 'github',
        message: 'What is your gitHub account?'
    },
    {
        when: answer => {
            return answer.role === 'Intern'
        },
        type: 'input',
        name: 'school',
        message: 'What school do you attend?'
    },
    {
    type: 'list',
    name: 'addPerson',
    message: 'Would you like to add someone else?',
    choices: ['Yes', 'No']
    }

]

//Call create team after employeeQs is initialized
createTeam();

//Call writeToFile when answer.addPerson === No
function createTeam(){
    inquirer.prompt(employeeQs)

    .then(function(answer){
        createObject(answer);

        if(answer.addPerson === 'Yes'){
            createTeam();
        }
        else{
            let renderVar = render(employeeList);
            console.log('Inside create team, after renderVar');
            writeToFile('employeeFile.html', renderVar);
        }

    })

}

function createObject(answer){
    if(answer.role === 'Manager'){
        var newPerson = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        employeeList.push(newPerson);
    }
    else if(answer.role === 'Engineer'){
        var newPerson = new Engineer(answer.name, answer.id, answer.email, answer.github);
        employeeList.push(newPerson);
    }
    else if(answer.role === 'Intern'){
        var newPerson = new Intern(answer.name, answer.id, answer.email, answer.school);
        employeeList.push(newPerson);
    }
    console.log(employeeList);

    return;
}

function writeToFile(fileName, data) {
    console.log('in writefile');
      fs.writeFile(fileName, data, function(err) {
          if(err){
            return console.log('There was an error when trying to write the file.');
          }
          console.log('File successfully written.');
      } )
}





