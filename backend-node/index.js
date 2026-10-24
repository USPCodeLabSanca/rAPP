import express from 'express';
import db from './db.js';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express(); //uso do express api para facilitar criação de rotas
app.use(express.json()); //isso indica que as informações serão passadas via JSON
app.use(cors());

/**Seção da república */
//cria rep
app.post('/reps', async (req, res) => {
  const { nome, senha, email, insta, desc, tags} = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await db.query(
      'INSERT INTO reps (nome, senha, email, insta, descr, tags) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, senhaCriptografada, email, insta, desc, JSON.stringify(tags || [])]
    );
    res.status(201).send('República criado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao salvar República');
  }
});

//loga a rep
app.post('/login_rep', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Uso de [rows] para desestruturar apenas os registros
    const [rows] = await db.query(
      'SELECT * FROM reps WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).send('Email ou senha incorretos');
    }

    const user = rows[0];

    // 2. Ordem correta: (texto_puro, hash_do_banco)
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).send('Email ou senha incorretos');
    }

    // 3. Login bem-sucedido (status 200 OK)
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id,
        republica: user.republica,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao realizar login');
  }
});

//busca repúblicas
app.get('/reps', async (req, res) => {
    const { id, nome } = req.query;

    try {
        let query = 'SELECT * FROM reps WHERE 1=1';
        const params = [];

        if (id) {
            query += ' AND id LIKE ?';
            params.push(`%${id}%`);
        }
        if (nome) {
            query += ' AND nome LIKE ?';
            params.push(`%${nome}%`);
        }

        const [rows] = await db.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar repúblicas no banco de dados');
    }
});

//deleta a república
app.delete('/reps', async (req, res)=>{
  const {republica} = req.query;

  if(republica){
    try {
      const rows = await db.query(
        'DELETE FROM reps WHERE nome = ?',
        [republica]
      )
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar república no banco de dados');
    }
  }
})


//garante a execução do servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});


