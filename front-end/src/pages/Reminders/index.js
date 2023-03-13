import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import exclude from './trash.png';
// pagina principal na qual o usuario fara seu logon
export default function Reminders() {

  const [reminders, setReminders] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    api.get('reminders'
    ).then(response => {
        setReminders(response.data);
      })
    }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      date,
    };

    try {
      await api.post('reminders', data)
    }
    catch (error) {
      alert('Erro ao cadastrar o lembrete, tente novamente');
    }  

    window.location.reload();
  }

  async function handleExclude(id) {
    try {
      await api.delete(`reminders/${id}`);
    }
      catch(error) {
          console.log('Erro ao apagar o lembrete, tente novamente ');
      }

    window.location.reload();
  }

  return (
    <body>
      <main>
        <section>
          <h1>Novo Lembrete</h1>

          <form>
            <label htmlFor="lembrete">
              Digite o nome do lembrete:
              <input
                type="text"
                placeholder="Nome do Lembrete"
                value={name}
                onChange={e => setName(e.target.value)}
              ></input>
            </label>

            <label htmlFor="lembrete">
              Digite a data do lembrete:
              <input
                type="date"
                placeholder="Data do Lembrete (no formato dd/mm/yyyy)"
                value={date}
                onChange={e => setDate(e.target.value)}
              ></input>

            </label>
            <button className="button" onClick={handleSubmit}>Criar</button>
          </form>

        </section>

        <section>
          <h1>Lista de Lembretes</h1>
          <ul>
            {reminders?.map(reminder => (
              <li key={reminder.id}>
                <p>
                  <strong>{reminder.name}</strong> - {reminder.date}
                  <img 
                    src={ exclude } 
                    onClick={()=>{handleExclude(reminder.id)}}
                    alt="trash-delete"
                    ></img>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </body>
  );
}