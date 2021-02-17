function PopupWithForm(props) {
  return(
    <div className="popup">
      <form className={props.isOpen ? `popup__${props.type} modal modal_is-opened` : `popup__${props.type} modal`} name={`${props.name}`} onClick={props.onClose} noValidate>
        <div className="popup__container">
          <button type="button" name="close" className="button button_action_close" aria-label="Закрыть" onClick={props.onClose}></button>
          <div className="popup__admin">
            <h2 className="popup__heading">{props.title}</h2>
            <fieldset className="popup__input-container">
              {props.children}
            </fieldset>
            <button type="submit" name="submit" className="popup__button button">{props.button}</button>
          </div>
        </div>
        <div className="popup__overlay"></div>
      </form>
    </div>
  );
};

export default PopupWithForm;
