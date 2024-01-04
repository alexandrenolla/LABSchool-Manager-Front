# 💻 Project

Front-end developed with Angular, Bootstrap, and custom CSS for the educational management system, where teachers and pedagogues are the end users. Layout includes dynamic card dashboard and a chart using Chart.js. Key functionalities: Registration, editing, deletion, and querying of students, teachers, pedagogues, exercises, assessments, and pedagogical consultations. Functionality restrictions based on the logged-in user class, user authentication via JWT Token, consumption of the ViaCEP API for address registration, and validation of all form fields. 100% Responsive.

## Technologies Used

- **Angular**: Development framework for building user interfaces.
- **Services**: Used to encapsulate business logic and interact with the API.
- **Componentization**: Division of interfaces into reusable components.
- **Data Binding**: Bidirectional data binding between the model and the interface.
- **Directives**: Add behaviors to HTML tags.
- **Layouts**: Organization and positioning of components in the interface.
- **Routes**: Navigation between different components without reloading the entire page.
- **Route Guards**: Protection of routes based on specific conditions.
- **HTTP Requests**: Interaction with the RESTful API to fetch or send data.
- **Template-Driven Forms and Reactive Forms**: Handling and validation of forms.
- **Chart.js**: Library for creating interactive and visually appealing charts.
- **JWT Authentication**: Token-based authentication for securing API communication.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed.
- [Angular CLI](https://angular.io/cli) installed. (`npm install -g @angular/cli`)

## Installation and Execution

1. Clone the repository.
2. Navigate to the project directory: `cd LABSchool-Manager`
3. Install dependencies: `npm install`
4. Start the development server and open the application: `ng serve --o`

## Usage

1. The application is fully integrated with the API. Make sure the API is running to ensure the correct functioning of the frontend.
2. Make sure you have created an administrator user and a whitelabel through the API's Swagger using the POST endpoints. The frontend has login authentication using JWT tokens and will only grant initial access to the system for an administrator user. 

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

Administrator User (Admin is of tipoUsuario 0):
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

## Project Structure

- **/src/app**: Contains the components, services, and models of the application.
- **/src/assets**: Static resources such as images and styles.

---

**Note:** Make sure the API is running correctly to avoid functionality issues.

