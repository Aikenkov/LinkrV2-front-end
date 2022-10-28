import { React, useContext, useState } from "react";
import UserContext from "../contexts/userContexts";
import { sharePost } from "../Service/api";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function ShareContainer({
  modalIsOpenShare,
  setIsOpenShare,
  id,
}) {
  const { reload, setReload } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpenShare(false);
  }

  function sharePostConfirm() {
    setLoading(true);

    const promisse = sharePost(id);
    promisse.catch((response) => {
      console.log(response);
      setIsOpenShare(false);
      toast.error("Você já compartilhou este post!");
      console.log("nao foi")
    });
    promisse.then((p) => {
      setIsOpenShare(false);
      console.log("foi");
      setReload(reload => reload +1);
      window.location.reload();
    });

  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={modalIsOpenShare}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        {loading ? (
          <Confirm>
            <ThreeDots color={"#1877f2"} height={70} width={50} />
          </Confirm>
        ) : (
          <Confirm>
            <span>Do you want to re-post this link?</span>

            <div>
              <ButtonNo onClick={closeModal}>No, cancel</ButtonNo>
              <ButtonYes
                onClick={() => {
                  sharePostConfirm();
                }}
              >
                Yes, share!
              </ButtonYes>
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
  overlay: { zIndex: 5 },
};

const Confirm = styled.div`
  font-family: Lato;
  font-size: 34px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
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
