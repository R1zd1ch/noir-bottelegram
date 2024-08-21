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
      console.error('Ошибка при получении продуктов:', err);
      return res.status(500).json({ error: 'Ошибка при получении продуктов' });
    }
    console.log(res);
    res.json(results);
    return res;
  });
});

// Добавление продукта в корзину
app.post('/carts', (req, res) => {
  const { telegram_id, product_id } = req.body;

  if (!telegram_id || !product_id) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  // Проверяем, есть ли уже такой товар в корзине пользователя
  db.query(
    'SELECT * FROM carts WHERE telegram_id = ? AND product_id = ?',
    [telegram_id, product_id],
    (err, results) => {
      if (err) {
        console.error('Ошибка при проверке корзины:', err);
        return res.status(500).json({ error: 'Ошибка при проверке корзины' });
      }

      if (results.length > 0) {
        // Если товар уже в корзине, не добавляем его снова
        console.log('Товар в корзине');
        return res.status(400).json({ error: 'Товар уже добавлен в корзину' });
      } else {
        // Если товара нет в корзине, добавляем его
        db.query(
          'INSERT INTO carts (telegram_id, product_id) VALUES (?, ?)',
          [telegram_id, product_id],
          (err) => {
            if (err) {
              console.error('Ошибка при добавлении в корзину:', err);
              return res.status(500).json({ error: 'Ошибка при добавлении в корзину' });
            }
            res.sendStatus(200);
          }
        );
      }
    }
  );
});

// Получение корзины пользователя по Telegram ID
app.get('/carts/:telegram_id', (req, res) => {
  const { telegram_id } = req.params;
  db.query(
    'SELECT p.product_id, p.name, p.price FROM products p JOIN carts c ON p.product_id = c.product_id WHERE c.telegram_id = ?',
    [telegram_id],
    (err, results) => {
      if (err) {
        console.error('Ошибка при получении корзины:', err);
        return res.status(500).json({ error: 'Ошибка при получении корзины' });
      }
      res.json(results);
    }
  );
});

// Удаление товара из корзины
app.delete('/carts', (req, res) => {
  const { telegram_id, product_id } = req.body;

  if (!telegram_id || !product_id) {
    return res.status(400).json({ error: 'Telegram ID и Product ID обязательны' });
  }

  db.query(
    'DELETE FROM carts WHERE telegram_id = ? AND product_id = ?',
    [telegram_id, product_id],
    (err) => {
      if (err) {
        console.error('Ошибка при удалении товара из корзины:', err);
        return res.status(500).json({ error: 'Ошибка при удалении товара из корзины' });
      }
      res.sendStatus(200);
    }
  );
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
