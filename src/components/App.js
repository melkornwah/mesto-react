import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {  
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({item: {}, isOpen: false});

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
    setSelectedCard({item: {}, isOpen: false});
  }

  function handleCardClick(card) {
    setSelectedCard({item: card, isOpen: true});
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm 
        type="form" 
        name="profile-photo" 
        title="Обновить аватар" 
        button="Сохранить" 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        children={
          <>
            <input type="url" name="link" className="popup__input" id="link-input" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error" id="link-input-error"></span>
          </>
        } 
        />
        <PopupWithForm 
        type="form" 
        name="profile" 
        title="Редактировать профиль" 
        button="Сохранить" 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        children={
          <>
            <input type="text" name="name" className="popup__input" id="name-input" placeholder="Ваше имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error" id="name-input-error"></span>
            <input type="text" name="job" className="popup__input" id="job-input" placeholder="Ваш род деятельности" minLength="2" maxLength="200" required />
            <span className="popup__input-error" id="job-input-error"></span>
          </>
        }
        />
        <PopupWithForm 
        type="form" 
        name="place" 
        title="Новое место" 
        button="Добавить" 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        children={
          <>
            <input type="text" name="name" className="popup__input" id="name-input" placeholder="Название" minLength="2" maxLength="40" required />
            <span className="popup__input-error" id="name-input-error"></span>
            <input type="url" name="link" className="popup__input" id="link-input" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error" id="link-input-error"></span>
          </>
        }
        />
        <PopupWithForm 
        type="confirm" 
        name="confirmation" 
        title="Вы уверены?" 
        button="Да" 
        isOpen={false} 
        onClose={closeAllPopups} 
        />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
