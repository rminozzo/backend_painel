const express = require("express");
var router = express.Router();

const Evento = require('../models/Eventos');

//LISTAR TODOS OS EVENTOS
router.get("/listar-todos", async (req, res) => {

    await Evento.findAll({
          attributes: ['id_evento','cidade_evento', 'status_evento', 'data_evento', 'previsao_evento'],
          order: [['data_evento','DESC']]
    })
    .then((listar_todos) => {
        return res.json({
            erro: false,
            listar_todos
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum registro encontrado!"
        });
    });
});

//CADASTRA EVENTO
router.post("/evento", async (req, res) => {
    const {
        status_evento, cidade_evento, ponto_evento,
        energia_evento, endereco_evento,
        afeta_evento, data_evento,
        protocolo_evento, previsao_evento
    } = req.body

    await Evento.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Evento Cadastrado com Sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro, falha ao cadastrar evento!"
            });

        });

});

//LISTAR UM UNICO EVENTO
router.get("/evento/:id_evento", async (req, res) => {
    const { id_evento } = req.params;

    await Evento.findByPk(id_evento)
    .then((evento
        ) => {
        return res.json({
            erro: false,
            evento
        })

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum registro encontrado"
        });
    })
    
})

//EDITAR EVENTO
router.put("/evento", async (req, res) => {
    const { id_evento } = req.body;  
    
    await Evento.update(req.body, {where: {id_evento}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Evento editado com sucesso!"
        });

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: não foi possivel editar!"
        });
    });
});

//APAGAR EVENTO
router.delete("/evento/:id_evento", async (req, res) => {
    const { id_evento } = req.params;

    await Evento.destroy({ where: { id_evento } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Evento apagado com sucesso"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nao foi possivel apagar!"
            });
        });
});


module.exports = router;

