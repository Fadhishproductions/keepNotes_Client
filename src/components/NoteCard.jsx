import React from 'react';

const NoteCard = ({
  note,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        width: '230px',
        height: '200px',
        padding: '1rem',
        background: '#fff',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        whiteSpace: 'pre-wrap',
        cursor: 'move',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        // e.currentTarget.style.transform = 'translateY(-2px)'; // Optional lift effect
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        // e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ flexGrow: 1, overflow: 'hidden' }}>
        <h4
          style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: '1rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {note.title}
        </h4>
        <p
          style={{
            fontSize: '0.9rem',
            marginTop: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
