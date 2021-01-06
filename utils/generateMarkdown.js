function printIfExists(string, value) { return (!value || value === '') ? '' : string }

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

    let markdown =
        `# ${title} #\n` +
        `${printIfExists(badge, badge)}\n` +
        `\n` +
        `### Table of Contents ###\n` +
        `* [Description](#description)\n` +
        `${printIfExists('* [Installation](#installation)\n', installation)}` +
        `${printIfExists('* [Usage](#usage)\n', usage)}` +
        `${printIfExists('* [Contributors](#contributors)\n', contributors)}` +
        `${printIfExists('* [Tests](#tests)\n', tests)}` +
        '* [Questions](#questions)\n' +
        '* [License](#license)\n' +
        '\n' +
        '## Description ##\n' +
        '\n' +
        `${what} ${why} ${how} ${additional}`.trim() + '\n' +
        '\n' +
        `${printIfExists(`### Installation ###\n` +
            `\n` +
            `${installation}\n` +
            `\n`, installation)}` +
        `${printIfExists(`### Usage ###\n` +
            `\n` +
            `${usage}\n` +
            `\n`, usage)}` +
        `${printIfExists(`### Tests ###\n` +
            `\n` +
            `${tests}\n` +
            `\n`, tests)}` +
        `${printIfExists(`### Contributors ###\n` +
            `\n` +
            `${contributors}\n` +
            `\n`, contributors)}` +
        `### Questions ###\n` +
        `If you have any questions feel free to contact me on ${GitHub} or email me at ${email}.\n` +
        `\n` +
        `---\n` +
        `#### License #### \n` +
        `\n` +
        `${license}`

    return markdown;
}

module.exports = { generateMarkdown: generateMarkdown }
