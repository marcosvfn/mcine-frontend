
<p align="center">
  <a href="http://marcosnascimento.vercel.app/" target="blank"><img src="https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702862537/logo.mcine_mjupbm.svg" width="200" alt="mcine Logo" /></a>
</p>

## Descrição
Aplicação frontend para gerenciamento de cinemas em arquitetura multitenancy. Projeto desenvolvido como desafio técnico para uma vaga de desenvolvedor fullstack da empresa Jetimob com prazo de entrega de 15 dias.
A aplicação está dividida em duas frentes principais: um painel administrativo no qual todo o gerenciamento e gestão dos cinemas são realizados e uma interface para usuários consumidores, onde podem navegar pelos cinemas e sessões, adquirir, listar e excluir tickets;
 
- Stacks Utilizadas: 
	* NextJS 14
	* TailwindCSS
	* shadcn UI
	* Axios
	* zod Validator
	* Nivo Charts
  
### Painel Administrativo
	- Conta com dois tipos de cinemas (tenants):
		* Tenant Padrão:
			- Cadastro de salas e sessões
			- Venda de tickets 
			- Gestão de faturamento, desempenho e tickets exclusivo do cinema
			- Usuário Adminisitrador: Pode cadastrar, excluir e editar todas as funcionalidades do cinema;
			- Usuário Padrão: Pode vender tickets, porém somente visualizar salas e sessões;
		* Tenant Raíz:
			- Único na aplicação;
			- Utilizado para gerenciar outros cinemas, filmes e usuários
			- Gestão global de faturamento, desempenho e tickets dos cinemas.
			- Usuário Administrador: Pode cadastrar, excluir e editar cinemas, filmes e usuários;
			- Usuário Padrão: Pode visualizar informações de gestão e cadastros;
## Interface para consumidores
	* Single page flow
		1. Seleciona-se o filme
		2. Seleciona-se o cinema
		3. Seleciona-se a sessão
		4. Informa credenciais de compra
		5. Seleciona-se os assentos
  		6. Efetua compra do ticket
			
	* Área para acessar os tickets adquiridos com CPF
		- Seleciona-se o cinema que deseja ver os tickets
		- Loga-se com o CPF
		- Se existe histórico, lista os tickets
		- Pode excluir tickets de sessões futuras (reembolso)

## Credenciais
	* Administrador
 		- Email: admin@mcine.com
   		- Senha: 12345678
	* Padrão
 		- Email: padrao@mcine.com
   		- Senha: 12345678
     
# Inicialização
*  Fazer download do respositório
*  Abrir com o terminal
*  Instalar as dependências

    ```bash
    $ yarn install
    ```
    
*  Certifique de ter todas as 5 variáveis de ambiente no arquivo .env:
	*  Root tenant identifier
		- NEXT_APP_ROOT_TENANT_ID="root"

  	* BACKEND HOST URL
		- NEXT_APP_BASE_API_URL="http://localhost:8000"

  	* AUTHENTICATION REDIRECT URL (Same as the app runs)
		- NEXTAUTH_URL="http://localhost:3000"

  	*  Authentication Sign Secrets
		- NEXTAUTH_SECRET="T7wkgDNnHcw1stDmduSdSRfvIiw7B6O0EP8VK6tRwEk="

  	* Cloudinary Image Repository name
		- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dpmbuqjqj
	
*  Buildar o projeto para versão otimizada
  
    ```bash
    $ yarn build
    ```
	

* Inicializar o projeto (porta 3000)

   ```bash
    $ yarn start
    ```
