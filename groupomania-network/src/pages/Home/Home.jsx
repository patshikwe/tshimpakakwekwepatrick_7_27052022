// Page d'accueil(Home page)

import React from 'react'
import logo from '../../assets/logo/icon-left-font-monochrome-black.svg'
import user from '../../assets/logo/circle-user.svg'
import Logout from '../Auth/Logout'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Header } from '../../components/Header/HeaderNav'
import { DivLogo } from '../../components/Header/HeaderNav'
import { Uidcontext } from '../../utils/HomeContext'
import { useState } from 'react'
import Postform from './PostForm'
import axios from 'axios'
// import cadre from '../../assets/img/vintage-wooden-squa-white-background.jpg'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 5px;
  width: auto;
  img {
    object-fit: cover;
  }
`

const ContainerPosts = styled.div`
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  box-shadow: #23272b3d 2px 3px 3px;
  position: relative;
  left: 6%;
  width: 90%;
  height: 1550px;
`

const DivFaIcon = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 4px;
`
const DivUser = styled.div`
  display: grid;
  .user {
    width: 2em;
    border-radius: 10px;
    @media (max-width: 455px) {
      width: 1.5em;
      position: relative;
      bottom: 2px;
    }
  }
`
const WritePost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.primary};
  box-shadow: #23272b3d 2px 3px 3px;
  border-radius: 10px;
  width: 80%;
  height: auto;
  position: relative;
  left: 10%;
  margin-top: 10px;

  // div containeur du h1
  .divH1 {
    width: 86%;
    height: 120px;
    position: relative;
    @media (max-width: 1024px) {
      height: 100px;
    }
  }

  // Animation du span enfant h1
  @keyframes displayUser {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.15;
    }
    50% {
      opacity: 0.25;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  h1 span {
    color: ${colors.primary};
    animation: displayUser 3.5s;
  }

  h1 {
    padding-top: 10px;
    text-align: center;
    letter-spacing: 0.1em;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 580px) {
      font-size: 1em;
    }
  }

  form {
    display: grid;
    height: auto;
    // @media (min-width: 1200px) {
    //   margin-top: 3%;
    // }
    @media (max-width: 855px) {
      position: relative;
      bottom: 9px;
    }
    @media (max-width: 455px) {
      margin-top: 0;
      position: relative;
      top: -28px;
    }
  }

  // input(saisie texte)
  textarea {
    overflow: auto;
    border: 12px double ${colors.tertieryDark};
    border-image: linear-gradient(
        ${colors.primary},
        ${colors.secondary},
        ${colors.tertieryDark},
        ${colors.secondary}
      )
      5;
    padding: 5px;
    box-shadow: #23272b3d 2px 3px 3px;
    width: 75%;
    height: 10rem;
    position: relative;
    left: 10%;
    font-weight: bold;
    @media (max-width: 455px) {
      height: 6rem;
    }
  }

  // Prévisualisation lors de saisie
  .card-container {
    width: 75%;
    height: auto;
    position: relative;
    left: 10%;
    top: 1px;
    border: 3px solid ${colors.secondary};
    border-image: linear-gradient(
        ${colors.primary},
        #4ac4ec,
        ${colors.secondary},
        ${colors.tertieryDark}
      )
      5;
    box-shadow: #23272b3d 2px 3px 3px;
    border-radius: 8px;
  }

  // carte contenant image, email et date
  .cardInfoUser {
    display: flex;
    justify-content: space-between;
  }

  // carte image
  .card-left {
    width: 2em;
    img {
      border-radius: 10px;
    }
  }

  // info utilisateur(email)
  .info-user {
    h3 {
      text-shadow: ${colors.secondary} 2px 3px 3px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 500px) {
      width: 4em;
      h3 {
        font-size: 0.8em;
      }
    }
  }

  // affichage date
  .date {
    width: 8em;
    @media (max-width: 580px) {
      width: 7em;
      span {
        font-size: 0.7em;
      }
    }
  }

  // contenu du message
  .message-content {
    display: grid;
    grid-template-columns: 50% 50%;
    border: #744610 3px solid;
    border-image: linear-gradient(
        ${colors.primary},
        #4ac4ec,
        ${colors.secondary},
        ${colors.tertieryDark}
      )
      5;
    div {
      width: 100%;
      display: flex;
    }

    .divMessage {
      overflow: auto;
    }

    .divPicture {
      img {
        width: 100%;
        @media (max-width: 455px) {
          width: 98%;
        }
      }
    }
  }

  // classe générale
  .background {
    text-align: center;
    border: 1px solid ${colors.primary};
    border-radius: 20px;
    box-shadow: #23272b3d 2px 3px 3px;
    background-color: white;
    font-weight: bold;
  }

  // input file enfant div .containerImage
  .inputImage {
    position: relative;
    height: 26px;
    left: 10%;
    width: 186px;
    border: 1px solid ${colors.primary};
    box-shadow: #23272b3d 2px 3px 3px;
    cursor: pointer;
    font-weight: bold;
    @media (max-width: 699px) {
      width: 160px;
    }
    @media (max-width: 314px) {
      width: 141px;
    }
  }

  /* style groupé: input(envoyé), btn(annuler les messages) 
  et inputImage 
  */

  .send,
  .top,
  .inputImage {
    :hover {
      background-color: ${colors.primary};
      color: white;
      border: 1px solid ${colors.tertieryDark};
    }
  }

  // btn pour annuler les messages
  .top {
    width: 100px;
    height: 25px;
    position: relative;
    left: 10%;
    cursor: pointer;
  }

  // input(envoyé)
  .send {
    position: relative;
    top: 5%;
    left: 65%;
    width: 20%;
    height: 25px;
    cursor: pointer;
    @media (min-width: 455px) {
      // top: -28px;
    }
    @media (max-width: 455px) {
      width: 35%;
      left: 50%;
    }
  }
`

const Home = () => {
  const [userId, setuserId] = useState(null)
  const [email, setEmail] = useState(null)
  let params = new URLSearchParams(window.location.search)
  let Id = params.get('userId')
  console.log(Id)

  axios
    .get(`http://localhost:5000/api/auth/${Id}`)
    .then((res) => {
      console.log(res.data)
      setuserId(res.data._id)
      setEmail(res.data.email)
    })
    .catch((err) => {
      console.log(err)
    })

  console.log(userId)

  const token = window.localStorage.getItem('token')

  // condition pour sécuriser la session
  if (token && Id !== null) {
    return (
      <Uidcontext.Provider value={userId}>
        <DivContainer>
          <Header>
            <DivLogo>
              <img src={logo} className="logo" alt="logo" />
            </DivLogo>
            <DivFaIcon>
              <DivUser>
                <img
                  src={user}
                  className="user"
                  alt="logo utilisateur"
                  title="Profil"
                />
              </DivUser>
              <Logout />
            </DivFaIcon>
          </Header>
          <ContainerPosts>
            <WritePost>
              <div className="divH1">
                <h1>
                  Bienvenue, <span>{email}</span>
                </h1>
              </div>
              <Postform user={email} />
            </WritePost>
            <div>post</div>
          </ContainerPosts>
        </DivContainer>
      </Uidcontext.Provider>
    )
  } else {
    window.location = '/login'
  }
}

export default Home
