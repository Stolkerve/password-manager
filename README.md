# password-manager

Backend!!!

// /auth
Usuarios:
	- Registrarse
	- Ingresar

// /vault
Vault:
	- Guardar una contrasena
	- Actulizar una contrasena
	- Eliminar una contrasena

- password_manager
	- Users
	- Vaults ( id Users )

npm init -y
npm i express morgan cors bcrypt jsonwebtoken mysql2
npm i --save-dev typescript ts-node-dev @types/node @types/express @types/morgan @types/cors @types/bcrypt @types/jsonwebtoken

npx tsc --init