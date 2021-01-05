function generateMarkdown({
    title,
    badge,
    tests,
    what,
    why,
    how,
    additional,
    installation,
    usage,
    contributors,
    GitHub,
    email,
    license
}) {
    return `# ${title}
${badge}

### Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors) ${tests !== '' ? '\n* [Tests](#tests)' : ''}
* [Questions](#questions)
* [License](#license)

## Description ##

${what} ${why} ${how} ${additional}

### Installation ###

${installation} 

### Usage

${usage}
${tests !== '' ? `\n### Tests

${tests}
` : ''}
### Contributors

${contributors}

### Questions
If you have any questions feel free to contact me on ${GitHub} or email me at ${email}.

---
#### License

${license}
`
}

module.exports = { generateMarkdown: generateMarkdown }
