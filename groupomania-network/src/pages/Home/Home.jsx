// Page d'accueil(Home page)

import React, { useState } from 'react'
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

const ContainerPosts = styled.section`
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
    border-radius: 50px;
    @media (max-width: 455px) {
      width: 1.5em;
      position: relative;
      bottom: 2px;
    }
  }
`

const Home = (e) => {
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState(null)
  const [stateHeader, setstateHeader] = useState(false)
  const [stateDivLogo, setstateDivLogo] = useState(false)
  const [stateDivFaicon, setstateDivFaicon] = useState(false)

  const Id = useContext(Uidcontext)
  console.log(Id)

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

  axios
    .get(`${process.env.REACT_APP_API_URL}api/auth/${Id}`)
    .then((res) => {
      console.log(res.data)
      setUserId(res.data._id)
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
      <DivContainer>
        <Header className={stateHeader ? 'scroll' : ''}>
          <DivLogo className={stateDivLogo ? 'height bgr-white ' : ''}>
            <img src={logo} className="logo" alt="logo" />
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
        <ContainerPosts>
          <WritePost className="global">
            <div className="divH1">
              <h1>
                Bienvenue, <span>{email}</span>
              </h1>
            </div>
            <Postform user={email} />
          </WritePost>
          <PostsDisplay />
        </ContainerPosts>
      </DivContainer>
    )
  } else {
    window.location = '/login'
  }
}

export default Home
