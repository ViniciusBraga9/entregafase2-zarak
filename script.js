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

const localEmpresa = document.getElementById("dados-empresa");

if (localEmpresa) {
    ReactDOM.render(React.createElement(DadosEmpresa), localEmpresa);
}
