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
}

module.exports = questions