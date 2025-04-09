// Gerenciamento de tema (claro/escuro)
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Verificar preferência de tema salva
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
} else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
}

// Alternar tema
themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
});

// Navegação entre formulários
function showForm(formId) {
    // Esconder todos os formulários
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('forgot-password-form').classList.add('hidden');
    
    // Mostrar o formulário solicitado
    document.getElementById(formId).classList.remove('hidden');
}

// Verificar hash da URL para navegação
function checkHash() {
    const hash = window.location.hash;
    
    if (hash === '#register') {
        showForm('register-form');
    } else if (hash === '#forgot-password') {
        showForm('forgot-password-form');
    } else {
        showForm('login-form');
    }
}

// Verificar hash inicial e quando mudar
window.addEventListener('hashchange', checkHash);
checkHash();

// Manipulação do formulário de login
document.getElementById('login-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulação de login (aqui você conectaria com seu backend)
    console.log('Tentativa de login:', { email, password });
    
    // Simulação de erro (remova isso quando implementar o login real)
    if (password.length < 6) {
        document.getElementById('error-message').classList.remove('hidden');
    } else {
        // Simulação de login bem-sucedido
        alert('Login bem-sucedido! Redirecionando para o dashboard...');
        // Aqui você redirecionaria para o dashboard
    }
});

// Manipulação do formulário de registro
document.getElementById('register-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        document.getElementById('register-error-message').textContent = 'As senhas não coincidem';
        document.getElementById('register-error-message').classList.remove('hidden');
        return;
    }
    
    // Simulação de registro (aqui você conectaria com seu backend)
    console.log('Tentativa de registro:', { name, email, password });
    
    // Simulação de registro bem-sucedido
    alert('Conta criada com sucesso! Faça login para continuar.');
    window.location.hash = '#login';
});

// Manipulação do formulário de recuperação de senha
document.getElementById('forgot-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    // Simulação de envio de link de recuperação (aqui você conectaria com seu backend)
    console.log('Solicitação de recuperação de senha para:', email);
    
    // Simulação de sucesso
    document.getElementById('forgot-form-element').classList.add('hidden');
    document.getElementById('forgot-success-message').classList.remove('hidden');
});
