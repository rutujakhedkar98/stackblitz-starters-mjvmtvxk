const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./database.sqlite');

app.use(express.json());

app.get('/games', (req, res) => {
  db.all('SELECT * FROM games', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ games: rows });
  });
});

app.get('/games/details/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM games WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ game: row });
  });
});

app.get('/games/genre/:genre', (req, res) => {
  const genre = req.params.genre;
  db.all('SELECT * FROM games WHERE genre = ?', [genre], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ games: rows });
  });
});

app.get('/games/platform/:platform', (req, res) => {
  const platform = req.params.platform;
  db.all('SELECT * FROM games WHERE platform = ?', [platform], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ games: rows });
  });
});

app.get('/games/sort-by-rating', (req, res) => {
  db.all('SELECT * FROM games ORDER BY rating DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ games: rows });
  });
});

app.get('/players', (req, res) => {
  db.all('SELECT * FROM players', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ players: rows });
  });
});

app.get('/players/details/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM players WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ player: row });
  });
});

app.get('/players/platform/:platform', (req, res) => {
  const platform = req.params.platform;
  db.all(
    'SELECT * FROM players WHERE platform = ?',
    [platform],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ players: rows });
    }
  );
});

app.get('/players/sort-by-rating', (req, res) => {
  db.all('SELECT * FROM players ORDER BY rating DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ players: rows });
  });
});

app.get('/tournaments', (req, res) => {
  db.all('SELECT * FROM tournaments', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tournaments: rows });
  });
});

app.get('/tournaments/details/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM tournaments WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tournament: row });
  });
});

app.get('/tournaments/game/:id', (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM tournaments WHERE gameId = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tournaments: rows });
  });
});

app.get('/tournaments/sort-by-prize-pool', (req, res) => {
  db.all('SELECT * FROM tournaments ORDER BY prizePool DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ tournaments: rows });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
