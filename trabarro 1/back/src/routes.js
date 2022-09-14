const express = require('express')
const router = express.Router()

const produtos = require('./controllers/produtos')

router.get("/produtos", produtos.listarProdutos)
router.post("/produtos", produtos.cadastrarProduto)

module.exports = router