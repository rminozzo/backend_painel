const express = require("express");
var router = express.Router();

const Alarme = require("../models/Alarmes");

//LISTAR TODOS OS ALARMES
router.get("/listar-todos/:page", async (req, res) => {

    const { page = 1 } = req.params;

    const limit = 15;
    var lastPage = 1;

    const countEvent = await Alarme.count();
    
    if(countEvent === null){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum Alarme encontrado!"
        });
    }else{
        lastPage = Math.ceil(countEvent / limit);

    }

    await Alarme.findAll({
          attributes: ['id','ip_switch', 'interface', 'data', 'status'],
          order: [['data','DESC']],
          offset: Number((page * limit)-limit),
          limit: limit
    })
    .then((listar_todos) => {
        return res.json({
            erro: false,
            listar_todos,
            countEvent,
            lastPage,
            
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum registro encontrado!"
        });
    });
});

//CADASTRA ALARME
router.post("/addalarme", async (req, res) => {
    const {
        ip_switch, interface, cidade,
        data, status, obs
    } = req.body

    await Alarme.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Alarme Cadastrado com Sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro, falha ao cadastrar Alarme!"
            });

        });

});

//LISTAR UM UNICO Alarme
router.get("/alarme/:id", async (req, res) => {
    const { id } = req.params;

    await Alarme.findByPk(id)
    .then((alarme
        ) => {
        return res.json({
            erro: false,
            alarme
        })

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum registro encontrado!"
        });
    })
    
})

//EDITAR ALARME
router.put("/editalarme", async (req, res) => {
    const { id } = req.body;  
    
    await Alarme.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Alarme editado com sucesso!"
        });

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: não foi possivel editar!"
        });
    });
});

//APAGAR ALARME
router.delete("/delalarme/:id", async (req, res) => {
    const { id } = req.params;

    await Alarme.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Alarme apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nao foi possivel apagar!"
            });
        });
});


module.exports = router;

