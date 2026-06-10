import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  listarServicos,
  criarServico,
  removerServico,
  atualizarServico,
} from "../services/servicoService";
import '../styles/dashboard.css';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [servicoEditando, setServicoEditando] = useState(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorBase, setValorBase] = useState("");
  const [tempoEstimado, setTempoEstimado] = useState("");

  async function carregarServicos() {
  try {
    const response = await listarServicos();

    console.log("RESPOSTA:", response);
    console.log("DADOS:", response.data);

    setServicos(response.data);
  } catch (error) {
    console.error("Erro ao carregar serviços", error);
  }
}

  useEffect(() => {
    carregarServicos();
  }, []);

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    if (servicoEditando) {
      await atualizarServico({
        ID: servicoEditando.ID,
        nome,
        descrição: descricao,
        valor_base: valorBase,
        tempo_estimado: tempoEstimado,
      });
    } else {
      await criarServico({
        nome,
        descrição: descricao,
        valor_base: valorBase,
        tempo_estimado: tempoEstimado,
      });
    }

    setNome("");
    setDescricao("");
    setValorBase("");
    setTempoEstimado("");
    setServicoEditando(null);

    carregarServicos();
  } catch (error) {
    console.error("Erro ao salvar serviço", error);console.error(error);
  }
}


  async function handleDelete(ID) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este serviço?"
    );

    if (!confirmar) return;

    try {
      await removerServico({ ID });
      carregarServicos();
    } catch (error) {
      console.error("Erro ao excluir serviço", error);
    }
  }

  function handleEditar(servico) {
  setServicoEditando(servico);
  setNome(servico.nome);
  setDescricao(servico.descrição);
  setValorBase(servico.valor_base);
  setTempoEstimado(servico.tempo_estimado);
}

  function cancelarEdicao() {
    setServicoEditando(null);
    setNome("");
    setDescricao("");
    setValorBase("");
    setTempoEstimado("");
  }

  return (
    <DashboardLayout>
      <div className="servicos-page-container">
        
        <header className="servicos-header">
          <h1>Serviços</h1>
          <p>Gerencie o catálogo de serviços oferecidos pelo salão.</p>
        </header>

        <div className="servicos-content-grid">
          
          <section className="servicos-list-container">
            {servicos.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum serviço cadastrado até o momento.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="servicos-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Preço Base</th>
                      <th>Tempo</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicos.map((s) => (
                      <tr key={s.ID}>
                        <td className="font-semibold">{s.nome}</td>
                        <td className="text-muted">{s.descrição || s.descricao}</td>
                        <td>R$ {parseFloat(s.valor_base).toFixed(2)}</td>
                        <td>{s.tempo_estimado}</td>
                        <td className="table-actions">
                          <button 
                            className="btn-icon btn-edit" 
                            onClick={() => handleEditar(s)}
                            title="Editar"
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            className="btn-icon btn-delete" 
                            onClick={() => handleDelete(s.ID)}
                            title="Excluir"
                          >
                            🗑️ Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <aside className="servicos-form-container">
            <div className="form-card">
              <h2>{servicoEditando ? "Editar Serviço" : "Novo Serviço"}</h2>
              <p className="form-subtitle">Preencha os dados abaixo</p>
              
              <form onSubmit={handleSubmit} className="styled-form">
                <div className="form-group">
                  <label>Nome do Serviço</label>
                  <input
                    type="text"
                    placeholder="Ex: Corte de Cabelo Feminino"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    placeholder="Ex: Lavagem, corte e finalização"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Valor Base (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="80.00"
                      value={valorBase}
                      onChange={(e) => setValorBase(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tempo Estimado</label>
                    <input
                      type="text"
                      placeholder="00:45:00"
                      value={tempoEstimado}
                      onChange={(e) => setTempoEstimado(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions-stack">
                  <button type="submit" className="btn-primary">
                    {servicoEditando ? "Salvar Alterações" : "Cadastrar Serviço"}
                  </button>
                  
                  {servicoEditando && (
                    <button type="button" className="btn-secondary" onClick={cancelarEdicao}>
                      Cancelar Edição
                    </button>
                  )}
                </div>
              </form>
            </div>
          </aside>

        </div>
      </div>
    </DashboardLayout>
  );
}
