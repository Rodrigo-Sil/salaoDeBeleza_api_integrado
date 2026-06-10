import api from "./api";

// LISTAR serviços
export function listarServicos() {
  return api.get("/servicos/read");
}

// BUSCAR serviço por ID
export function obterServicoPorId(ID) {
  return api.get(`/servicos/read/${ID}`);
}

// CRIAR serviço
export function criarServico(dados) {
  return api.post("/servicos/create", dados);
}

// ATUALIZAR serviço
export function atualizarServico(dados) {
  return api.put("/servicos/update", dados);
}

// REMOVER serviço
export function removerServico(dados) {
  return api.delete("/servicos/delete", { data: dados });
}
