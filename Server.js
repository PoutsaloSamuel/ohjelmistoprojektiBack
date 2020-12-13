const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))

var helmet = require('helmet')
app.use(helmet())

app.use(express.json());
express.urlencoded({limit:'5mb',extended: true});

const sqlite3 = require('sqlite3');
const { response } = require('express');
const db = new sqlite3.Database('kysymykset.db');
const db2 = new sqlite3.Database('vastaukset.db');

app.listen(8080, () => {
console.log('Node toimii localhost:8080');

app.get('/', (req, res, next) => {
    return res.send({error: false, message: 'Toimii'})
    })

    const multer = require('multer');

    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, './images')
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname)
      }
    })

    const upload = multer({ storage: storage })
// Kysymys (db)
app.get('/kysymys/all', (req, res, next) => {
    db.all('select * from kysymys', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})


app.get('/kysymys/one/:id', (req, res, next) => {
	let id = req.params.id;

    db.get('select * from kysymys where id = ?', [id], (error, result) => {
		if (error) throw error;

		// Oliko vastaus tyhjä
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	});
})

app.get('/kysymys/delete/:id', (req, res, next) => {
    let id = req.params.id;

    db.run('delete from kysymys where id = ?', [id], function (error, result) {
      if (error) throw error;

      return res.status(200).json( {count: this.changes} );
  });
})

app.patch('/kysymys/edit/:id/:content', (req, res, next) => {
  let id = req.params.id;
  let content = req.params.content;
  let kuva = null;
        if (req.file) {
          kuva = req.file.originalname;
        }
  db.run('update kysymys set content=? where id = ?', 
  [content,id], (error, result)  =>{
    if (error) throw error;
    
    return res.status(200).json( {count: 1});
});
})
    
app.post('/kysymys/add', (req, res, next) => {
        let kysymys = req.body;
        db.run('insert into kysymys (content) values (?)',
                [kysymys.content], (error, result) => {
              if (error) throw error;
      
              return res.status(200).json( {count: 1} );
    });
})


// vastaus (db2)
app.get('/vastaus/all', (req, res, next) => {
    db2.all('select * from vastaus', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})



app.get('/vastaus/one/:id', (req, res, next) => {
	let id = req.params.id;

    db2.get('select * from vastaus where id = ?', [id], (error, result) => {
		if (error) throw error;

		// Oliko vastaus tyhjä
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	});
})

app.get('/vastaus/delete/:id', (req, res, next) => {
    let id = req.params.id;

    db2.run('delete from vastaus where id = ?', [id], function (error, result) {
      if (error) throw error;

      return res.status(200).json( {count: this.changes} );
  });
})
    
app.post('/vastaus/add', (req, res, next) => {
        let vastaus = req.body;
        db2.run('insert into vastaus (question,answer) values (?, ?)',
                [vastaus.question, vastaus.answer], (error, result) => {
              if (error) throw error;
      
              return res.status(200).json( {count: 1} );
    });
})


// Yleiset


app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'Ei pyydettyä palvelua' })
})
})