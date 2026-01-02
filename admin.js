const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || role !== 'admin') {
    alert('Acesso não autorizado');
    window.location.href = 'login.html';
}
