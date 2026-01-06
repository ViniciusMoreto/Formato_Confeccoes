// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '29012006',
    database: 'FORMATO_CONFECCOES'
};

const JWT_SECRET = 'Amare_significa_lasciar_andare_sì'; 
const PORT = 3000;

const pool = mysql.createPool(dbConfig);

// ================= MIDDLEWARES =================
const authMiddleware = (req, res, next) => {
    const authHeader =
        req.headers.authorization ||
        req.headers.Authorization ||
        req.headers['x-access-token'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Acesso exclusivo do administrador'
        });
    }
    next();
};




// ================= USUÁRIO padrão =================
app.post('/cadastro', async (req, res) => {
    const { email, senha, cpf } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const [exist] = await pool.query(
        'SELECT IdUsuario FROM cadastro WHERE email = ?',
        [email]
    );

    if (exist.length > 0) {
        return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    const hash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
        'INSERT INTO cadastro (email, senha, cpf, role) VALUES (?, ?, ?, ?)',
        [email, hash, cpf || null, 'user']
    );

    res.status(201).json({ message: 'Usuário cadastrado', IdUsuario: result.insertId });
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const [users] = await pool.query(
        'SELECT IdUsuario, email, senha, role FROM cadastro WHERE email = ?',
        [email]
    );

    if (users.length === 0) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const user = users[0];
    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign(
        {
            IdUsuario: user.IdUsuario,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({
        message: 'Login realizado',
        token,
        role: user.role
    });
});

// ================= ADMIN =================

// Cadastrar produto
app.post('/admin/produtos', authMiddleware, adminMiddleware, async (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;

    await pool.query(
        'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, estoque]
    );

    res.status(201).json({ message: 'Produto cadastrado' });
});

// Listar pedidos
app.get('/admin/pedidos', authMiddleware, adminMiddleware, async (req, res) => {
    const [pedidos] = await pool.query('SELECT * FROM pedidos');
    res.json(pedidos);
});

// Atualizar status do pedido
app.put('/admin/pedidos/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    await pool.query(
        'UPDATE pedidos SET status = ? WHERE id = ?',
        [status, id]
    );

    res.json({ message: 'Status atualizado' });
});

// ================= SERVER =================
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// ================= PAGAMENTO =================
 const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MP_TOKEN
});

app.post('/criar-pagamento', async (req, res) => {
  try {
    const { valor, email } = req.body;

    const pagamento = await mercadopago.payment.create({
      transaction_amount: valor,
      payment_method_id: 'pix',
      payer: { email }
    });

    res.json({
      qr_code_base64:
        pagamento.response.point_of_interaction.transaction_data.qr_code_base64,
      status: pagamento.response.status
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar pagamento' });
  }
});

// ================= VERIFICANDO =================

// ================= WEBHOOK MERCADO PAGO =================

app.post('/webhook', async (req, res) => {
  try {
    const pagamentoId = req.body.data.id;

    const pagamento = await mercadopago.payment.get(pagamentoId);

    const status = pagamento.response.status;
    const email = pagamento.response.payer.email;
    const valor = pagamento.response.transaction_amount;

    // status possíveis:
    // approved | pending | rejected

    if (status === 'approved') {
      // 🔁 atualizar pedido no banco
      await db.query(`
        UPDATE pedidos
        SET status = 'PAGO'
        WHERE email = ?
      `, [email]);

      // 📧 enviar email (vamos implementar depois)
      console.log(`Pagamento aprovado: ${email} - R$${valor}`);
    }

    res.sendStatus(200);

  } catch (error) {
    console.error('Erro no webhook:', error);
    res.sendStatus(500);
  }
});
