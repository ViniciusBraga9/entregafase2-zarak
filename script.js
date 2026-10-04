// Dados da empresa usada na apresentação.
const empresa = {
    nome: "UNIEAT",
    cnpj: "02.560.454/0001-42",
    email: "unieat@unifacisa.com",
    telefone: "(83) 4002-8922",
    cidade: "Campina Grande - PB",
    area: "Tecnologia"
};

// Os dados desta demonstração ficam somente no navegador.
function lerDados(chave, valorInicial) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : valorInicial;
    } catch (erro) {
        return valorInicial;
    }
}

function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch (erro) {
        return false;
    }
}

function DadosEmpresa() {
    return React.createElement("section", { className: "empresa-card" },
        React.createElement("h1", null, "Dados da empresa"),
        React.createElement("p", null, "Empresa de exemplo para apresentação."),
        React.createElement("dl", null,
            React.createElement("dt", null, "Nome da empresa"),
            React.createElement("dd", null, empresa.nome),
            React.createElement("dt", null, "CNPJ"),
            React.createElement("dd", null, empresa.cnpj),
            React.createElement("dt", null, "E-mail"),
            React.createElement("dd", null, empresa.email),
            React.createElement("dt", null, "Telefone"),
            React.createElement("dd", null, empresa.telefone),
            React.createElement("dt", null, "Cidade"),
            React.createElement("dd", null, empresa.cidade),
            React.createElement("dt", null, "Área de atuação"),
            React.createElement("dd", null, empresa.area)
        ),
        React.createElement("a", { href: "#nova-vaga", className: "btn btn-primary" },
            "Abrir vaga de emprego"
        )
    );
}

const localEmpresa = document.getElementById("dados-empresa");
if (localEmpresa) {
    if (typeof React !== "undefined" && typeof ReactDOM !== "undefined") {
        ReactDOM.render(React.createElement(DadosEmpresa), localEmpresa);
    } else {
        localEmpresa.textContent = "Não foi possível carregar os dados da empresa. Verifique sua conexão com a internet e recarregue a página.";
    }
}

// Cadastro simples de vagas.
let vagasSalvas = lerDados("empregaVagas", []);
if (!Array.isArray(vagasSalvas)) {
    vagasSalvas = [];
}
const formVaga = document.getElementById("formVaga");
if (formVaga) {
    formVaga.addEventListener("submit", function (event) {
        event.preventDefault();
        const vaga = {
            titulo: document.getElementById("vagaTitulo").value.trim(),
            cidade: document.getElementById("vagaCidade").value.trim(),
            area: document.getElementById("vagaArea").value,
            modalidade: document.getElementById("vagaModalidade").value,
            nivel: document.getElementById("vagaNivel").value,
            salario: Number(document.getElementById("vagaSalario").value),
            descricao: document.getElementById("vagaDescricao").value.trim(),
            data: Date.now()
        };
        const aviso = document.getElementById("avisoVaga");
        if (!vaga.titulo || !vaga.cidade || !vaga.descricao) {
            aviso.textContent = "Preencha o título, a cidade e a descrição.";
            return;
        }
        vagasSalvas.push(vaga);
        if (salvarDados("empregaVagas", vagasSalvas)) {
            formVaga.reset();
            aviso.textContent = "Vaga salva neste navegador! Clique em Ver vagas para consultar.";
        } else {
            vagasSalvas.pop();
            aviso.textContent = "Não foi possível salvar. Verifique se o navegador permite armazenar dados.";
        }
    });
}

// Busca e filtros de vagas.
const buscaInput = document.getElementById("buscaInput");
const listaVagas = document.getElementById("listaVagas");
const filtroCidade = document.getElementById("filtrocidade");
const ordenar = document.getElementById("ordenar");
const verMais = document.getElementById("verMaisBtn");
let limiteVagas = 4;

function textoBusca(texto) {
    // Permite buscar "estagio" e encontrar "Estágio".
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function valoresMarcados(seletor) {
    const valores = [];
    document.querySelectorAll(seletor).forEach(function (campo) {
        valores.push(campo.value || campo.dataset.valor);
    });
    return valores;
}

function filtrarVagas() {
    if (!listaVagas) {
        return;
    }
    const termo = textoBusca(buscaInput.value);
    const areas = valoresMarcados(".filtro-chip.ativo");
    const modalidades = valoresMarcados('input[name="modalidade"]:checked');
    const niveis = valoresMarcados('input[name="nivel"]:checked');
    const cards = Array.from(listaVagas.querySelectorAll(".vaga-card"));
    let total = 0;

    cards.sort(function (a, b) {
        if (ordenar.value === "salario") {
            return Number(b.dataset.salario) - Number(a.dataset.salario);
        }
        return Number(a.dataset.dias) - Number(b.dataset.dias);
    });

    cards.forEach(function (card) {
        const dados = card.querySelectorAll(".vaga-meta span");
        const combina = textoBusca(card.textContent + " " + card.dataset.area).includes(termo)
            && (areas.length === 0 || areas.includes(card.dataset.area))
            && (modalidades.length === 0 || modalidades.includes(dados[2].textContent))
            && (niveis.length === 0 || niveis.includes(dados[3].textContent))
            && textoBusca(dados[1].textContent).includes(textoBusca(filtroCidade.value));
        if (combina) {
            total++;
        }
        card.hidden = !combina || total > limiteVagas;
        listaVagas.appendChild(card);
    });

    document.getElementById("contagem").textContent = total + (total === 1 ? " vaga encontrada" : " vagas encontradas");
    document.getElementById("semVagas").hidden = total > 0;
    verMais.hidden = total <= limiteVagas;
}

function atualizarBusca() {
    limiteVagas = 4;
    filtrarVagas();
}

if (listaVagas) {
    // Usa um cartão existente como modelo para as vagas salvas.
    const modelo = listaVagas.querySelector(".vaga-card").cloneNode(true);
    vagasSalvas.forEach(function (vaga) {
        const card = modelo.cloneNode(true);
        card.dataset.area = vaga.area;
        card.dataset.salario = vaga.salario;
        card.dataset.dias = Math.max(0, (Date.now() - vaga.data) / 86400000);
        card.dataset.descricao = vaga.descricao;
        card.dataset.contato = empresa.email + " | " + empresa.telefone + " (dados da empresa de exemplo)";
        card.querySelector(".vaga-logo").textContent = "UN";
        card.querySelector(".vaga-titulo-card").textContent = vaga.titulo;
        const dados = card.querySelectorAll(".vaga-meta span");
        dados[0].textContent = empresa.nome;
        dados[1].textContent = vaga.cidade;
        dados[2].textContent = vaga.modalidade;
        dados[3].textContent = vaga.nivel;
        dados[4].textContent = "Cadastrada neste navegador";
        card.querySelector(".vaga-tags").textContent = vaga.area;
        card.querySelector(".vaga-salario").textContent = vaga.salario > 0
            ? vaga.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "Salário a combinar";
        listaVagas.prepend(card);
        // Inclui no filtro as cidades cadastradas no formulário.
        const existeCidade = Array.from(filtroCidade.options).some(function (opcao) {
            return opcao.value && textoBusca(vaga.cidade).includes(textoBusca(opcao.value));
        });
        if (!existeCidade) {
            const opcao = document.createElement("option");
            opcao.textContent = vaga.cidade;
            filtroCidade.appendChild(opcao);
        }
    });

    document.getElementById("buscaBtn").addEventListener("click", atualizarBusca);
    buscaInput.addEventListener("input", atualizarBusca);
    buscaInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            atualizarBusca();
        }
    });
    document.querySelectorAll(".tag-rapida").forEach(function (botao) {
        botao.addEventListener("click", function () {
            buscaInput.value = botao.dataset.filtro;
            atualizarBusca();
        });
    });
    document.querySelectorAll(".filtro-chip").forEach(function (chip) {
        chip.setAttribute("aria-pressed", "false");
        chip.addEventListener("click", function () {
            chip.classList.toggle("ativo");
            chip.setAttribute("aria-pressed", chip.classList.contains("ativo"));
            atualizarBusca();
        });
    });
    document.querySelectorAll(".filtro-checks input").forEach(function (campo) {
        campo.addEventListener("change", atualizarBusca);
    });
    filtroCidade.addEventListener("change", atualizarBusca);
    ordenar.addEventListener("change", atualizarBusca);
    document.getElementById("limparFiltros").addEventListener("click", function () {
        buscaInput.value = "";
        filtroCidade.value = "";
        ordenar.value = "recente";
        document.querySelectorAll(".filtro-chip").forEach(function (chip) {
            chip.classList.remove("ativo");
            chip.setAttribute("aria-pressed", "false");
        });
        document.querySelectorAll(".filtro-checks input").forEach(function (campo) {
            campo.checked = false;
        });
        atualizarBusca();
    });
    verMais.addEventListener("click", function () {
        limiteVagas += 4;
        filtrarVagas();
    });
    document.getElementById("filtroToggle").addEventListener("click", function () {
        const aberto = document.getElementById("filtrosAside").classList.toggle("aberto");
        this.setAttribute("aria-expanded", aberto);
    });

    // Detalhes da vaga por clique ou teclado.
    const detalhes = document.getElementById("detalhesVaga");
    listaVagas.querySelectorAll(".vaga-card").forEach(function (card) {
        function abrirDetalhes() {
            const dados = card.querySelectorAll(".vaga-meta span");
            document.getElementById("tituloDetalhe").textContent = card.querySelector(".vaga-titulo-card").textContent;
            document.getElementById("empresaDetalhe").textContent = dados[0].textContent;
            document.getElementById("localDetalhe").textContent = dados[1].textContent + " | " + dados[2].textContent + " | " + dados[3].textContent;
            document.getElementById("salarioDetalhe").textContent = card.querySelector(".vaga-salario").textContent;
            document.getElementById("descricaoDetalhe").textContent = card.dataset.descricao || card.querySelector(".vaga-tags").textContent.trim().replace(/\s+/g, " ");
            document.getElementById("contatoDetalhe").textContent = card.dataset.contato || "Vaga de exemplo, sem contato para candidatura real.";
            detalhes.showModal();
        }
        card.addEventListener("click", abrirDetalhes);
        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                abrirDetalhes();
            }
        });
    });
    filtrarVagas();
}

// Comentários na página inicial.
const formComentario = document.querySelector(".comment-form");
if (formComentario) {
    formComentario.addEventListener("submit", function (event) {
        event.preventDefault();
        const nome = document.getElementById("commentName").value.trim();
        const comentario = document.getElementById("commentText").value.trim();
        const aviso = document.getElementById("avisoComentario");
        if (!nome || !comentario) {
            aviso.textContent = "Preencha seu nome e comentário.";
            return;
        }
        const card = document.createElement("div");
        card.className = "card card-body";
        const titulo = document.createElement("h5");
        const texto = document.createElement("p");
        titulo.textContent = nome;
        texto.textContent = comentario;
        card.appendChild(titulo);
        card.appendChild(texto);
        document.getElementById("novosComentarios").appendChild(card);
        formComentario.reset();
        aviso.textContent = "Comentário adicionado nesta página.";
    });
}

// Perguntas frequentes dos modelos de currículo.
document.querySelectorAll(".cur-accordion .accordion-header").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const item = botao.parentElement;
        const abrir = !item.classList.contains("aberto");
        document.querySelectorAll(".cur-accordion .accordion-item").forEach(function (outro) {
            outro.classList.remove("aberto");
            outro.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("aberto", abrir);
        botao.setAttribute("aria-expanded", abrir);
    });
});

// Edição do perfil de exemplo.
const formPerfil = document.getElementById("formPerfil");
if (formPerfil) {
    const campos = ["perfilNome", "perfilEmail", "perfilCidade", "perfilTelefone", "perfilCurso", "perfilInstituicao", "perfilNivel", "perfilTipo"];
    let perfil = {};
    campos.forEach(function (id) {
        perfil[id] = document.getElementById(id).value;
    });
    perfil.habilidades = ["JavaScript", "Java", "SQL", "PostgreSQL", "Git"];
    const salvo = lerDados("empregaPerfil", null);
    if (salvo && typeof salvo.perfilNome === "string" && Array.isArray(salvo.habilidades)) {
        perfil = salvo;
    }
    let arquivoUrl = "";

    function atualizarPerfil() {
        document.querySelector(".perfil-nome").textContent = perfil.perfilNome;
        document.querySelector(".perfil-avatar").textContent = perfil.perfilNome.substring(0, 2).toUpperCase();
        document.querySelector(".perfil-area").textContent = "Back-end · " + perfil.perfilNivel + " · " + perfil.perfilCidade;
        const valores = document.querySelectorAll(".perfil-info-valor");
        const dados = [perfil.perfilNome, perfil.perfilEmail, perfil.perfilCidade, perfil.perfilCurso, perfil.perfilNivel, perfil.perfilTipo];
        valores.forEach(function (campo, i) {
            campo.textContent = dados[i];
        });
        document.querySelector(".perfil-badge").textContent = "Interesse: " + perfil.perfilTipo;
        const habilidades = document.querySelector(".perfil-card .area-techs");
        habilidades.textContent = "";
        perfil.habilidades.forEach(function (nome) {
            const tag = document.createElement("p");
            tag.className = "tech-tag";
            tag.textContent = nome;
            habilidades.appendChild(tag);
        });
        document.getElementById("totalHabilidades").textContent = perfil.habilidades.length;
        let preenchidos = 0;
        campos.forEach(function (id) {
            if (perfil[id]) preenchidos++;
        });
        if (perfil.habilidades.length > 0) preenchidos++;
        if (arquivoUrl) preenchidos++;
        const porcentagem = preenchidos * 10;
        document.querySelector(".perfil-progress-pct").textContent = porcentagem + "%";
        const barra = document.querySelector(".progress-bar");
        barra.style.width = porcentagem + "%";
        barra.setAttribute("aria-valuenow", porcentagem);
    }

    document.getElementById("modalEditarPerfil").addEventListener("show.bs.modal", function () {
        campos.forEach(function (id) {
            document.getElementById(id).value = perfil[id] || "";
        });
        document.querySelectorAll(".modal-chip").forEach(function (chip) {
            const selecionado = perfil.habilidades.includes(chip.textContent);
            chip.classList.toggle("selecionado", selecionado);
            chip.setAttribute("aria-pressed", selecionado);
        });
    });
    document.querySelectorAll(".modal-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
            const selecionado = chip.classList.toggle("selecionado");
            chip.setAttribute("aria-pressed", selecionado);
        });
    });
    formPerfil.addEventListener("submit", function (event) {
        event.preventDefault();
        let valido = true;
        campos.forEach(function (id) {
            const campo = document.getElementById(id);
            if (campo.required && !campo.value.trim()) {
                campo.value = "";
                valido = false;
            }
        });
        if (!valido) {
            formPerfil.reportValidity();
            return;
        }
        campos.forEach(function (id) {
            perfil[id] = document.getElementById(id).value.trim();
        });
        perfil.habilidades = [];
        document.querySelectorAll(".modal-chip.selecionado").forEach(function (chip) {
            perfil.habilidades.push(chip.textContent);
        });
        const salvo = salvarDados("empregaPerfil", perfil);
        atualizarPerfil();
        bootstrap.Modal.getInstance(document.getElementById("modalEditarPerfil")).hide();
        document.getElementById("avisoPerfil").textContent = salvo
            ? "Perfil salvo neste navegador." : "Perfil alterado apenas nesta página. O navegador não permitiu salvar os dados.";
    });

    document.getElementById("arquivoCurriculo").addEventListener("change", function () {
        const arquivo = this.files[0];
        if (!arquivo) return;
        const aviso = document.getElementById("avisoCurriculo");
        if (!arquivo.name.toLowerCase().endsWith(".pdf") || arquivo.size > 5 * 1024 * 1024) {
            aviso.textContent = "Escolha um arquivo PDF de até 5 MB.";
            this.value = "";
            return;
        }
        if (arquivoUrl) URL.revokeObjectURL(arquivoUrl);
        arquivoUrl = URL.createObjectURL(arquivo);
        document.querySelector(".curriculo-nome").textContent = arquivo.name;
        document.querySelector(".curriculo-data").textContent = "Selecionado nesta página. Não foi enviado a uma empresa.";
        const baixar = document.getElementById("baixarCurriculo");
        baixar.href = arquivoUrl;
        baixar.download = arquivo.name;
        baixar.hidden = false;
        aviso.textContent = "Disponível para baixar até fechar ou recarregar esta página.";
        atualizarPerfil();
    });
    atualizarPerfil();
}
