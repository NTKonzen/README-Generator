const { prompt } = require('inquirer');

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

module.exports = getList 