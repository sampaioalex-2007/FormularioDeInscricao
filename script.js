// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuração do upload de arquivos
    // Seleciona todos os inputs de arquivo ocultos
    const fileInputs = document.querySelectorAll('.input-hidden');
    
    // Adiciona evento de change para cada input de arquivo
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            // Encontra o container mais próximo do input
            const container = e.target.closest('.custom-file-upload');
            
            if (container) {
                // Atualiza o nome do arquivo exibido
                const fileNameSpan = container.querySelector('.file-name');
                if (fileNameSpan) {
                    fileNameSpan.textContent = e.target.files[0]?.name || '';
                    // Adiciona classe 'uploaded' se houver arquivo selecionado
                    container.querySelector('.custom-upload-area').classList.toggle('uploaded', !!e.target.files.length);
                }
            }
        });
    });
    
    // 2. Elementos do formulário
    // Seleciona elementos importantes do formulário
    const form = document.querySelector('.formulario');
    const emailInput = document.getElementById('email');
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dataNascimentoInput = document.getElementById('dataNascimento');
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    const telefoneInput = document.getElementById('telefone');
    
    // 3. Função para criar elementos de erro
    // Cria e retorna um elemento de mensagem de erro estilizado
    const criarElementoErro = (input) => {
        const erro = document.createElement('div');
        erro.className = 'error-message';
        erro.style.color = 'red';
        erro.style.fontSize = '12px';
        input.parentNode.appendChild(erro);
        return erro;
    };
    
    // 4. Validação de e-mail
    // Adiciona validação de e-mail no evento blur
    emailInput.addEventListener('blur', () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const erro = emailInput.parentNode.querySelector('.error-message') || criarElementoErro(emailInput);
        
        if (!regexEmail.test(emailInput.value)) {
            erro.textContent = 'Por favor, insira um e-mail válido';
        } else {
            erro.textContent = '';
        }
    });
    
    // 5. Validação de senha
    // Valida se a senha tem pelo menos 6 caracteres
    passwordInput.addEventListener('blur', () => {
        const erro = passwordInput.parentNode.querySelector('.error-message') || criarElementoErro(passwordInput);
        
        if (passwordInput.value.length < 6) {
            erro.textContent = 'A senha deve ter pelo menos 6 caracteres';
        } else {
            erro.textContent = '';
        }
    });
    
    // 6. Validação de confirmação de senha
    // Verifica se as senhas coincidem
    confirmPasswordInput.addEventListener('blur', () => {
        const erro = confirmPasswordInput.parentNode.querySelector('.error-message') || criarElementoErro(confirmPasswordInput);
        
        if (confirmPasswordInput.value !== passwordInput.value) {
            erro.textContent = 'As senhas não coincidem';
        } else {
            erro.textContent = '';
        }
    });
    
    // 7. Máscara para Data de Nascimento (DD/MM/AAAA)
    // Formata a data enquanto o usuário digita
    dataNascimentoInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2 && value.length <= 4) {
            value = value.replace(/^(\d{2})/, '$1/');
        } else if (value.length > 4) {
            value = value.replace(/^(\d{2})(\d{2})/, '$1/$2/');
        }
        
        e.target.value = value.substring(0, 10);
    });
    
    // 8. Validação de Data de Nascimento
    // Valida o formato e se a data é válida
    dataNascimentoInput.addEventListener('blur', function() {
        const errorElement = this.parentNode.querySelector('.error-message') || criarElementoErro(this);
        const value = this.value;
        
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            errorElement.textContent = 'Formato inválido (DD/MM/AAAA)';
            return;
        }
        
        const [dia, mes, ano] = value.split('/').map(Number);
        const data = new Date(ano, mes - 1, dia);
        
        if (data.getDate() !== dia || data.getMonth() + 1 !== mes || data.getFullYear() !== ano) {
            errorElement.textContent = 'Data inválida';
            return;
        }
        
        // Verificar se a data é no futuro
        const hoje = new Date();
        if (data > hoje) {
            errorElement.textContent = 'Data não pode ser no futuro';
            return;
        }
        
        errorElement.textContent = '';
    });
    
    // 9. Máscara para CPF (000.000.000-00)
    // Formata o CPF enquanto o usuário digita
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/^(\d{3})/, '$1.');
        } else if (value.length > 6 && value.length <= 9) {
            value = value.replace(/^(\d{3})(\d{3})/, '$1.$2.');
        } else if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
        }
        
        e.target.value = value.substring(0, 14);
    });
    
    // 10. Validação de CPF
    // Valida o CPF usando algoritmo específico
    cpfInput.addEventListener('blur', function() {
        const errorElement = this.parentNode.querySelector('.error-message') || criarElementoErro(this);
        const cpf = this.value.replace(/\D/g, '');
        
        if (cpf.length !== 11 || !validarCPF(cpf)) {
            errorElement.textContent = 'CPF inválido';
        } else {
            errorElement.textContent = '';
        }
    });
    
    // Função para validar CPF
    function validarCPF(cpf) {
        // Verifica se todos os dígitos são iguais
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        // Calcula primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        
        // Calcula segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }
    
    // 11. Máscara para Telefone ((00) 00000-0000)
    // Formata o telefone enquanto o usuário digita
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0 && value.length <= 2) {
            value = `(${value}`;
        } else if (value.length > 2 && value.length <= 7) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        } else if (value.length > 7 && value.length <= 11) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
        } else if (value.length > 11) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        }
        
        e.target.value = value.substring(0, 15);
    });
    
    // 12. API de CEP (ViaCEP) - Versão Corrigida
    // Consulta a API ViaCEP para preencher automaticamente os campos de endereço
    cepInput.addEventListener('blur', async function() {
        const cep = this.value.replace(/\D/g, '');
        const errorElement = this.parentNode.querySelector('.error-message') || criarElementoErro(this);
        
        if (cep.length !== 8) {
            errorElement.textContent = 'CEP inválido (deve ter 8 dígitos)';
            return;
        }

        try {
            // Mostrar loading
            this.disabled = true;
            errorElement.textContent = 'Buscando CEP...';
            errorElement.style.color = 'blue';

            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            // Verificar se a resposta contém erro
            if (data.erro || !data.logradouro) {
                errorElement.textContent = 'CEP não encontrado ou endereço incompleto';
                return;
            }
            
            // Preencher campos apenas se existirem na resposta
            const campos = {
                'rua': 'logradouro',
                'bairro': 'bairro', 
                'cidade': 'localidade',
                'estado': 'uf'
            };
            
            Object.entries(campos).forEach(([id, campo]) => {
                const input = document.getElementById(id);
                if (input) input.value = data[campo] || '';
            });

            errorElement.textContent = '';
            
        } catch (error) {
            console.error('Erro na API de CEP:', error);
            errorElement.textContent = 'Erro ao buscar CEP. Tente novamente.';
            errorElement.style.color = 'red';
        } finally {
            this.disabled = false;
        }
    });

    // 13. Salvar no localStorage
    // Salva os dados do formulário no localStorage para continuar depois
    document.querySelector('.formulario__confirmacao__salvar').addEventListener('click', () => {
        const formData = new FormData(document.querySelector('.formulario'));
        const dadosFormulario = {};
    
        // Pegar todos os valores do formulário
        formData.forEach((value, key) => {
            // Para radio buttons, pega apenas o selecionado
            if (key === 'trilhas') {
                dadosFormulario[key] = document.querySelector('input[name="trilhas"]:checked')?.value;
            } else {
                dadosFormulario[key] = value;
            }
        });
    
        // Adicionar campos especiais
        dadosFormulario.docIdentidade = document.getElementById('docIdentidade').files[0]?.name || '';
        dadosFormulario.compResidencia = document.getElementById('compResidencia').files[0]?.name || '';
    
        // Adicionar campos de endereço manualmente se necessário
        dadosFormulario.rua = document.getElementById('rua').value;
        dadosFormulario.numero = document.getElementById('numero').value;
        dadosFormulario.cidade = document.getElementById('cidade').value;
        dadosFormulario.estado = document.getElementById('estado').value;
    
        localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));
        alert('Dados salvos temporariamente! Você pode continuar mais tarde.');
    });
    
    // 14. Carregar do localStorage
    // Carrega os dados salvos no localStorage quando a página é carregada
    const carregarDadosSalvos = () => {
        const dadosSalvos = localStorage.getItem('dadosFormulario');
        if (dadosSalvos) {
            const dadosFormulario = JSON.parse(dadosSalvos);
            
            // Preencher todos os campos
            Object.entries(dadosFormulario).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'radio') {
                        if (element.value === value) element.checked = true;
                    } else {
                        element.value = value || '';
                    }
                }
            });
            
            // Atualizar nomes dos arquivos
            if (dadosFormulario.docIdentidade) {
                document.querySelector('#uploadContainer .file-name').textContent = dadosFormulario.docIdentidade;
            }
            if (dadosFormulario.compResidencia) {
                document.querySelectorAll('#uploadContainer .file-name')[1].textContent = dadosFormulario.compResidencia;
            }
        }
    };
    
    // Execute ao carregar a página
    document.addEventListener('DOMContentLoaded', carregarDadosSalvos);
    
    // 15. Envio do formulário
    // Valida e envia o formulário quando o usuário clica em "Fazer inscrição"
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Verificar documentos primeiro (correção aqui)
        const docIdentidadeInput = document.getElementById('docIdentidade');
        const compResidenciaInput = document.getElementById('compResidencia');
        
        if (!docIdentidadeInput.files.length || !compResidenciaInput.files.length) {
            let mensagem = 'Documentos obrigatórios não anexados:\n';
            if (!docIdentidadeInput.files.length) mensagem += '• Documento de identidade\n';
            if (!compResidenciaInput.files.length) mensagem += '• Comprovante de residência';
            
            // Alerta estilizado
            const alertBox = document.createElement('div');
            alertBox.className = 'custom-alert';
            alertBox.innerHTML = `
                <div class="alert-content">
                    <span class="close-alert">&times;</span>
                    <h3>Atenção</h3>
                    <p>${mensagem}</p>
                    <button class="alert-button">Entendido</button>
                </div>
            `;
            document.body.appendChild(alertBox);
            
            alertBox.querySelector('.close-alert').onclick = () => alertBox.remove();
            alertBox.querySelector('.alert-button').onclick = () => alertBox.remove();
            return;
        }
    
        // Validar todos os campos
        let valido = true;
        const camposObrigatorios = form.querySelectorAll('[required]');
        
        camposObrigatorios.forEach(campo => {
            if (!campo.value.trim()) {
                valido = false;
                const erro = campo.parentNode.querySelector('.error-message') || criarElementoErro(campo);
                erro.textContent = 'Este campo é obrigatório';
            }
        });
        
        // Verificar se uma trilha foi selecionada
        if (!document.querySelector('input[name="trilhas"]:checked')) {
            valido = false;
            const erroTrilha = document.querySelector('.trilhas').querySelector('.error-message') || 
                criarElementoErro(document.querySelector('.trilhas'));
            erroTrilha.textContent = 'Por favor, selecione uma trilha';
        }
        
        if (valido) {
            // Salvar credenciais do usuário
            const dadosUsuario = {
                userId: userIdInput.value,
                password: passwordInput.value,
                nome: document.getElementById('nome').value,
                email: emailInput.value
            };
            
            localStorage.setItem(userIdInput.value, JSON.stringify(dadosUsuario));
            
            alert('Inscrição realizada com sucesso! Você será redirecionado para a página de login.');
            localStorage.removeItem('dadosFormulario'); // Limpar dados salvos
            window.location.href = 'login.html'; // Redirecionar imediatamente para login
        }
    });
    
    // 17. Animação da ilustração
    // Adiciona efeitos de animação quando o mouse passa sobre a ilustração
    const ilustracao = document.querySelector('.aside__imagem-de-fundo');
    if (ilustracao) {
        ilustracao.addEventListener('mouseenter', () => {
            ilustracao.style.animation = 'flutuar 3s ease-in-out infinite, balancar 4s ease-in-out infinite';
        });
        
        ilustracao.addEventListener('mouseleave', () => {
            ilustracao.style.animation = 'flutuar 6s ease-in-out infinite';
        });
    }

    // Configuração do modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    // Verifica se o modo escuro está ativado no localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplica o modo escuro se estiver ativado
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon();
    }

    // Adiciona evento de clique para alternar o modo escuro
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled);
        updateDarkModeIcon();
    });

    // Atualiza o ícone do modo escuro/claro
    function updateDarkModeIcon() {
        const isDark = document.body.classList.contains('dark-mode');
        darkModeIcon.src = isDark ? 'public/img/moon.png' : 'public/img/sun.png';
        darkModeIcon.alt = isDark ? 'Modo escuro ativo' : 'Modo claro ativo';
    }
});