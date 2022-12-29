const TweetInFeed = ({output}) => {
  return (
    <div className="tweet-wrapper tweet-in-feed-wrapper">
      <div className="input-box">
        <textarea disabled={true} className="tweet-area" placeholder="What's happening?">{output}</textarea>
      </div>
      <div className="bottom">
        <ul className="icons">
          <li><i className="far fa-comment"></i></li>
          <li><i className="fas fa-share"></i></li>
          <li><i className="far fa-heart"></i></li>
        </ul>
      </div>
    </div>
  );
};

export default TweetInFeed;