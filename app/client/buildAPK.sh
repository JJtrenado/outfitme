#!/bin/bash

# Ruta del archivo .gitignore
GITIGNORE_FILE=".gitignore"

# Comentar la línea que contiene "*.env" en el archivo .gitignore
sed -i '/\*\.env/s/^/#/' "$GITIGNORE_FILE"

# Ejecutar el comando "eas build"
eas build -p android --profile preview --local

# Descomentar la línea que contiene "*.env" en el archivo .gitignore
sed -i '/\*\.env/s/^#//' "$GITIGNORE_FILE"
