
<p align="center">
  <a href="http://marcosnascimento.vercel.app/" target="blank"><img src="https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702862537/logo.mcine_mjupbm.svg" width="200" alt="mcine Logo" /></a>
</p>

## Descrição
Aplicação frontend para gerenciamento de cinemas em arquitetura multitenancy. Projeto desenvolvido como desafio técnico para uma vaga de desenvolvedor fullstack da empresa Jetimob com prazo de entrega de 15 dias.
A aplicação está dividida em duas frentes principais:
	- O painel administrativo no qual todo o gerenciamento e gestão dos cinemas são realizados;
	- Interface para usuários consumidores, onde podem navegar pelos cinemas e sessões, adquirir, listar e excluir tickets;
 
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
