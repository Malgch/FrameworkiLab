const fs = require('fs');

const count = Number(process.argv[2]); // odczyt liczby obiektów
let names = [];                        // tablica z obiektami 

let eyes = ['blue', 'green', 'black', 'amber', 'grey', 'hazel'];
let birthdays = ['2000-10-10', '1999-10-11', '2005-01-15', '1989-05-19', '1953-11-10', '2005-02-24', '1965-09-19'];

fs.readFile('./names.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    //podział łańcucha z imionami na wiersze.
    names = data.split("\n").map(s => s.trim()).filter(n => n.length != 0);
    console.log(names);

    let content = "export const data = [";
    for(let i = 0; i < count; i++){
        //losowanie imienia z bilioteki imion
        let id = i+1;
        let randomBirthday = birthdays[~~(Math.random() * birthdays.length)];
        let randomEye = eyes[~~(Math.random() * eyes.length)];
        let randomName = names[~~((Math.random() * eyes.length) / 1)];
        content += `\n{\n id: ${id},\n name: "${randomName}",\n birth: "${randomBirthday}",\n eyes:"${randomEye}"\n},\n`;
    }
    content += "];"

        //zapis łańcucha do pliku 
    fs.writeFile('./src/data/module-data.js', content, (err) => {
        if (err) {
           console.error(err);
        }
        console.log("module-data.js generated");
       });
});
