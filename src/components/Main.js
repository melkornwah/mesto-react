import React from "react";
import { userContext } from "../context/CurrentUserContext";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {  
  const [cards, setCards] = React.useState([]);

  const user = React.useContext(userContext);
  
  React.useEffect(() => {
    api.loadInitialCards()
      .then(items => {
        setCards(items);
      })
      .catch(err => {
        console.log(err);
      })
  }, [user]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === user._id);

    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        const newCards = cards.filter((c) => {
          return !(c._id === card._id);
        })
        setCards(newCards);
      })
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
          {cards.map(card => (
            <Card
              item={card} 
              key={card._id} 
              onImageClick={props.onCardClick} 
              onLikeClick={handleCardLike}
              onDeleteClick={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;