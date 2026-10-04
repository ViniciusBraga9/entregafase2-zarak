# Emprega-se Aqui

Projeto acadêmico de um site de vagas de emprego.

## Como abrir

1. Extraia todo o ZIP.
2. Mantenha os arquivos extraídos juntos e conecte-se à internet.
3. Abra o `index.html` no navegador.

Para testar o perfil e as vagas salvas entre páginas, abra a pasta no VS Code e use o Live Server. Assim, todas as páginas usam o mesmo endereço e compartilham os dados do navegador. Não é necessário instalar React nem executar `npm install`.

## O que foi usado

- HTML para as páginas.
- CSS para o visual.
- JavaScript para os filtros, formulários e botões.
- Bootstrap 5.3.8 para o menu, os carrosséis e a janela de edição.
- React 17.0.2 apenas no cartão de dados da empresa, usando `React.createElement` e `ReactDOM.render`.

O Bootstrap e o React são carregados por links do jsDelivr no HTML. Por isso, é necessário ter internet ao abrir o site. Não há pasta de bibliotecas. O código do projeto continua em `script.js` e `styles.css`.

## O que funciona

- Navegação entre as páginas e menu no celular.
- Carrosséis e perguntas frequentes.
- Busca de vagas, filtros de área, modalidade, nível e cidade.
- Ordenação por data ou maior valor de salário anunciado.
- Botão para mostrar mais vagas e janela com detalhes.
- Download dos três modelos de currículo em JPG.
- Edição dos dados e habilidades do perfil de exemplo.
- Seleção de um currículo PDF de até 5 MB e download na mesma página.
- Cadastro de vagas de demonstração da UNIEAT.
- Inclusão de comentários na página inicial.

## Limites desta versão

Este é um projeto de apresentação, sem servidor ou banco de dados.

O perfil e as vagas cadastradas ficam no `localStorage`, que é o armazenamento do próprio navegador. Eles não são compartilhados com outras pessoas. Se os dados do navegador forem apagados, as alterações serão perdidas. Abrir os arquivos diretamente, sem Live Server, pode fazer cada página usar um armazenamento separado, dependendo do navegador.

O PDF selecionado e os comentários ficam apenas na página aberta e são removidos ao recarregar. O PDF não é enviado a uma empresa.

A página Entrar/Cadastrar mostra a empresa de exemplo. Não há login real, validação de CNPJ, análise automática de currículo nem envio de candidatura. Os números, depoimentos, percentuais de compatibilidade e vagas iniciais são ilustrativos. Os contatos das empresas de exemplo não devem ser usados para candidaturas reais. As redes sociais ainda não têm endereço definido.

## Correções realizadas

Foram corrigidos links e downloads quebrados, scripts ausentes ou repetidos, o carregamento do React, os filtros incompletos, a contagem de vagas e os botões sem ação. O menu foi padronizado, os textos foram revisados e um bloco repetido do CSS foi removido. As cores, imagens, estrutura das páginas e nomes dos integrantes foram mantidos.
