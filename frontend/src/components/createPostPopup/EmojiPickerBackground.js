import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const EmojiPickerBackground = ({
  text,
  setText,
  user,
  showPrev,
  type2,
  background,
  setBackground,
}) => {
  const [picker, setPicker] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const backgroundHandler = (index) => {
    backgroundRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
    setBackground(postBackgrounds[index]);
    backgroundRef.current.classList.add("bgHandler");
  };

  const removeBackground = () => {
    backgroundRef.current.style.backgroundImage = "";
    setBackground("");
    backgroundRef.current.classList.remove("bgHandler");
  };
  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];

  return (
    <div className={type2 ? "images_input" : undefined}>
      <div className={!type2 ? "flex_center" : undefined} ref={backgroundRef}>
        <textarea
          ref={textRef}
          placeholder={`What's on your mind ${user?.first_name}?`}
          className={`post_input ${type2 && "input2"}`}
          maxLength="250"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 30)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className={`${!type2 ? "post_emojis_wrap" : undefined}`}>
        {picker && (
          <div
            className={`comment_emojis_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src={"../../../icons/colorful.png"}
            alt="comment"
            onClick={() => {
              setShowBackground(!showBackground);
            }}
          />
        )}
        {!type2 && showBackground && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, index) => (
              <img
                src={bg}
                key={index}
                onClick={() => {
                  backgroundHandler(index);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : undefined}`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackground;
