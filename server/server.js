const express = require('express');
const { createConnection } = require('mysql2');
const { json } = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(json());

// Подключение к базе данных
const db = createConnection({
  host: '192.168.0.112',
  user: 'root',
  password: '12345',
  database: 'shop',
  connectTimeout: 10000,
});

// Получение всех продуктов
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении продуктов' });
    }
    res.json(results);
  });
});

// Добавление продукта в корзину
app.post('/cart', (req, res) => {
  const { telegram_id, product_id, quantity } = req.body;

  if (!telegram_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  db.query(
    'INSERT INTO carts (telegram_id, product_id, quantity) VALUES (?, ?, ?)',
    [telegram_id, product_id, quantity],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка при добавлении в корзину' });
      }
      res.sendStatus(200);
    }
  );
});

// Получение корзины пользователя по Telegram ID
app.get('/cart/:telegram_id', (req, res) => {
  const { telegram_id } = req.params;
  db.query(
    'SELECT p.name, p.price, c.quantity FROM products p JOIN carts c ON p.id = c.product_id WHERE c.telegram_id = ?',
    [telegram_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка при получении корзины' });
      }
      res.json(results);
    }
  );
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
