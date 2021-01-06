const fs = require('fs');
const { prompt } = require('inquirer');

const generate = require('./utils/generateMarkdown.js').generateMarkdown;
const getList = require('./utils/getList');
const { descriptionQuestions, infoQuestions } = require('./utils/questions');
const licenses = require('./utils/licenses.js');


function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, { encoding: 'utf8', recursive: true }, function (err) {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`Success! File was written to ${fileName}`)
        }
    })
};

async function init() {
    if (!fs.existsSync('./generated-files')) {
        fs.mkdir('./generated-files', (err) => { if (err) throw err })
    }

    const answers = await prompt(descriptionQuestions)

    Object.keys(answers).slice(1).forEach(key => {
        const value = answers[key]
        if ((value !== '') && (value[value.length - 1] !== '.')) answers[key] += '.'
    })

    answers.installation = await getList({ message: "List out the steps of installation for your application:" });
    answers.usage = await getList({ message: "Enter the steps required to use the application:" });
    answers.contributors = await getList({
        message: `Enter each Contributor and Contributor's GitHub username separated by a colon.`,
        valid: {
            regEx: /([\w *]+ *: *\w+ *)/,
            example: "Nicholas Konzen: NTKonzen"
        }
    });
    answers.tests = await getList({ message: "List out the different tests for your application. If you don't want to include any tests, hit Enter." })

    const infoAnswers = await prompt(infoQuestions);
    Object.keys(infoAnswers).forEach(key => {
        answers[key] = infoAnswers[key]
    })

    Object.keys(answers).forEach(key => {
        const value = answers[key]
        if (typeof value === "string") {
            answers[key] = value.trim()
        } else if (Array.isArray(value) && key !== 'contributors') {
            let parsedList = '';
            let num = 0;
            value.forEach((listItem, index) => {
                num++;
                index === 0 ? parsedList += `${num}. ${listItem}` : parsedList += `\n${num}. ${listItem}`
            })
            answers[key] = parsedList
        } else if (key === 'contributors') {
            let parsedContributors = '';
            value.forEach((contributorString, index) => {
                const username = contributorString.split(":")[1]
                    .trim()
                let link = username.replace(new RegExp(username), `(https://github.com/${username})`);
                const name = contributorString.split(':')[0].trim();
                index === 0 ? parsedContributors += `* [${name}]${link}` : parsedContributors += `\n* [${name}]${link}`
            })
            answers[key] = parsedContributors
        }
    })

    answers.GitHub = `[GitHub](https://github.com/${answers.username})`

    if (answers.license === 'MIT') {
        answers.license = licenses.MIT
        answers.name = await prompt({
            name: 'name',
            type: 'input',
            message: 'Enter your full name:',
            validate: function (input) {
                return new Promise((res, rej) => {
                    input = input.trim()
                    if (!input || input == '') rej('Your full name is required!')
                    else res(true)
                });
            }
        });
        answers.name = answers.name.name
        answers.year = await prompt({
            name: 'year',
            type: 'input',
            message: 'Enter the current year in the format YYYY:',
            validate: function (input) {
                return new Promise((res, rej) => {
                    input = input.trim()
                    parsedInput = parseInt(input)

                    if (!input || input == '') rej('The current year is required!')
                    else if (isNaN(parsedInput)) rej('The entered year must be a number!')
                    else if (input.length !== 4) rej('When entering the year, please follow the format YYYY')
                    else res(true)
                });
            }
        });
        answers.year = answers.year.year
        answers.license = licenses.MIT
        answers.license = answers.license.replace('[year]', answers.year)
        answers.license = answers.license.replace('[fullname]', answers.name)
        answers.badge = `[![GitHub](https://img.shields.io/github/license/${answers.username}/${answers.repo})](#license)`
        let licenseMIT = licenses.MIT.replace('[year]', answers.year).replace('[fullname]', answers.name)
        writeToFile('./generated-files/LICENSE', licenseMIT)
    } else if (answers.license === 'GPL') {
        answers.license = licenses.GPL
        answers.badge = '[![GitHub](https://img.shields.io/github/license/NTKonzen/README-Generator)](#license)'
        writeToFile('./generated-files/LICENSE', licenses.GPL)
    }

    writeToFile('./generated-files/README.md', generate(answers))
};

init();