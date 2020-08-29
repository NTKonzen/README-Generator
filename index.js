const fs = require('fs')
const inquirer = require('inquirer')

const generate = require('./utils/generateMarkdown.js').generateMarkdown

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

    answers.what = answers.what.trim()
    answers.why = answers.why.trim()
    answers.how = answers.how.trim()
    answers.installation = answers.installation.trim()
    answers.usage = answers.usage.trim()


    if (answers.what.slice(answers.what.length - 1) !== '.' && answers.what !== '') answers.what = answers.what + '.'
    if (answers.why.slice(answers.why.length - 1) !== '.' && answers.why !== '') answers.why = answers.why + '.'
    if (answers.how.slice(answers.how.length - 1) !== '.' && answers.how !== '') answers.how = answers.how + '.'

    if (answers.installation.slice(answers.installation.length - 1) === ';') {
        answers.installation = answers.installation.slice(0, -1)
    }
    if (answers.usage.slice(answers.usage.length - 1) === ';') {
        answers.usage = answers.usage.slice(0, -1)
    }

    answers.installation = `1. ${answers.installation.replace(/;/g, '\n1. ')}`
    answers.usage = `1. ${answers.usage.replace(/;/g, '\n1. ')}`

    writeToFile('./generated-READMEs/README.md', generate(answers))
};

init();