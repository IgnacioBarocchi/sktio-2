import EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
} from "emoji-picker-react";
import { useState } from "react";
import { useApplicationState } from "../../../containers/Context";
// @ts-ignore
export const SelectEmoji = ({ inputRef }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const { dispatch } = useApplicationState();

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
    dispatch({
      type: "UPDATE_UI_STATE",
      payload: {
        emojiPickerIsVisible: false,
      },
    });

    inputRef.current.value = inputRef.current.value
      ? `${inputRef.current.value}${emojiData.emoji}`
      : `${emojiData.emoji}`;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "-470px",
        left: "16px",
      }}
    >
      <div className="show-emoji">
        Selected Emoji
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </div>

      <EmojiPicker onEmojiClick={onClick} autoFocusSearch={false} />
    </div>
  );
};

export default SelectEmoji;
