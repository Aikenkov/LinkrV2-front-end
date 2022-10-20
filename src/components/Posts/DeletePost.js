import { React, useContext, useState } from "react";
import UserContext from "../contexts/userContexts";
import { deletePost } from "../Service/api";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function ModalContainer({ modalIsOpen, setIsOpen, id }) {
  const { reload, setReload } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function deletePostConfirm() {
    setLoading(true);

    deletePost(id)
      .catch((response) => {
        console.log(response);
        setIsOpen(false);
        toast.error("Não foi possível excluir o post!");
      })
      .then(() => {
        setIsOpen(false);
        setReload(!reload);
      });
  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {loading ? (
          <Confirm>
            <ThreeDots color={"#1877f2"} height={70} width={50} />
          </Confirm>
        ) : (
          <Confirm>
            <h1>Tem certeza que deseja deletar seu post?</h1>

            <div>
              <button onClick={deletePostConfirm}>Sim</button>
              <button onClick={closeModal}>Não</button>
            </div>
          </Confirm>
        )}
      </Modal>
    </>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "25%",
    height: "12%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    "border-radius": "15px",
  },
};

const Confirm = styled.h1`
  font-family: Lato;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 8px;
    margin-top: 8px;
  }

  button {
    margin: 5px 2.5px;
    background-color: #1877f2;
    color: white;
    font-family: Lato;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    width: 60px;
    height: 28px;
    cursor: pointer;
  }
`;
