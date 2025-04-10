Programa Trilhas Inova

1. O que é o projeto
O Programa Trilhas Inova é uma aplicação web desenvolvida para gerenciar inscrições em cursos de tecnologia. O sistema permite que usuários se inscrevam em diferentes trilhas de aprendizagem (Front-end, Back-end, Jogos, UX e Ciência de Dados) fornecendo seus dados pessoais, documentos e criando uma conta de acesso.

Principais características:

Formulário de inscrição completo com validações

Sistema de login para usuários cadastrados

Upload de documentos (identidade e comprovante de residência)

Seleção de trilhas de aprendizagem

Modo escuro/claro configurável

Design responsivo para diferentes tamanhos de tela

2. Como rodar localmente
Pré-requisitos
Navegador web moderno (Chrome, Firefox, Edge, Safari)

Servidor web local (opcional, pode abrir diretamente os arquivos HTML)

Passos para execução
Clone o repositório ou faça o download dos arquivos

Abra o arquivo index.html no navegador para acessar o formulário de inscrição

Para testar o login, abra o arquivo login.html

Observações
O projeto utiliza localStorage para armazenar dados, portanto não requer banco de dados ou backend

Todas as validações são feitas no client-side com JavaScript

3. Tecnologias utilizadas
Front-end
HTML5: Estrutura da página

CSS3: Estilização e layout responsivo

JavaScript: Validações, máscaras e interações

Bibliotecas e Recursos
Google Fonts: Fontes Poppins e Montserrat

ViaCEP API: Consulta de endereços por CEP

LocalStorage: Armazenamento local dos dados

4. Principais funcionalidades
Formulário de Inscrição
Validação em tempo real de todos os campos

Máscaras para CPF, telefone, data de nascimento e CEP

Upload de documentos com visualização do nome do arquivo

Seleção de trilhas com cards interativos

Salvar progresso e continuar depois

Termos e condições com links

Página de Login
Design limpo e moderno

Validação de campos

Link para cadastro (formulário de inscrição)

Recursos Gerais
Modo escuro/claro: Alternância com persistência no localStorage

Design responsivo: Adapta-se a telas de diferentes tamanhos

Animações: Efeitos sutis para melhor experiência do usuário

Validação de CPF: Algoritmo que verifica dígitos verificadores

Consulta de CEP: Integração com ViaCEP para preenchimento automático
