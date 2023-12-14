# aws-shorter-url-full-example


## Platform
### Dependencias
- Terraform
- Terragrunt

### Ejecución

Inicialmente debemos estar ubicados en la carpeta `platform` la cual contiene todo el código IaC con terragrunt

- Plan `terragrunt run-all plan -check=false`
- Apply `terragrunt run-all apply -check=false`
- Destroy `terragrunt run-all destroy -check=false`

## Backend

### Dependencias
- NPM CLI
- YARN CLI

### Ejecución
Para ejecutar el proyecto se debe lanzar los siguientes comandos

```bash
yarn start:dev
```


## Frontend

### Dependencias
- NPM CLI


### Ejecución
Para ejecutar el proyecto se debe lanzar los siguientes comandos

```bash

```

