const fs = require('fs')
const { prompt } = require('inquirer')

const generate = require('./utils/generateMarkdown.js').generateMarkdown
const licenses = require('./utils/licenses.js')

const descriptionQuestions = [
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
        name: 'additional',
        type: 'input',
        message: 'Enter any additional description you want to add! \n'
    }
]

const infoQuestions = [
    {
        name: 'GitHub',
        type: 'input',
        message: 'Enter your GitHub username:\n'
    },
    {
        name: 'repo',
        type: 'input',
        message: 'Enter the name of the repository you\'re working in:\n'
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
    fs.writeFile(fileName, data, { encoding: 'utf8', recursive: true }, function (err) {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`Success! File was written to ${fileName}`)
        }
    })
};

async function getList({ message, valid: { regEx, example } = { regEx: undefined }, number, answers, }) {
    return new Promise(async (res, rej) => {
        if (message) console.log("\x1b[1m", message);
        if (!number) number = 1;
        if (!answers) answers = [];
        let valid = true;

        let { answer } = await prompt({
            message: number.toString() + ". ",
            type: "input",
            name: "answer"
        });
        answer = answer.trim();

        if (regEx && regEx.test(answer) === false && answer !== '') {
            valid = false;
        }

        if (!valid) {
            console.log("\x1b[1m", `That doesn't match the required format. Try entering something like this:\n ${example}`);
            const list = await getList({ valid: { regEx, example }, answers, number })
            res(list)
        } else if (!answer || answer === '') {
            res(answers)
            return answers
        } else {
            answers.push(answer)
            number++;
            const list = await getList({ valid: { regEx, example }, answers, number })
            res(list)
        }
    })
}

async function init() {
    if (!fs.existsSync('./generated-files')) {
        fs.mkdir('./generated-files', (err) => { if (err) throw err })
    }

    const answers = await prompt(descriptionQuestions)

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
            console.log("string")
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

    answers.GitHub = `[GitHub](https://github.com/${answers.GitHub})`

    console.log(answers)


    // if (answers.what.slice(answers.what.length - 1) !== '.' && answers.what !== '') answers.what = answers.what + '.'
    // if (answers.why.slice(answers.why.length - 1) !== '.' && answers.why !== '') answers.why = answers.why + '.'
    // if (answers.how.slice(answers.how.length - 1) !== '.' && answers.how !== '') answers.how = answers.how + '.'
    // if (answers.additional.slice(answers.additional.length - 1) !== '.' && answers.additional !== '') answers.additional = answers.how + '.'

    // if (answers.installation.slice(answers.installation.length - 1) === ';') {
    //     answers.installation = answers.installation.slice(0, -1)
    // }
    // if (answers.usage.slice(answers.usage.length - 1) === ';') {
    //     answers.usage = answers.usage.slice(0, -1)
    // }
    // if (answers.contributors.slice(answers.contributors.length - 1) === ';') {
    //     answers.contributors = answers.contributors.slice(0, -1)
    // }
    // if (answers.tests.slice(answers.tests.length - 1) === ';') {
    //     answers.tests = answers.tests.slice(0, -1)
    // }

    // answers.installation = `1. ${answers.installation.replace(/;/g, '\n1. ')}`
    // answers.usage = `1. ${answers.usage.replace(/;/g, '\n1. ')}`
    // if (answers.tests !== '') answers.tests = `* ${answers.tests.replace(/;/g, '\n* ')}`

    // let names = []
    // let usernames = []
    // answers.contributors = answers.contributors.split(';')
    // answers.contributors.forEach((value, index) => {
    //     answers.contributors[index] = value.split(':')
    //     let oldIndex = index
    //     answers.contributors[index].forEach((value, index) => {
    //         answers.contributors[oldIndex][index] = value.trim()
    //     })
    //     names.push(answers.contributors[index][0])
    //     usernames.push(answers.contributors[index][1])
    // })
    // answers.contributors = []
    // names.forEach((value, index) => {
    //     names[index] = `* [${value}]`
    //     usernames[index] = `(https://github.com/${usernames[index]})\n`
    //     answers.contributors.push(names[index], usernames[index])
    // })
    // answers.contributors = answers.contributors.join('')

    // answers.GitHub = `[GitHub](https://github.com/${answers.GitHub})`

    if (answers.license === 'MIT') {
        answers.license = licenses.MIT
        answers.name = await prompt({
            name: 'name',
            type: 'input',
            message: 'Enter your full name:'
        });
        answers.name = answers.name.name
        answers.year = await prompt({
            name: 'year',
            type: 'input',
            message: 'Enter the current year in the format YYYY:'
        });
        answers.year = answers.year.year
        answers.license = licenses.MIT
        answers.license = answers.license.replace('[year]', answers.year)
        answers.license = answers.license.replace('[fullname]', answers.name)
        answers.badge = '[![GitHub](https://img.shields.io/github/license/NTKonzen/README-Generator)](#license)'
        let licenseMIT = licenses.MIT.replace('[year]', answers.year)
        licenseMIT = licenseMIT.replace('[fullname]', answers.name)
        writeToFile('./generated-files/LICENSE', licenseMIT)
    } else if (answers.license === 'GPL') {
        answers.license = licenses.GPL
        answers.badge = '[![GitHub](https://img.shields.io/github/license/NTKonzen/README-Generator)](#license)'
        writeToFile('./generated-files/LICENSE', licenses.GPL)
    }

    writeToFile('./generated-files/README.md', generate(answers))
};

init();