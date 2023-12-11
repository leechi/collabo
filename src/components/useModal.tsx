import {atom, useAtom} from "jotai";

const postModalAtom = atom(false)

const useModal = () => {
const [postModal, setPostModal] = useAtom(postModalAtom)



    const handlePostModal = () =>{
        setPostModal(true)

    }
    const modalBubbling = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains('post-modal-bg')
      ) {
        setPostModal(false);
      }
    };
    
  return {
    modalBubbling,
    handlePostModal,
    postModal
  }
}

export default useModal