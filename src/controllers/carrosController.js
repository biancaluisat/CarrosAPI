import dados from "../models/dados.js";

const { carros } = dados;

const getAllCarros = (req, res) => {
  let resultado = carros;

  const { modelo, cor } = req.query;
  if (modelo) {
    resultado = resultado.filter(
      (m) => m.modelo.toLowerCase() === modelo.toLowerCase()
    );
  }
  if (cor) {
    resultado = resultado.filter(
      (c) => c.cor.toLowerCase() === cor.toLowerCase()
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
};

const getCarroById = (req, res) => {
  const id = parseInt(req.params.id);
  const carro = carros.find((c) => c.id === id);

  if (carro) {
    res.status(404).json(carro);
  } else
    res.status(404).json({
      erro: `id ${id} não encontrado.`,
    });
};

const createCarro = (req, res) => {
  const {
    nome,
    modelo,
    ano,
    cor,
    qtdeVitorias,
    velocidadeMaxima,
    equipe,
    tipoPneu,
    piloto,
  } = req.body;

  if (
    !nome ||
    !modelo ||
    !ano ||
    !cor ||
    !qtdeVitorias ||
    !velocidadeMaxima ||
    !equipe ||
    !tipoPneu ||
    !piloto
  ) {
    return res.status(400).json({
      sucess: false,
      message:
        "Nome, modelo, ano, cor, quantia de vitórias, velocidade máxima, equipe, tipo do pneu e piloto são obrigatórios.",
    });
  }

  const novoCarro = {
    id: carros.length + 1,
    nome: nome,
    modelo: modelo,
    ano: parseInt(ano),
    cor: cor,
    qtdeVitorias: parseInt(qtdeVitorias),
  };

  carros.push(novoCarro);

  res.status(201).json({
    sucess: true,
    message: "Barbie criada com sucesso",
    Barbie: novoCarro,
  });
};

const deleteCarro = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      sucess: false,
      message: "O id é inválido.",
    });
  }

  const carroParaRemover = carros.find((r) => r.id === id);

  if (!carroParaRemover) {
    return res.status(404).json({
      sucess: false,
      message: "O carro com esse id não existe.",
    });
  }

  const carrosFiltrados = carros.filter((c) => c.id != id);

  carros.splice(0, carros.length, ...carrosFiltrados);

  res.status(200).json({
    sucess: true,
    message: "O carro foi deletado.",
  });
};

const updateCarro = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    nome,
    modelo,
    ano,
    cor,
    qtdeVitorias,
    velocidadeMaxima,
    equipe,
    tipoPneu,
    piloto,
  } = req.body;
  const idParaEditar = id;

  if (isNaN(idParaEditar)) {
    return res.status(400).json({
      sucess: false,
      message: "O id deve ser válido.",
    });
  }

  const carroExiste = carros.find((c) => c.id === idParaEditar);
  if (!carroExiste) {
    return res.status(404).json({
      sucess: false,
      message: "Esse carro não existe",
    });
  }

  const carrosAtualizados = carros.map((c) =>
    c.id === idParaEditar
      ? {
          ...c,
          ...(nome && { nome }),
          ...(modelo && { modelo }),
          ...(ano && { ano: parseInt(ano) }),
          ...(cor && { cor }),
          ...(qtdeVitorias && { qtdeVitorias: parseInt(qtdeVitorias) }),
          ...(velocidadeMaxima && {
            velocidadeMaxima: parseInt(velocidadeMaxima),
          }),
          ...(equipe && { equipe }),
          ...(tipoPneu && { tipoPneu }),
          ...(piloto && { piloto }),
        }
      : c
  );

  carros.splice(0, carros.length, ...carrosAtualizados);

  const carroEditado = carros.find((c) => c.id === idParaEditar);
  res.status(200).json({
    sucess: true,
    message: "Dados atualizados com sucesso",
    Carro: carroEditado,
  });
};

export { getAllCarros, getCarroById, createCarro, deleteCarro, updateCarro };
