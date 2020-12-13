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


sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (1, 'Miten menee?', 'Hyvin')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (2, 'Moikkelis??', 'Moikkelis')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (3, 'Mikä on suomen pääkaupunki??', 'New york! :D')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'vastaus' ('id', 'question', 'answer')" + "VALUES (4, 'Miten menee?', 'Huonosti')";
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

