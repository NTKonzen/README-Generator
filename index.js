const fs = require('fs')
const inquirer = require('inquirer')

const generate = require('./utils/generateMarkdown.js').generateMarkdown

const questions = [
    {
        name: 'title',
        type: 'input',
        message: 'What is the title of your project?'
    },
    {
        name: 'what',
        type: 'input',
        message: 'In its most basic form, what does this application do?\n'
    },
    {
        name: 'why',
        type: 'input',
        message: 'What was your motivation for this project? What issues does it solve? \n'
    },
    {
        name: 'how',
        type: 'input',
        message: 'Briefly describe what technologies and techniques you used to create this application. \n'
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

    if (answers.what.slice(answers.what.length - 1) !== '.' && answers.what !== '') answers.what = answers.what + '.'
    if (answers.why.slice(answers.why.length - 1) !== '.' && answers.why !== '') answers.why = answers.why + '.'
    if (answers.how.slice(answers.how.length - 1) !== '.' && answers.how !== '') answers.how = answers.how + '.'

    writeToFile('./generated-READMEs/README.md', generate(answers))
};

init();