import React from 'react';

const NoteCard = ({
    note,
    onDelete,
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
          width: '230px',              // fixed width
          height: '200px',             // fixed height
          padding: '1rem',
          background: '#fff',
          borderRadius: '10px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
          whiteSpace: 'pre-wrap',
          cursor:'move',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
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
              WebkitLineClamp: 5, // show max 5 lines
              WebkitBoxOrient: 'vertical',
            }}
          >
            {note.content}
          </p>
        </div>
  
        {/* <div style={{ textAlign: 'right' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note._id);
            }}
            style={{
              padding: '4px 10px',
              background: '#f5f5f5',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            Delete
          </button>
        </div> */}
      </div>
    );
  };
  
  export default NoteCard;
  