import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const NoteModal = ({ note, onClose, onEdit, onDelete, onUpdate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note?.title || '');
  const [editedContent, setEditedContent] = useState(note?.content || '');

  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (note) {
      setEditedTitle(note.title);
      setEditedContent(note.content);
    }
  }, [note]);

  if (!note) return null;

  const handleSave = () => {
    if (!editedTitle.trim() && !editedContent.trim()) {
      toast.error("Can't save an empty note")
      return;
    }
    onUpdate({ ...note, title: editedTitle, content: editedContent });
    toast.success('Edited Successfully')
    setEditMode(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '20px',
          width: '400px',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
      >
        {/* ⋮ Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            fontSize: '25px',
            cursor: 'pointer'
          }}
        >
          ⋮
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: '40px',
              right: '12px',
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              zIndex: 2000
            }}
          >
            <div
              onClick={() => {
                setEditMode(true);
                setMenuOpen(false);
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              ✏️ Edit
            </div>
            <div
              onClick={() => {
                onDelete(note._id);
                onClose();
              }}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              🗑️ Delete
            </div>
          </div>
        )}

        {/* Modal Content */}
        {editMode ? (
          <>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={8}
              placeholder="Content"
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                resize: 'none',
                whiteSpace: 'pre-wrap'
              }}
            />
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
              <button onClick={() => setEditMode(false)} style={{ marginRight: '10px' }}>
                Cancel
              </button>
              <button onClick={handleSave}>Save</button>
            </div>
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
            {/* <div style={{ textAlign: 'right', marginTop: '1rem' }}>
              <button onClick={onClose}>Close</button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default NoteModal;
