import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { userContext } from "../context/CurrentUserContext";

function App() {  
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({item: {}, isOpen: false});
  const [currentUser, setCurrentUser] = React.useState({});

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

  function handleUpdateUser(formData) {
    api.updateUserInfo(formData)
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <userContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick}
            userInfo={currentUser}
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
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
    </userContext.Provider>
  );
}

export default App;
