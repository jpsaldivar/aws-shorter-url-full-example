# Usa una imagen base de Node.js
FROM node:21.4.0-alpine3.18

# Instala Yarn globalmente en la imagen
RUN npm install -g yarn

# Crea y establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia el archivo package.json y yarn.lock (si existe)
COPY package.json yarn.lock ./

# Instala las dependencias del proyecto con Yarn
RUN yarn install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación (ajusta este comando según tu configuración)
RUN yarn build

# Expone el puerto en el que la aplicación Nest.js se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "start:prod"]