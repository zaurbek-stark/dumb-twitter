import React, { useRef } from 'react';

const Tweet = ({setInput, errorMsg}) => {
  const textareaRef = useRef(null);

  return (
    <div className="tweet-wrapper">
      <div className="input-box">
        <textarea ref={textareaRef} className="tweet-area" placeholder="What's happening?"/>
        <div className="privacy">
          <i className="fas fa-globe-asia"></i>
          <span>Everyone can reply</span>
        </div>
      </div>
      <span className="error-msg">{errorMsg}</span>
      <div className="bottom">
        <ul className="icons">
          <li><i className="far fa-file-image"></i></li>
          <li><i className="fas fa-map-marker-alt"></i></li>
          <li><i className="far fa-grin"></i></li>
          <li><i className="far fa-user"></i></li>
        </ul>
        <div className="content">
          <span className="counter">100</span>
          <button onClick={() => setInput(textareaRef.current.value)}>Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;