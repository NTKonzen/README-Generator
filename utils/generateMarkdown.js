function generateMarkdown(data) {
    return `# ${data.title}

### Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors) ${data.tests !== '' ? '\n* [Tests](#tests)' : ''}
* [Questions](#questions)
* [License](#license)

## Description ##

${data.what} ${data.why} ${data.how}

### Installation ###

${data.installation} 

### Usage

${data.usage}

### Contributors

${data.contributors}
`
}

module.exports = { generateMarkdown: generateMarkdown }
