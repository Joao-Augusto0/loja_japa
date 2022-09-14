const mysql = require('mysql')

conDB = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "database": "loja_japa"
})

function listarProdutos(req, res) {
    let query = "SELECT * FROM produtos";

    conDB.query(query, (err, result) => {
        if (err == null) {
            res.json(result).status(200).end();
        } else {
            res.json(err).status(400).end();
        }
    })
}

function cadastrarProduto(req, res) {
    let data = new Date()
    let query = `INSERT INTO produtos VALUES (DEFAULT, '${(data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() ))}', '${req.body.descricao}', ${req.body.valor}, '${req.body.tipo}')`;
    
    conDB.query(query, (err, result) => {
        if (err == null) {
            res.status(201).json(req.body).end();
        } else {
            res.status(400).json(err).end();
        }
    })
}

module.exports = {
    listarProdutos,
    cadastrarProduto,
}