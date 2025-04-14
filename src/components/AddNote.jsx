import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';


const AddNote = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const wrapperRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
  
    if (!trimmedTitle && !trimmedContent) {
       toast.error("Note can't be empty")
      return;
    }
    onAdd({ title: trimmedTitle, content: trimmedContent });
  setTitle('');
  setContent('');
  setIsExpanded(false);
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      if (!title && !content) setIsExpanded(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.15)',
        padding: '12px 16px',
        maxWidth: '600px',
        margin: '0 auto 1.5rem',
        background: '#fff',
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={() => setIsExpanded(true)}
    >
      <form onSubmit={handleSubmit}>
  {isExpanded && (
    <input
      type="text"
      placeholder="Title"
      required
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        marginBottom: '8px',
      }}
    />
  )}

  <textarea
    placeholder="Take a note..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
    rows={isExpanded ? 3 : 1}
    style={{
      width: '100%',
      border: 'none',
      outline: 'none',
      fontSize: '1rem',
      resize: 'none',
      background: 'transparent',
    }}
    onFocus={() => setIsExpanded(true)}
  />

  {isExpanded && (
    <div style={{ textAlign: 'right', marginTop: '8px' }}>
      <button
        type="submit"
        style={{
          padding: '6px 12px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          backgroundColor: '#f1f3f4',
        }}
        disabled={!content.trim() && !title.trim()}
      >
        Add
      </button>
    </div>
  )}
</form>

    </div>
  );
};

export default AddNote;
