const fs = require('fs')
const inquirer = require('inquirer')

const generate = require('./utils/generateMarkdown.js').generateMarkdown
const licenses = require('./utils/licenses.js')

const questions = [
    {
        name: 'title',
        type: 'input',
        message: 'What is the title of your project?\n'
    },
    {
        name: 'what',
        type: 'input',
        message: 'In its most basic form, what does this application do? \nUse complete sentences.\n'
    },
    {
        name: 'why',
        type: 'input',
        message: 'What was your motivation for this project? What issues does it solve? \nUse complete sentences.\n'
    },
    {
        name: 'how',
        type: 'input',
        message: 'Briefly describe what technologies and techniques you used to create this application. \nUse complete sentences.\n'
    },
    {
        name: 'installation',
        type: 'input',
        message: 'List out the steps of installation for your application separating each step with a semicolon.\n'
    },
    {
        name: 'usage',
        type: 'input',
        message: 'Enter the steps required to use the application separating each with a semicolon. \n'
    },
    {
        name: 'contributors',
        type: 'input',
        message: 'Enter each Contributor and Contributor\'s GitHub username separated by a colon. Separate individual users by semicolons. \nExample: (Contributor Name: ContributorUsername; Contributor Name 2: ContributorUsername2)\n'
    },
    {
        name: 'tests',
        type: 'input',
        message: `Enter individual tests separating each with a semicolon. If you don't want to run any tests, hit Enter. \n`
    },
    {
        name: 'GitHub',
        type: 'input',
        message: 'Enter your GitHub username:\n'
    },
    {
        name: 'email',
        type: 'input',
        message: 'Enter your email:\n'
    },
    {
        name: 'license',
        type: 'input',
        message: 'Choose your license! Enter either MIT or GPL\n'
    },
]

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, { encoding: 'utf8' }, function (err) {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`Success! File was written to ${fileName}`)
        }
    })
};

async function init() {
    const answers = await inquirer.prompt(questions)

    answers.what = answers.what.trim();
    answers.why = answers.why.trim();
    answers.how = answers.how.trim();
    answers.installation = answers.installation.trim();
    answers.usage = answers.usage.trim();
    answers.contributors = answers.contributors.trim();
    answers.tests = answers.tests.trim();
    answers.GitHub = answers.GitHub.trim();


    if (answers.what.slice(answers.what.length - 1) !== '.' && answers.what !== '') answers.what = answers.what + '.'
    if (answers.why.slice(answers.why.length - 1) !== '.' && answers.why !== '') answers.why = answers.why + '.'
    if (answers.how.slice(answers.how.length - 1) !== '.' && answers.how !== '') answers.how = answers.how + '.'

    if (answers.installation.slice(answers.installation.length - 1) === ';') {
        answers.installation = answers.installation.slice(0, -1)
    }
    if (answers.usage.slice(answers.usage.length - 1) === ';') {
        answers.usage = answers.usage.slice(0, -1)
    }
    if (answers.contributors.slice(answers.contributors.length - 1) === ';') {
        answers.contributors = answers.contributors.slice(0, -1)
    }
    if (answers.tests.slice(answers.tests.length - 1) === ';') {
        answers.tests = answers.tests.slice(0, -1)
    }

    answers.installation = `1. ${answers.installation.replace(/;/g, '\n1. ')}`
    answers.usage = `1. ${answers.usage.replace(/;/g, '\n1. ')}`
    if (answers.tests !== '') answers.tests = `* ${answers.tests.replace(/;/g, '\n* ')}`

    let names = []
    let usernames = []
    answers.contributors = answers.contributors.split(';')
    answers.contributors.forEach((value, index) => {
        answers.contributors[index] = value.split(':')
        let oldIndex = index
        answers.contributors[index].forEach((value, index) => {
            answers.contributors[oldIndex][index] = value.trim()
        })
        names.push(answers.contributors[index][0])
        usernames.push(answers.contributors[index][1])
    })
    answers.contributors = []
    names.forEach((value, index) => {
        names[index] = `* [${value}]`
        usernames[index] = `(https://github.com/${usernames[index]})\n`
        answers.contributors.push(names[index], usernames[index])
    })
    answers.contributors = answers.contributors.join('')

    answers.GitHub = `[GitHub](https://github.com/${answers.GitHub})`

    if (answers.license === 'MIT') {
        answers.license = licenses.MIT
    } else if (answers.license === 'GPL') {
        answers.license = licenses.GPL
    }

    writeToFile('./generated-READMEs/README.md', generate(answers))
};

init();