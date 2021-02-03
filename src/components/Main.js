import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {  
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [cardsArray, setCardsArray] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(user => {
        setUserAvatar(user.avatar);
        setUserName(user.name);
        setUserDescription(user.about);
      })
      .catch(err => {
        console.log(err);
      })
    api.loadInitialCards()
      .then(items => {
        const cards = [];
        items.forEach(card => {
          cards.push(<Card item={card} key={card._id} onImageClick={props.onCardClick} />);
        })
        setCardsArray(cards);
      })
      .catch(err => {
        console.log(err);
      })
  }, [props]);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <button className="button button_action_edit-photo" onClick={props.onEditAvatar}>
            <div className="profile__photo-edit" />
            <div className="profile__photo" style={{
              backgroundImage: `url(${userAvatar})`
            }} />
          </button>
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="button button_action_edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__desc">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="button button_action_add" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cardsArray}
        </ul>
      </section>
    </main>
  );
};

export default Main;