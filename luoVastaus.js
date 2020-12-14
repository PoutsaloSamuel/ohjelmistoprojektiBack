const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('vastaukset.db');

db.serialize( () => {
    
let sql = 'CREATE TABLE vastaus (' +
'id integer PRIMARY KEY NOT NULL, ' +
'question text NOT NULL, ' +
'answer text NOT NULL) ';


db.run(sql, (err) => {
    if (err) {
    return console.log(err.message);
    }
    console.log("Taulu tehty");
    });


sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (3, 'Miten kurssi sujui?', 'Hyvin, mutta pieniä vaikeuksia oli :)')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (1, '(Radio:) Kuinka hyvin projekti sujui 1-5?', '3')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (2, '(Number:) Kuinka vanha olet?', '22')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (4, 'Lempiväri?', 'Vihreä')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

db.each("SELECT id, answer FROM vastaus", function (err, row) {
    if (err) {
        return console.log(err.message);
    }
    console.log(row.id + ", " + row.answer)
});


})

