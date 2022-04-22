const inquirer = require('inquirer');
const fs = require('fs');

// read the license document and save to variable
let readLicense;

fs.readFile('./LICENSE', 'utf8', (error, data) =>
error ? console.error(error) : readLicense = data
);

// prompt user with questions in commandline
inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? Please note, this will be your filename for now. Please change filename to "README" when moved to your project folder.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license did you use?',
        choices: [
            'Apache License 2.0',
            'GNU General Public License v3.0',
            'MIT License',
            'BSD 2-Clause "Simplified" License',
            'BSD 3-Clause "New" or "Revised" License',
            'Boost Software License 1.0',
            'Creative Commons Zero v1.0 Universal',
            'Eclipse Public License 2.0',
            'GNU Affero General Public License v3.0',
            'GNU General Public License v2.0', 
            'Mozilla Public License 2.0',
            'Unlicense'
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the instructions for installation?',
    },
    {
        type: 'input',
        name: 'packages',
        message: 'What packages are used?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a brief description of your project:',
    },
    {
        type: 'input',
        name: 'deployed',
        message: 'What is the URL for your deployed project? If this project is not deployed, leave blank.',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please write any information for usage:',
    },
    {
        type: 'confirm',
        name: 'screenshots',
        message: 'Would you like to include a screenshot section? If yes, be sure to add links directly to the markdown file.',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'What are the contribution guidelines?',
    },
    {
        type: 'input',
        name: 'test',
        message: 'What are the instructions for testing?',
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your github username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
    },
])
.then((data) => {
// destructure data object
    const { title, license, installation, packages, description, deployed, usage, screenshots, contribution, test, github, email } = data; 
// create filename - instructed user to change to README at later time in command
    const filename = `./dist/${title}.md`;
// write file and return error if occurs
    fs.writeFile(filename, generateMD(readLicense, title, license, installation, packages, description, deployed, usage, screenshots, contribution, test, github, email), (err) =>
        err ? console.log(err) : console.log('Success!')
    );
})
// choose text for if deployed link is provided or not
const generatePageLink = (link) => {
    let deployedLink;
    if (link) {
        deployedLink =
`<br>
Please click this [link](${link}) to view the deployed application. <br>`
    } else {
        deployedLink =
`<br>
This project is not deployed. <br>`
    }
    return deployedLink;
}
// add section for screenshots under usage in smaller heading if desired; placeholder to input URL
const generateScreenshots = (screenshots) => {
    let mdScreenshot;
    if (screenshots == true) {
        mdScreenshot =
`<br>

### **Screenshots**
--- 
![screenshot](ADD URL HERE)
<br>
`
    } else {
        mdScreenshot = ``;
    }
    return mdScreenshot;
}    
    
// generate markdown content with template literals
const generateMD = (readLicense, title, license, installation, packages, description, deployed, usage, screenshots, contribution, test, github, email) => {
    let mdContent = 
`# **${title}**

![Badge](https://img.shields.io/badge/license-${license.split(' ')[0]}-blue)

## **Table of Contents**
---
- [License](#license)
- [Installation](#installation)
- [Packages](#packages)
- [Description](#description)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

<br>

## **License** 
---
[${license}](../LICENSE) <br>

${readLicense} <br>

<br>

## **Installation** 
---
${installation}

<br>

## **Packages** 
---
${packages}

<br>

## **Description**
---
${description} <br>` 

+ generatePageLink(deployed) +

`<br>

## **Usage** 
---
${usage}`

+ generateScreenshots(screenshots) +

`
<br>

## **Contributing** 
---
${contribution}

<br>

## **Tests** 
---
${test}

<br>

## **Questions?** 
---
Please contact me on Github at [${github}](https://github.com/${github}) or by [email](mailto:${email}).`

    return mdContent;
}