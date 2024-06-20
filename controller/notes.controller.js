import { query } from '../database/db.js';

//Membuat Notes Baru
export const createNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  try {
    const result = await query(sql, [title, datetime, note]);
    res.status(201).send(`Note added with ID: ${result.insertId}`);
  } catch (error) {
    res.status(500).send('Error creating note');
  }
};

//Menampilkan Semua Notes
export const getAllNotes = async (req, res) => {
  const sql = 'SELECT * FROM notes';
  try {
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    res.status(500).send('Error fetching notes');
  }
};

//Menampilkan Salah Satu Notes berdasarkan ID
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM notes WHERE id = ?';
  try {
    const results = await query(sql, [id]);
    if (results.length === 0) {
      res.status(404).send('Note not found');
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    res.status(500).send('Error fetching note');
  }
};

//Mengubah Notes (Judul, Tanggal, dan Catatan)
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  try {
    const result = await query(sql, [title, datetime, note, id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Note not found');
    } else {
      res.send('Note updated successfully');
    }
  } catch (error) {
    res.status(500).send('Error updating note');
  }
};

//Menghapus Note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM notes WHERE id = ?';
  try {
    const result = await query(sql, [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Note not found');
    } else {
      res.send('Note deleted successfully');
    }
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
};