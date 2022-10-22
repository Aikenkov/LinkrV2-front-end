import { useEffect, useState, useContext, React } from "react";
import UserContext from "../contexts/userContexts";
import { editPost } from "../Service/api";
import { toast } from "react-toastify";

export default function EditPostForm({
  id,
  text,
  setEditOpen,
  editText,
  setEditText,
}) {
  const { reload, setReload } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === "Escape") {
      setEditOpen(false);
      setEditText(text);
    }
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    setIsLoading(true);

    editPost({ text: editText }, id)
      .catch(() => {
        toast.error("Não foi possível salvar as alterações");
        setIsLoading(false);
        setEditOpen(true);
      })
      .then(() => {
        setEditOpen(false);
        setIsLoading(false);
        setReload(!reload);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder={text}
        type="text"
        name={text}
        value={editText}
        autoFocus
        onFocus={function (e) {
          var val = e.target.value;
          e.target.value = "";
          e.target.value = val;
        }}
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={(e) => setEditText(e.target.value)}
        disabled={isLoading}
      ></textarea>
    </form>
  );
}
