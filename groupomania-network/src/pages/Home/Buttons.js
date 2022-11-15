// Supprimer un élément
import trash from '../../assets/logo/trash-can.svg'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import axios from 'axios'

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    border: 2px solid ${colors.tertieryDark};
    background-color: ${colors.tertieryDark};
    box-shadow: 1px 1px 4px 0px #2e2626;
    color: white;
    border-radius: 16px;
    width: 3.8rem;
    margin: 5px 0 5px 0;
    cursor: pointer;
  }

  button: hover {
    font-weight: bold;
    border: 5px double ${colors.secondary};
    box-shadow: 1px 1px 4px 2px ${colors.tertieryDark};
  }
`

const Delete = styled.div`
  width: 2rem;
  img:hover {
    cursor: pointer;
    border-radius: 12px;
    transform: translateY(2px);
  }
`

function Buttons({ userId, Id, IdPost }) {
  const token = window.localStorage.getItem('token')

  // Fonction pour supprimer un post
  const handleDelete = async () => {
    console.log(IdPost)
    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${IdPost}`,
      data: userId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res) {
          console.log(res)
          window.location.reload()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <ContainerButtons>
      {userId === Id ? (
        <Delete onClick={handleDelete}>
          <img src={trash} alt="Supprimer" title="Supprimer" />
        </Delete>
      ) : null}
      {userId === Id ? <button>Modifier</button> : null}
      <button>Répondre</button>
    </ContainerButtons>
  )
}

export default Buttons
