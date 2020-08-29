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

    if (answers.what.slice(answers.what.length - 1) !== '.' && answers.what !== '') answers.what = answers.what + '.'

    writeToFile('./generated-READMEs/README.md', generate(answers))
};

init();