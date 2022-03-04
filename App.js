const path = require('path');
const fs = require('fs').promises;

fs.mkdir(path.join(__dirname, 'main'), (err => {
    if (err) {
        console.log(err)
        throw err
    }
}));

const folderCreator = async (folderName) => {
    await fs.mkdir(path.join(__dirname, 'main', `${folderName}`), {recursive: true});
};

const onlineUsers = [
    {
        name: 'Andrii',
        surname: 'Dizhak',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'John',
        surname: 'Johnson',
        age: 30,
        city: 'New York'
    },
    {
        name: 'Emily',
        surname: 'Watson',
        age: 27,
        city: 'New York'
    }
];

const inPersonUsers = [
    {
        name: 'Volodymyr',
        surname: 'Papeta',
        age: 24,
        city: 'Lviv'
    },
    {
        name: 'Danny',
        surname: 'Vorsnop',
        age: 35,
        city: 'Paris'
    },
    {
        name: 'Jessica',
        surname: 'Wander',
        age: 24,
        city: 'Rome'
    }
];


folderCreator('online');
folderCreator('inPerson');

const fileCreator = (fileName, directory, users) => {
    const data = users.map(({name, surname, age, city}) => `Name: ${name};\n Surname: ${surname};\n Age: ${age};\n city: ${city};\n`)
    return fs.writeFile(path.join(__dirname, 'main', `${directory}`, `${fileName}.txt`), data)
};

fileCreator('inPersonUsers', 'inPerson', inPersonUsers);
fileCreator('online', 'online', onlineUsers);

const fileReplacer = async (firstFolder, secondFolder, firstFile, secondFile) => {
    const firstFileData = await fs.readFile(path.join(__dirname, 'main', firstFolder, `${firstFile}.txt`), 'utf8');
    const secondFileData = await fs.readFile(path.join(__dirname, 'main', secondFolder, `${secondFile}.txt`), 'utf8');

    await fs.appendFile(path.join(__dirname, 'main', firstFolder, `${firstFile}.txt`), secondFileData, {flag: 'w'});
    await fs.appendFile(path.join(__dirname, 'main', secondFolder, `${secondFile}.txt`), firstFileData, {flag: 'w'});
}

fileReplacer('inPerson', 'online', 'inPersonUsers', 'online');