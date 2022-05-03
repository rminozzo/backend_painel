const express = require("express");
const req = require("express/lib/request");
var cors = require('cors');
//const db = require('./models/db');
const Evento = require('./models/Eventos');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});

//LISTAR TODOS OS EVENTOS
app.get("/eventos", async (req, res) => {

    await Evento.findAll({
          attributes: ['id_evento','cidade_evento', 'status_evento', 'data_evento', 'previsao_evento'],
          order: [['data_evento','DESC']]
    })
    .then((eventos) => {
        return res.json({
            erro: false,
            eventos
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum registro encontrado!"
        });
    });
});


//CADASTRA EVENTO
app.post("/evento", async (req, res) => {
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
app.get("/evento/:id_evento", async (req, res) => {
    const { id_evento } = req.params;

    await Evento.findByPk(id_evento)
    .then((evento
        ) => {
        return res.json({
            erro: false,
            evento : evento
        })

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum registro encontrado"
        });
    })
    
})

//EDITAR EVENTO
app.put("/evento", async (req, res) => {
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
app.delete("/evento/:id_evento", async (req, res) => {
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


app.listen(8080, () => {
    console.log("Servidor iniciado com sucesso");
});


