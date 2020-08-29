function generateMarkdown(data) {
    return `# ${data.title}
    ${data.badge}

### Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors) ${data.tests !== '' ? '\n* [Tests](#tests)' : ''}
* [Questions](#questions)
* [License](#license)

## Description ##

${data.what} ${data.why} ${data.how} ${data.additional}

### Installation ###

${data.installation} 

### Usage

${data.usage}
${data.tests !== '' ? `\n### Tests

${data.tests}
` : ''}

### Contributors

${data.contributors}
### Questions
If you have any questions feel free to contact me on ${data.GitHub} or email me at ${data.email}.

---
#### License

${data.license}
`
}

module.exports = { generateMarkdown: generateMarkdown }
