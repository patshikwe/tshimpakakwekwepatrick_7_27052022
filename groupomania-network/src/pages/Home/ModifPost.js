// Fichier pour la modification des posts

import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import '../../styles/index.css'

// CSS pour textarea
const Textarea = styled.textarea`
  width: 100%;
  height: 145px;
  resize: none;
  overflow: auto;
  border: 12px double ${colors.tertieryDark};
  border-image: linear-gradient(
      ${colors.primary},
      ${colors.secondary},
      ${colors.tertieryDark},
      ${colors.secondary}
    )
    5;
  font-weight: bold;
`

// Conteneur image
const DivContainerImage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
`

// Cette fonction rçoit en paramètre des props
const ModifPost = ({
  postMessage,
  image,
  updatePost,
  IdPost,
  isButtonSendActived,
  messageReceivedIsUpdated,
}) => {
  console.log('Ici ModifPost', updatePost, IdPost)
  const postToEdit = updatePost && updatePost.postToEdit
  const [message, setMessage] = useState('')
  const [postPicture, setPostpicture] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // token stocké dans localstorage
  const token = window.localStorage.getItem('token')

  //condition pour afficher la saisie de texte à modifier
  const modifOnePost = postToEdit === IdPost

  /**
   * @param {string} postMessage => message posté(ceci est une props)
   * @param {string}  image => image provenant du backend (ceci est une props)
   * @param {string} IdPost => id du message posté
   * @param {string} userId => id utilisateur via useContext
   * @param {object} updatePost => composé de: isUpdating et postToEdit(id du message sélectionné)
   * @param {string} postToEdit => id du message sélectionné
   * @param {boolean} modifOnePost => condition de structe égalité entre 2 strings
   * @param {boolean} isButtonSendActived => props pour vérifier si le bouton envoyer est activé
   */

  /**
   * Fonction pour récupérer la saisie du texte
   */
  const handleModifMessage = (e) => {
    setMessage(e.target.value)
    console.log(e.target.value)
  }

  console.log(message, isButtonSendActived, postMessage)

  /**
   * Fonction pour récupérer l'url de l'image dans l'input file;
   * setPostpicture: fonction de useState pour afficher l'image avec postPicture;
   *  setImageUrl: fonction de useState pour envoyer l'url de l'image avec imageUrl.
   */
  const handlePicture = (e) => {
    e.preventDefault()
    setPostpicture(URL.createObjectURL(e.target.files[0]))
    setImageUrl(e.target.files[0])
  }

  // Condition pour envoyer la requête
  if (isButtonSendActived && modifOnePost) {
    const formData = new FormData()
    if (message !== postMessage && message !== null && message !== undefined) {
      console.log('messageValue =', message)
      formData.append('messageValue', `${message}`)
    }

    if (imageUrl !== null && imageUrl !== undefined) {
      formData.append('imageUrl', imageUrl)

      console.log('imageUrl')
    }
    console.log('condition pour envoyer la requête')
    const sendAxios = async () => {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/post/${IdPost}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      })
        .then((res) => {
          console.log(res)
          messageReceivedIsUpdated() //fonction de mis à jour appelée
        })
        .catch((error) => {
          console.log(error)
        })
    }
    sendAxios()
  }

  return (
    <>
      {modifOnePost ? (
        <>
          <Textarea
            onChange={(e) => {
              handleModifMessage(e)
            }}
            defaultValue={postMessage}
          />
          <div className="mrg-botm">
            <input
              className="input-image"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div>
          {postPicture ? (
            <DivContainerImage>
              <img
                src={postPicture}
                className="image bdr-img width-media "
                alt=""
              />
            </DivContainerImage>
          ) : null}
        </>
      ) : (
        <>
          <p>{postMessage}</p> {/*affiche les messages venant de PostsDisplay*/}
          {image ? (
            <DivContainerImage>
              <img src={image} className="image bdr-img width-media" alt="" />
            </DivContainerImage>
          ) : null}
        </>
      )}
    </>
  )
}

export default ModifPost
