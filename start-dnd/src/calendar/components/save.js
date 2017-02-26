render() {
  return (
    <div className="calendar-content-events">
      {this.state.cards.map((card, i) =>
        <Event
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={this.moveCard}
        />
      )}
    </div>);
}