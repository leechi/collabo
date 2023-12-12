import {atom, useAtom} from "jotai";

const postModalAtom = atom(false)
const updateModalAtom = atom(false)
const postIdAtom = atom("")
const applicationModalAtom = atom(false)
const profileModalAtom = atom(false)


const useModal = () => {
const [postModal, setPostModal] = useAtom(postModalAtom)
const [updateModal, setUpdateModal] = useAtom(updateModalAtom)
const [postId, setPostId] = useAtom(postIdAtom)
const [applicationModal, setApplicationModal] = useAtom(applicationModalAtom)
const [profileModal, setProfileModal] = useAtom(profileModalAtom)


  const handleProfile = () =>{
    setProfileModal(true)
  }

  const handleUpdate = (id) =>{
    setUpdateModal(true)
    setPostId(id)
  }

  const handleApplicationModal = () =>{
    setApplicationModal(true)
  }

    const handlePostModal = () =>{
        setPostModal(true)

    }
    const modalBubbling = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains('post-modal-bg')
      ) {
        setPostModal(false);
        setUpdateModal(false);
        setApplicationModal(false);
        setProfileModal(false);
      }
    };
    
  return {
    profileModal,
    modalBubbling,
    handlePostModal,
    postModal,
    setPostModal,
    setUpdateModal,
    updateModal,
    handleUpdate,
    postId,
    applicationModal,
    handleApplicationModal,
    handleProfile
  }
}

export default useModal