// Page d'accueil(Home page)

import React, { useState, useEffect, useCallback } from 'react'
import logo from '../../assets/logo/icon-left-font-monochrome-black.svg'
import user from '../../assets/logo/circle-user.svg'
import Logout from '../Auth/Logout'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Header } from '../../components/Header/HeaderNav'
import { DivLogo } from '../../components/Header/HeaderNav'
import { Uidcontext } from '../../utils/HomeContext'
import Postform from './PostForm'
import PostsDisplay from './PostsDisplay'

import axios from 'axios'
import '../../styles/index.css'
import { useContext } from 'react'
import { WritePost } from '../../utils/style/WritePost'
import Loading from '../../utils/Loading'
import Load from '../../utils/Load'
import Hide from '../../utils/Hide'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 5px;
  width: auto;
  height: auto;
  img {
    object-fit: cover;
  }
`

const ContainerPosts = styled.section`
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  box-shadow: #23272b3d 2px 3px 3px;
  position: relative;
  left: 6%;
  width: 90%;
  height: auto;

  // div containeur du h1
  .divH1 {
    width: 100%;
    height: 40px;
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
    animation: displayUser 5s;
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
    border-radius: 50px;
    @media (max-width: 455px) {
      width: 1.5em;
      position: relative;
      bottom: 2px;
    }
  }
`

const Home = (e) => {
  const [email, setEmail] = useState(null)
  const [stateHeader, setstateHeader] = useState(false)
  const [stateDivLogo, setstateDivLogo] = useState(false)
  const [stateDivFaicon, setstateDivFaicon] = useState(false)
  const [message, setmessage] = useState(null)
  const [isDataLoading, setDataLoading] = useState(false)

  // Récupération de token stocké dans localStorage
  const token = window.localStorage.getItem('token')

  // Récupération Id utilisateur stocké dans useContext
  const Id = useContext(Uidcontext)

  /** Fonction pour changer le CSS au scroll */
  const changeCssScroll = () => {
    if (window.scrollY > 100) {
      setstateHeader(true)
      setstateDivLogo(true)
      setstateDivFaicon(true)
    } else {
      setstateHeader(false)
      setstateDivLogo(false)
      setstateDivFaicon(false)
    }
  }

  window.addEventListener('scroll', changeCssScroll)

  // Fonction pour remonter l'information de l'enfant au parent
  const onUpdate = (post) => {
    const messageUpdate = post
    setmessage(messageUpdate)
  }

  const sendAxios = useCallback(async () => {
    setDataLoading(true)
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/${Id}`)
      .then((res) => {
        setEmail(res.data.email)
        setDataLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [Id])

  useEffect(() => {
    sendAxios()
  }, [sendAxios])

  // condition pour sécuriser la session
  if (token && Id !== null) {
    return (
      <DivContainer>
        <Header className={stateHeader ? 'scroll' : ''}>
          <DivLogo className={stateDivLogo ? 'height bgr-white ' : ''}>
            <img src={logo} className="logo" alt="logo Groupomania" />
          </DivLogo>
          <DivFaIcon className={stateDivFaicon ? 'bgr-white' : ''}>
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
        {isDataLoading ? (
          <Loading />
        ) : (
          <ContainerPosts>
            <div className="divH1">
              <h1>
                Bienvenue, <span>{email}</span>
              </h1>
            </div>
            <WritePost className="global">
              <Postform user={email} onUpdate={onUpdate} />
            </WritePost>
            <Load />
            {/* Spinner pour le chargement de la page */}
            <Hide />
            {/* Rideau occultant */}
            <PostsDisplay onUpdate={message} />
          </ContainerPosts>
        )}
      </DivContainer>
    )
  } else {
    window.location = '/login'
  }
}

export default Home
