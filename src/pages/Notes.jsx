import React, { useState } from 'react';
import {
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useReorderNotesMutation,
  useUpdateNoteMutation
} from '../features/notes/noteApi';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import AddNote from '../components/addNote';

const Notes = () => {
  const { data: notes = [], isLoading, isError } = useGetNotesQuery();
  const [createNote] = useCreateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [reorderNotes] = useReorderNotesMutation();
  const [updateNote] = useUpdateNoteMutation();

  const [selectedNote, setSelectedNote] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Fill all fields');

    try {
      await createNote({ title, content });
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Error adding note');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) await deleteNote(id);
  };

  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDrop = async (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedNotes = [...notes];
    const draggedNote = updatedNotes.splice(draggedIndex, 1)[0];
    updatedNotes.splice(dropIndex, 0, draggedNote);

    const reordered = updatedNotes.map((note, idx) => ({
      _id: note._id,
      position: idx
    }));

    await reorderNotes(reordered);
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  if (isLoading || isError) {
    return (
      <div
        style={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
          color: '#555'
        }}
      >
        {isLoading ? 'Loading...' : 'Failed to load notes'}
      </div>
    );
  }
  

  return (


    
    <div style={{  margin: 'auto', padding: '2rem' }}>
      <h2>Your Notes</h2>

      <AddNote onAdd={async ({ title, content }) => {
  try {
    await createNote({ title, content });
  } catch (err) {
    alert('Failed to create note');
  }
}} />

      <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    margin:''
  }}
>
  {notes.map((note, index) => (
    <NoteCard
    key={note._id}
    note={note}
    onDelete={handleDelete}
    onClick={() => {
      if (!isDragging) setSelectedNote(note);
    }}
    onDragStart={() => {
      setIsDragging(true);
      handleDragStart(index);
    }}
    onDragOver={handleDragOver}
    onDrop={(e) => {
      handleDrop(index);
      setTimeout(() => setIsDragging(false), 100); // reset after drop
    }}
  />
  
  ))}
</div>
<NoteModal
  note={selectedNote}
  onClose={() => setSelectedNote(null)}
  onEdit={() => {}}
  onDelete={handleDelete}
  onUpdate={async (updatedNote) => {
    await updateNote(updatedNote);
    setSelectedNote(null);
  }}
/>
    </div>
  );
};

export default Notes;
