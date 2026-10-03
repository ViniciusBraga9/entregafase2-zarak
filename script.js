// Dados da empresa cadastrada.
const empresa = {
    nome: "UNIEAT",
    cnpj: "02.560.454/0001-42",
    email: "unieat@unifacisa.com",
    telefone: "(83) 4002-8922",
    cidade: "Campina Grande - PB",
    area: "Tecnologia"
};

// Componente React simples, sem precisar instalar ferramentas.
function DadosEmpresa() {
    return React.createElement("section", { className: "empresa-card" },
        React.createElement("h1", null, "Dados da empresa"),
        React.createElement("p", null, "Empresa cadastrada."),
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
        // Botao visual; o cadastro de vagas sera implementado depois.
        React.createElement("button", { type: "button", className: "btn btn-primary" },
            "Abrir vaga de emprego"
        )
    );
}

// Modal do Index
const botaoEnviar = document.querySelector("#comecar-agora");
const modal = document.querySelector("#meuModal");
const fecharModal = document.querySelector("#fecharModal");

if (botaoEnviar && modal) {
    botaoEnviar.addEventListener("click", function (event) {
        event.preventDefault();
        modal.showModal();
    });
}

if (fecharModal && modal) {
    fecharModal.addEventListener("click", function () {
        modal.close();
    });
}

// Parte de vagas Script
const buscaInput = document.getElementById("buscaInput");
const listaVagas = document.getElementById("listaVagas");
const buscaBtn = document.getElementById("buscaBtn");
const contagem = document.getElementById("contagem");

function filtrarVagas() {
    if (!buscaInput || !listaVagas) {
        return;
    }

    const termo = buscaInput.value.toLowerCase().trim();
    const cards = listaVagas.querySelectorAll(".vaga-card");

    let visiveis = 0;

    cards.forEach(function (card) {
        const texto = card.textContent.toLowerCase();
        const visivel = texto.includes(termo);

        card.style.display = visivel ? "" : "none";

        if (visivel) {
            visiveis++;
        }
    });

    if (contagem) {
        contagem.innerHTML = `<b>${visiveis}</b> ${
            visiveis === 1
                ? "vaga encontrada"
                : "vagas encontradas"
        }`;
    }
}

// Botão de busca
if (buscaBtn) {
    buscaBtn.addEventListener("click", filtrarVagas);
}

// Buscar pressionando Enter
if (buscaInput) {
    buscaInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            filtrarVagas();
        }
    });
}

const localEmpresa = document.getElementById("dados-empresa");

// TAGS RÁPIDAS
document.querySelectorAll(".tag-rapida").forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (!buscaInput) {
            return;
        }

        buscaInput.value = btn.dataset.filtro;
        filtrarVagas();
    });
});

// FILTRO POR CHIPS DE ÁREA
document.querySelectorAll(".filtro-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
        if (!buscaInput) {
            return;
        }

        chip.classList.toggle("ativo");
        buscaInput.value = chip.dataset.valor;
        filtrarVagas();
    });
});

// LIMPAR FILTRO
const limparFiltros = document.getElementById("limparFiltros");
if (limparFiltros) {
    limparFiltros.addEventListener("click", function () {
        if (buscaInput) {
            buscaInput.value = "";
        }

        document.querySelectorAll(".filtro-chip").forEach(function (chip) {
            chip.classList.remove("ativo");
        });

        document.querySelectorAll(".filtro-checks input").forEach(function (checkbox) {
            checkbox.checked = false;
        });

        const filtroCidade = document.getElementById("filtrocidade");

        if (filtroCidade) {
            filtroCidade.value = "";
        }

        filtrarVagas();
    });
}

// Renderizar React
if (localEmpresa) {
    // Para React 17 ou inferior:
    ReactDOM.render(React.createElement(DadosEmpresa), localEmpresa);
    
    // Para React 18+ use:
    // const root = ReactDOM.createRoot(localEmpresa);
    // root.render(React.createElement(DadosEmpresa));
}

// Accordion
document.querySelectorAll(".cur-accordion .accordion-header").forEach(function (header) {
    header.addEventListener("click", function () {
        const item = this.parentElement;
        const estaAberto = item.classList.contains("aberto");

        document.querySelectorAll(".cur-accordion .accordion-item").forEach(function (i) {
            i.classList.remove("aberto");
        });

        if (!estaAberto) {
            item.classList.add("aberto");
        }
    });
});