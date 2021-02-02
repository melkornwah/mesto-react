import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main />
        <Footer />
        <div className="popup">
          <form className="popup__form modal" name="profile" noValidate>
            <div className="popup__container">
              <button type="button" name="close" className="button button_action_close" aria-label="Закрыть"></button>
              <div className="popup__admin">
                <h2 className="popup__heading">Редактировать профиль</h2>
                <fieldset className="popup__input-container">
                  <input type="text" name="name" className="popup__input" id="name-input" placeholder="Ваше имя" minLength="2" maxLength="40" required />
                  <span className="popup__input-error" id="name-input-error"></span>
                  <input type="text" name="job" className="popup__input" id="job-input" placeholder="Ваш род деятельности" minLength="2" maxLength="200" required />
                  <span className="popup__input-error" id="job-input-error"></span>
                </fieldset>
                <button type="submit" name="submit" className="popup__button button">Сохранить</button>
              </div>
            </div>
            <div className="popup__overlay"></div>
          </form>
          <form className="popup__form modal" name="place" noValidate>
            <div className="popup__container">
              <button type="button" name="close" className="button button_action_close" aria-label="Закрыть"></button>
              <div className="popup__admin">
                <h2 className="popup__heading">Новое место</h2>
                <fieldset className="popup__input-container">
                  <input type="text" name="name" className="popup__input" id="place-input" placeholder="Название" required />
                  <span className="popup__input-error" id="place-input-error"></span>
                  <input type="url" name="link" className="popup__input" id="link-input" placeholder="Ссылка на картинку" required />
                  <span className="popup__input-error" id="link-input-error"></span>
                </fieldset>
                <button type="submit" name="submit" className="popup__button button">Создать</button>
              </div>
            </div>
            <div className="popup__overlay"></div>
          </form>
          <form className="popup__form modal" name="profile-photo" noValidate>
            <div className="popup__container">
              <button type="button" name="close" className="button button_action_close" aria-label="Закрыть"></button>
              <div className="popup__admin">
                <h2 className="popup__heading">Обновить аватар</h2>
                <fieldset className="popup__input-container">
                  <input type="url" name="link" className="popup__input" id="photo-input" placeholder="Ссылка на изображение" required />
                  <span className="popup__input-error" id="photo-input-error"></span>
                </fieldset>
                <button type="submit" name="submit" className="popup__button button">Сохранить</button>
              </div>
            </div>
            <div className="popup__overlay"></div>
          </form>
          <div className="popup__image modal">
            <div className="image-container">
              <img src="#" alt="#" className="image-container__photo" />
              <h2 className="image-container__title">Название картинки</h2>
              <button type="button" className="button button_action_close" aria-label="Закрыть"></button>
            </div>
            <div className="popup__overlay"></div>
          </div>
          <div className="popup__delete modal">
            <div className="popup__container">
              <button type="button" name="close" className="button button_action_close" aria-label="Закрыть"></button>
              <div className="popup__admin">
                <h2 className="popup__heading">Вы уверены?</h2>
                <button type="submit" name="submit" className="popup__button button">Да</button>
              </div>
            </div>
            <div className="popup__overlay"></div>
          </div>
        </div>
        <template className="template template_type_el">
          <li className="element">
            <img src="#" alt="#" className="element__photo" />
            <div className="element__desc">
              <h2 className="element__name">Название карточки</h2>
              <div className="element__likes">
                <button type="button" className="button button_action_like" aria-label="Понравилось"></button>
                <p className="element__like-counter"></p>
              </div>
            </div>
            <button type="button" className="button button_action_delete" aria-label="Удалить"></button>
          </li>
        </template>
      </div>
    </div>
  );
}

export default App;