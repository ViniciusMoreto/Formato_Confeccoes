/* ================= LOGIN ================= */
document.getElementById('login')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#login #email').value;
    const senha = document.querySelector('#login #senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Erro no login');
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        alert('Login realizado com sucesso!');

        if (data.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }

    } catch (error) {
        alert('Erro ao conectar com o servidor');
        console.error(error);
    }
});


/* ================= CADASTRO ================= */
document.getElementById('cadastro')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#cadastro #email').value;
    const senha = document.querySelector('#cadastro #senha').value;

    try {
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Erro no cadastro');
            return;
        }

        alert('Cadastro realizado com sucesso! Agora faça login.');
        document.getElementById('container').classList.remove('active');

    } catch (error) {
        alert('Erro ao conectar com o servidor');
        console.error(error);
    }
});
