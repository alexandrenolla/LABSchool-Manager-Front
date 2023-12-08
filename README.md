# M3P-FrontEnd-Squad1

Front-end developed with Angular, Bootstrap, and custom CSS for the educational management system, where teachers and pedagogues are the end users. Layout includes dynamic card dashboard and a chart using Chart.js. Key functionalities: Registration, editing, deletion, and querying of students, teachers, pedagogues, exercises, assessments, and pedagogical consultations. Functionality restrictions based on the logged-in user class, user authentication via JWT Token, consumption of the ViaCEP API for address registration, and validation of all form fields. 100% Responsive.

## Tecnologias Utilizadas

- **Angular**: Framework de desenvolvimento para construção de interfaces de usuário.
- **Serviços**: Utilizados para encapsular lógica de negócios e interação com a API.
- **Componentização**: Divisão de interfaces em componentes reutilizáveis.
- **Data Binding**: Ligação bidirecional de dados entre o modelo e a interface.
- **Diretivas**: Adicionam comportamentos às tags HTML.
- **Layouts**: Organização e posicionamento dos componentes na interface.
- **Rotas**: Navegação entre diferentes componentes sem recarregar a página inteira.
- **Guarda de Rotas**: Proteção de rotas com base em condições específicas.
- **Requisições HTTP**: Interação com a API RESTful para buscar ou enviar dados.
- **Formulários Template-Driven e Reactive Forms**: Manipulação e validação de formulários.

## Pré-requisitos

- [Node.js](https://nodejs.org/en/download/) instalado
- [Angular CLI](https://angular.io/cli) instalado (`npm install -g @angular/cli`)

## Instalação e Execução

1. Clone o repositório: `git clone https://github.com/FullStack-Estreito/M3P-FrontEnd-Squad1.git`
2. Navegue até o diretório do projeto: `cd LABSchool-Manager`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento e acesse: `ng serve --o`

## Uso

1. A aplicação está completamente integrada com a API. Certifique-se de que a API está rodando em `http://localhost:5203` para garantir o funcionamento correto do frontend.
2. Certifique-se de ter criado um usuário administrador e um whitelabel, pelo swagger da API através dos endpoints POST. O frontend possui autenticação de login e somente dará o primeiro acesso ao sistema para um usuário administrador. 

Usuário Admministrador (Admin é do tipoUsuario 0):
```
{
  "nome": "Admin Lab 365",
  "genero": 0,
  "cpf": "12345678901",
  "statusAtivo": true,
  "telefone": "(11) 98765-4321",
  "email": "lab365@gmail.com",
  "senha": "123456",
  "tipoUsuario": 0,
  "matricula": 0,
  "codigoProfessor":0,
  "whiteLabelId": 1,
  "endereco": {
    "cep": "12345-678",
    "cidade": "São Paulo",
    "estado": 0,
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 45",
    "bairro": "Jardins",
    "referencia": "Próximo ao mercado central"
  }
}
````

White Label:
```
{
    "nomeEmpresa": "Lab School",
    "slogan": "Seu futuro em primeiro lugar!",
    "cores": "#d3d3d3, #17a2b8",
    "urlLogo": "https://github.com/FeReDragon/Avalicao-modulo2-FullStack-Senai/blob/main/LABSchool_Manager/src/assets/img/labScool-logo.png?raw=true",
    "complemento": "Informações adicionais aqui"
}
```
## Estrutura do Projeto

- **/src/app**: Contém os componentes, serviços e modelos da aplicação.
- **/src/assets**: Recursos estáticos como imagens e estilos.

---

**Nota:** Certifique-se de que a API esteja rodando corretamente para evitar problemas de funcionalidade.

