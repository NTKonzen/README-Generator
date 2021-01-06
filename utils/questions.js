const questions = {
    descriptionQuestions: [
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
    ],

    infoQuestions: [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your GitHub username:\n',
            validate: function (input) {
                return new Promise((res, rej) => {
                    input = input.trim();
                    if (!input || input == '') rej('You need to enter a username! (You can delete it later)')
                    else if (input.includes(' ')) rej('GitHub usernames cannot contain spaces!')
                    else res(true)
                })
            }
        },
        {
            name: 'repo',
            type: 'input',
            message: 'Enter the name of the repository you\'re working in:\n',
            validate: function (input) {
                return new Promise((res, rej) => {
                    input = input.trim()
                    if (!input || input == '') rej('You need to enter a GitHub repository! (You can delete it later)')
                    else if (input.includes(' ')) rej('GitHub repositories cannot contain spaces!')
                    else res(true)
                });
            }
        },
        {
            name: 'email',
            type: 'input',
            message: 'Enter your email:\n',
            validate: function (input) {
                return new Promise((res, rej) => {
                    input = input.trim()
                    if (!input || input === '') rej("You need to enter an email address! (You can delete it later)")
                    else if (/^\w+@\w+\.\w+$/.test(input) !== true) rej("You need to enter a valid email address! (You can delete it later)")
                    else res(true)
                });
            }
        },
        {
            name: 'license',
            type: 'input',
            message: 'Choose your license! Enter either MIT or GPL\n',
            validate: function (input) {
                return new Promise((res, rej) => {
                    input = input.trim();
                    capInput = input.toUpperCase();
                    if (!input || input === '') rej("You need to a license! Enter either MIT or GPL")
                    else if (!["MIT", "GPL"].includes(capInput)) rej(`${input} is not a supported license! Enter either MIT or GPL`)
                    else res(true)
                });
            },
            filter: function (input) {
                return new Promise((res, rej) => {
                    res(input.trim().toUpperCase())
                });
            }
        },
    ]
}

module.exports = questions