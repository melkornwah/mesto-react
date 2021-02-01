function Main() {
  return(
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <button className="button button_action_edit-photo">
            <div className="profile__photo-edit" />
            <img src="#" alt="Фото профиля" className="profile__photo" />
          </button>
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button type="button" className="button button_action_edit" aria-label="Редактировать"></button>
            </div>
            <p className="profile__desc">Исследователь океана</p>
          </div>
        </div>
        <button type="button" className="button button_action_add" aria-label="Добавить"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        </ul>
      </section>
    </main>
  );
};

export default Main;