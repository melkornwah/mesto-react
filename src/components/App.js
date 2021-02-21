import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import api from "../utils/api";
import { currentUser } from "../contexts/CurrentUserContext";

function App() {  
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupState] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({item: {}, isOpen: false});
  const [user, setUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setPlacePopupState(true);
  }
  
  function closeAllPopups() {
    setAvatarPopupState(false);
    setProfilePopupState(false);
    setPlacePopupState(false);
    setDeleteCardPopupState(false);
    setSelectedCard({item: {}, isOpen: false});
  }

  function handleCardClick(card) {
    setSelectedCard({item: card, isOpen: true});
  }

  function handleUpdateUser(formData) {
    api.updateUserInfo(formData)
      .then(data => {
        setUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(formData) {
    api.patchAvatar(formData)
      .then(data => {
        setUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCreateCard(formData) {
    api.postCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        const newCards = cards.filter((c) => {
          return !(c._id === card._id);
        });
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === user._id);

    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        const newCards = cards.map(
          (c) => c._id === card._id ? newCard : c
        );
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.loadInitialCards()
      .then(items => {
        setCards(items);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <currentUser.Provider value={user}>
      <div className="App">
        <div className="page">
          <Header />
          <Main 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            userInfo={user}
          />
          <Footer />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCreateCard={handleCreateCard}
          />
          <DeleteCardPopup 
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </currentUser.Provider>
  );
}

export default App;
