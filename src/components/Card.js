function Card(props) {
  function handleClick() {
    props.onImageClick(props.item);
  }

  return(
    <li className="element">
      <div className="element__photo" style={{
        backgroundImage: `url(${props.item.link})`
      }} onClick={handleClick} />
      <div className="element__desc">
        <h2 className="element__name">{props.item.name}</h2>
        <div className="element__likes">
          <button type="button" className="button button_action_like" aria-label="Понравилось"></button>
          <p className="element__like-counter">{props.item.likes.length}</p>
        </div>
      </div>
      <button type="button" className="button button_action_delete" aria-label="Удалить"></button>
    </li>
  );    
}

export default Card;