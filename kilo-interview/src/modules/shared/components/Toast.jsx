import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const getToastStyle = () => {
    switch (type) {
      case 'error':
        return { backgroundColor: '#f56565', color: 'white' };
      case 'success':
        return { backgroundColor: '#48bb78', color: 'white' };
      case 'warning':
        return { backgroundColor: '#ed8936', color: 'white' };
      default:
        return { backgroundColor: '#4299e1', color: 'white' };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 1000,
        ...getToastStyle(),
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: '10px',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;