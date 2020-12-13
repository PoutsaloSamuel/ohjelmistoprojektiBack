const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kysymykset.db');

db.serialize( () => {
    
let sql = 'CREATE TABLE kysymys (' +
'id integer PRIMARY KEY NOT NULL, ' +
'content text NOT NULL) ';


db.run(sql, (err) => {
if (err) {
return console.log(err.message);
}
console.log("Taulu tehty");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (1, 'Miten menee?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (2, 'Mikä fiilis?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (3, 'Mikä on suomen pääkaupunki?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (4, 'Moikkelis?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

db.each("SELECT id, nimi FROM kysymys", function (err, row) {
    if (err) {
        return console.log(err.message);
    }
    console.log(row.id + ", " + row.content)
});


})