// models_bd.js
const { Sequelize, DataTypes } = require('sequelize');

// Создание подключения к базе данных
const sequelize = new Sequelize('shop', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, // Отключение логирования запросов
});

// Определение модели для пользователей
const User = sequelize.define('User', {
  telegram_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  // Другие поля, например, имя пользователя и т.д.
}, {
  tableName: 'users',
  timestamps: false,
});

// Определение модели для продуктов
const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  available: {  // Поле для обозначения доступности продукта
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'products',
  timestamps: false,
});

// Определение модели для корзины
const Cart = sequelize.define('Cart', {
  // Внешний ключ для связи с пользователем
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'telegram_id',
    },
    unique: true, // У одного пользователя может быть только одна корзина
    allowNull: false,
  },
}, {
  tableName: 'carts',
  timestamps: false,
});

// Определение модели для промежуточной таблицы корзины
const CartItem = sequelize.define('CartItem', {
  // Внешний ключ для связи с корзиной
  cart_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'id',
    },
    allowNull: false,
  },
  // Внешний ключ для связи с продуктом
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'product_id',
    },
    allowNull: false,
  },
}, {
  tableName: 'cart_items',
  timestamps: false,
});

// Установление связей между моделями
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Экспортирование моделей и подключения
module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
};
