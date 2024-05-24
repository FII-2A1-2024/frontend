import { useState } from "react";
import { useTranslation } from "react-i18next";

const CommentsForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const onCancel = () => {
    setText("");
    handleCancel();
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("addComment")}
      />
      <div className="comment-form-buttons">
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={onCancel}
        >
          {t("cancel")}
        </button>
        <button
          className="comment-form-button comment-form-addComment-button"
          disabled={isTextareaDisabled}
        >
          {t("comment")}
        </button>
      </div>
    </form>
  );
};

export default CommentsForm;
