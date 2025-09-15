import dados from "../models/dados.js";

const { carros } = dados;

const getAllCarros = (req, res) => {
    let resultado = carros;
    res.status(200).json({
        total: resultado.length,
        carros: resultado
    });
};

const getCarroById = (req, res) => {
    const id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);

    if (carro) {
        res.status(404).json
            (carro);
    } else res.status(404).json({
        erro: `id ${id} não encontrado.`
    });
};

export { getAllCarros, getCarroById }