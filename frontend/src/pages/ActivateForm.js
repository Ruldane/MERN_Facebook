import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

export default function ActivateForm({ type, header, text, loading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === 'success' ? 'success_text' : 'error_text'
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <RingLoader color="#1876f2" loading={loading} size={100} />
      </div>
    </div>
  );
}
