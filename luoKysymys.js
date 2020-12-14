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

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (3, 'Miten kurssi sujui?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (1, '(Radio:) Kuinka hyvin projekti sujui?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (2, '(Number:) Kuinka vanha olet?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

sql = "INSERT INTO 'kysymys' ('id', 'content')" + "VALUES (4, 'Lempiväri?')";
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Tauluun lisätty rivi");
});

db.each("SELECT id, content FROM kysymys", function (err, row) {
    if (err) {
        return console.log(err.message);
    }
    console.log(row.id + ", " + row.content)
});


})