[<< Volver al inicio](../README.md)
# Pipelines

## Aplicaciones

Cada uno de los pipelines de aplicaciones hace un deploy sobre ECS desde un docker. Para esto contempla las siguientes etapas en comun:

- Login en AWS
- Docker con Dockerfile y docker-compose
- Push docker en ECR
- Deploy en ECS

### Backend
Este pipeline permite realizar un deploy de una aplicación en NestJS hacia un servicio ECS.

Este archivo se encuentra en el [.github/workflows/backend.yml](.github/workflows/backend.yml)

Este proceso se ejecuta cuando ocurre alguno de los siguientes cambios:

- Se actualiza algún archivo dentro de la carpeta `/backend`
- Se actualiza el action `backend.yml`

### Backend
Este pipeline permite realizar un deploy de una aplicación en NestJS hacia un servicio ECS.

Este archivo se encuentra en el [.github/workflows/frontend.yml](.github/workflows/frontend.yml)

Este proceso se ejecuta cuando ocurre alguno de los siguientes cambios:

- Se actualiza algún archivo dentro de la carpeta `/frontend`
- Se actualiza el action `frontend.yml`

## IaC

Este pipeline permite realizar un despliegue de infraestructura usando los actions oficiales de Terragrunt.

Este archivo se encuentra en el [.github/workflows/platform.yml](.github/workflows/platform.yml)

Este proceso se ejecuta cuando ocurre alguno de los siguientes cambios:

- Se actualiza algún archivo dentro de la carpeta `/platofmr`
- Se actualiza el action `platform.yml`
