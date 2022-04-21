const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'screenshotone',
        message: 'What is the link for your first screenshot? If you do not wish to include screenshots, leave all prompts blank.',
    },
    {
        type: 'input',
        name: 'screenshottwo',
        message: 'What is the link for your second screenshot? If you do not wish to include a second screenshot, leave blank.',
    },
    {
        type: 'input',
        name: 'screenshotthree',
        message: 'What is the link for your third screenshot? If you do not wish to include a third screenshot, leave blank.',
    },
])
.then((data) => {
    const filename = `${data.title}.md`;

    const { title, license, licenselink, installation, packages, description, deployed, screenshotone, screenshottwo, screenshotthree, usage, contribution, test, github, email } = data; 

    function screenshotArray(...answers) {
        let screenshots = [];
        for (let answer of answers) {
            if (answer.trim()) {
                screenshots.push(answer)
            }
        }
        return screenshots;
    }

    screenshotArray(screenshotone, screenshottwo, screenshotthree)
})