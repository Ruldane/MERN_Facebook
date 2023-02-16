import EmojiPickerBackground from "./createPostPopup/EmojiPickerBackground";
import { useRef } from "react";

const ImagePreview = ({
  text,
  user,
  setText,
  showPrev,
  images,
  setImages,
  setShowPrev,
  setError,
}) => {
  const imageInputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((image) => {
      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/png" &&
        image.type !== "image/gif" &&
        image.type !== "image/webp"
      ) {
        setError(`${image.name} format is unsupported.`);
        files = files.filter((file) => file.name !== image.name);
        return;
      } else if (image.size > 1024 * 1024 * 5) {
        files = files.filter((file) => file.name !== image.name);
        setError(`${image.name} is too large. Size should be less than 5MB.`);
      }
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground
        user={user}
        setText={setText}
        text={text}
        showPrev={showPrev}
        type2
      />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((image, i) => (
                <img src={image} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"> </i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"> </i>
              </div>
              <span>Add Photos/videos</span>
              <span>Or Drag and Drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add Photos from your mobile device.</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
