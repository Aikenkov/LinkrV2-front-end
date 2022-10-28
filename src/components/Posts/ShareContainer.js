import { React, useContext, useState } from "react";
import UserContext from "../contexts/userContexts";
import { deletePost, sharePost } from "../Service/api";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function ShareContainer({
  modalIsOpenShare,
  setIsOpenShare,
  id
}) {

  const { reload, setReload } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpenShare(false);
  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={modalIsOpenShare}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {loading ? (
          <Confirm>
            <ThreeDots color={"#1877f2"} height={70} width={50} />
          </Confirm>
        ) : (
          <Confirm>
            <h1>Are you sure you want to editar this post?</h1>

            <div>
              <ButtonNo onClick={closeModal}>No, go back</ButtonNo>
              <ButtonYes onClick={() => {sharePost(id);setIsOpenShare(false); setReload(reload + 1)}}>Yes, editar it</ButtonYes>
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
    width: "597px",
    height: "262px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50px",
    backgroundColor: "#333333",
  },
};

const Confirm = styled.h1`
  font-family: Lato;
  font-size: 34px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-top: 20px;
    color: #ffffff;
    width: 350px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 30px;
  }

  button {
    margin: 5px 13px;
    font-family: Lato;
    font-size: 18px;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 135px;
    height: 40px;
  }
`;

const ButtonNo = styled.button`
  background-color: #ffffff;
  color: #1877f2;
`;

const ButtonYes = styled.button`
  background-color: #1877f2;
  color: #ffffff;
`;
