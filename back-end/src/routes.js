const express = require('express');
const routes = express.Router();

const ReminderController = require('./controllers/reminderController');

// Rotas da aplicacao 
routes.get('/reminders', ReminderController.index);
routes.post ('/reminders', ReminderController.create);
routes.delete('/reminders/:id', ReminderController.delete);

module.exports = routes;

