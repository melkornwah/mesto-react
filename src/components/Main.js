import React from "react";
import { userContext } from "../context/CurrentUserContext";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {  
  const user = React.useContext(userContext);

  const [cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
    api.loadInitialCards()
      .then(items => {
        items.forEach(card => {
          cardsArray.push(
          <Card item={card} 
          key={card._id} 
          onImageClick={props.onCardClick} 
          onLikeClick={handleCardLike} />
          );
        })
        setCards(cardsArray);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === user._id);

    console.log(isLiked);
  }

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <button className="button button_action_edit-photo" onClick={props.onEditAvatar}>
            <div className="profile__photo-edit" />
            <div className="profile__photo" style={{
              backgroundImage: `url(${user.avatar})`
            }} />
          </button>
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__name">{user.name}</h1>
              <button type="button" className="button button_action_edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__desc">{user.about}</p>
          </div>
        </div>
        <button type="button" className="button button_action_add" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards}
        </ul>
      </section>
    </main>
  );
};

export default Main;