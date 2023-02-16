import "./style.css";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "../ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
const CreatePostPopup = ({ user, setVisible }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

  const popup = useRef(null);
  useClickOutside(popup, () => {
    setVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      if (response === "ok") {
        setLoading(false);
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
        setLoading(false);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((image) => {
        return dataURItoBlob(image);
      });
      const path = `${user.username}/posts Images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      // get url from server Cloudinary
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      if (res === "ok") {
        setText("");
        setVisible(false);
        setImages([]);
        setLoading(false);
      } else {
        setError(response);
        setLoading(false);
      }
    } else if (text) {
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      if (response === "ok") {
        setLoading(false);
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
        setLoading(false);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="avatar" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src={"../../../icons/public.png"} alt="privacy" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackground
              user={user}
              setText={setText}
              text={text}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            user={user}
            setText={setText}
            text={text}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          disabled={loading}
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
        >
          {loading ? <PulseLoader color="#FFF" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
