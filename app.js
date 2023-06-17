const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DBPATH = 'bancodedados.db';
const app = express();
const sqlite3 = require('sqlite3').verbose();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("front"));
const db = new sqlite3.Database(DBPATH);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/index.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/cadastro.html'));
});

app.get('/bemvindo', (req, res) => {
    res.sendFile(path.join(__dirname + 'front/bemvindo.html'));
});

app.post('/verifica', (req, res) => {
    var senha = req.body.senha
    var login = req.body.login
    sql = `Select * FROM infoGeral WHERE login="${login}"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send("Erro na busca " + err);
        } else {
            console.log(rows)
            if (rows.length == 0) {
                console.log("Usuário Inexistente");
                res.write("Usuário Inexistente");
            } else {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].senha == senha) {
                        res.send("Usuário logado com sucesso");
                    } else {
                        res.write("Deu erro" + err);
                    }
                }
            }
        }
    })
    db.close();
})

app.post('/novocadastro', (req, res) => {
    var nome = req.body.nome;
    var id = req.body.id;
    var senha = req.body.senha;
    var login = req.body.login;
    sqlBusca = `SELECT * FROM infoGeral WHERE id=${id}`;
    db.all(sqlBusca, [], (err, rows) => {
        if (err) {
            res.send("Erro na busca" + err);
        } else {
            if (rows.length > 0) {
                res.send("Senha ou ID já cadastrados");
            } else {
                sql = `INSERT INTO infoGeral (id, nome, login, senha) VALUES (${id}, "${nome}", "${login}", "${senha}")`;
                db.run(sql, [], err => {
                    if (err) {
                        res.send("Erro no cadastro:" + err);
                    } else {
                        res.send("Cadastro realizado com sucesso");
                    }
                });
            }
        }
    })
    db.close();
});

app.listen(3001, function () {
    console.log("Servidor rodando na URL: http://localhost:3000");
});