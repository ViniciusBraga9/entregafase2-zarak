
//Botao de enivar comentario no Index

const botaoEnviar = document.querySelector("#comecar-agora");
const modal = 
document.querySelector("#meuModal");
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

// TAGS RÁPIDA
document.querySelectorAll(".tag-rapida").forEach(function (btn) {
    btn.addEventListener("click", function () {

        if (!buscaInput) {
            return;
        }

        buscaInput.value = btn.dataset.filtro;

        filtrarVagas();
    });

});

// FILTRO POR CHIPS DE ÁREa
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


document .querySelectorAll(".cur-accordion .accordion-header").forEach(function (header){ 
    header.addEventListener("click", function () 
    { const item = this.parentElement; 
        const estaAberto = item.classList.contains("aberto"); 
        document .querySelectorAll(".cur-accordion .accordion-item")
        .forEach(function (i) 
        { i.classList.remove("aberto"); }); 
        
        if (!estaAberto) { 
            item.classList.add("aberto"); 
        } 
    });
 });

