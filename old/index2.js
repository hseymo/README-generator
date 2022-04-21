const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
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
            'The Unlicense'
        ]
    },
    {
        type: 'input',
        name: 'licenselink',
        message: 'What is the link to your license?',
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
        message: 'What is the URL for your deployed project?',
    },
    {
        type: 'input',
        name: 'screenshotone',
        message: 'What is the link for your first screenshot?',
    },
    {
        type: 'input',
        name: 'screenshottwo',
        message: 'What is the link for your second screenshot?',
    },
    {
        type: 'input',
        name: 'screenshotthree',
        message: 'What is the link for your third screenshot?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please write any information for usage:',
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
    const filename = `${data.title}.md`;

    const { title, license, licenselink, installation, packages, description, deployed, screenshotone, screenshottwo, screenshotthree, usage, contribution, test, github, email } = data; 

    fs.writeFile(filename, generateMD(title, license, licenselink, installation, packages, description, deployed, screenshotone, screenshottwo, screenshotthree, usage, contribution, test, github, email), (err) =>
        err ? console.log(err) : console.log('Success!')
    );
})

const generateMD = (title, license, licenselink, installation, packages, description, deployed, screenshotone, screenshottwo, screenshotthree, usage, contribution, test, github, email) => {
    let mdContent = 
`# **${title}** 

## **Table of Contents:**
---
- [License](#license)
- [Installation](#installation)
- [Packages](#packages)
- [Description](#description)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

<br>

### **License:** 
---
[${license}](${licenselink})

<br>

### **Installation:** 
---
${installation}

<br>

### **Packages:** 
---
${packages}

<br>

### **Description:**
---
${description}

Please click this [link](${deployed}) to view the deployed application.

<br>

### **Screenshots:**
---
![Screenshot]({${screenshotone}})
<br><br>
![Screenshot]({${screenshottwo}})
<br><br>
![Screenshot]({${screenshotthree}})

<br>

### **Usage:** 
---
${usage}

<br>

### **Contributing:** 
---
${contribution}

<br>

### **Tests:** 
---
${test}

<br>

### **Questions?** 
---
Please contact me on Github at [${github}](https://github.com/${github}) or by [email](mailto:${email}).`

    return mdContent;
} 


// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
