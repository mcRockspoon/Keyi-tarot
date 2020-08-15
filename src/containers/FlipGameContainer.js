import React, { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const generatedId = () => Math.random().toString(36).substr(2, 9);

const generateList = (listFlipData) => {
  const flipcards = getShuffledArr(listFlipData);
  return flipcards.map((e) => {
    const freezeObj = Object.assign({}, e);
    freezeObj.id = generatedId();
    freezeObj.fliped = false;
    return freezeObj;
  });
};

const FlipGameContainers = ({ cards }) => {
  const [state, setState] = useState({
    cards: generateList(cards),
    gameTurn: 1,
    isWinned: false,
    onAnimation: false,
    isDone: 0
  });

  useEffect(() => {
    if (!state.isWinned && state.isDone === 4) {
      setState({ ...state, isWinned: true, onAnimation: true });
    }
  }, [state]);

  const viewFlipCard = (id) => {
    const cardsUpdate = state.cards.map((card) => {
      const copyCard = { ...card };
      if (copyCard.id === id) copyCard.fliped = true;
      return copyCard;
    });

    if (!state.onAnimation) {
      setState({
        ...state,
        cards: cardsUpdate,
        isDone: state.isDone + 1,
        onAnimation: state.gameTurn === 2
      });
    }
    return cardsUpdate;
  };

  const findCardsWin = (cardsUpdate, id) => {
    return {
      cardsToUpdate: cardsUpdate.map((card) => {
        const copyCard = { ...card };
        state.isDone++;
        return copyCard;
      })
    };
  };

  const toogleFlipCard = (id, cardsUpdate) => {
    const { cardsToUpdate } = findCardsWin(cardsUpdate, id);

    state.isDone++;

    if (!state.onAnimation && state.gameTurn === 2) {
      setTimeout(() => {
        setState({
          ...state,
          cards: cardsToUpdate,
          gameTurn: state.gameTurn === 1 ? 2 : 1,
          onAnimation: false
        });
      }, 650);
    }
  };

  const handleChange = (id) => {
    const cardUpdate = viewFlipCard(id);
    toogleFlipCard(id, cardUpdate);
  };

  const generateCards = () => {
    return Array.from(state.cards).map((cardInfo, id) => {
      return (
        <CardComponent
          key={id}
          handleChange={handleChange}
          cardInfo={cardInfo}
        />
      );
    });
  };

  const resetCards = () => {
    for (let i = state.cards.length - 1; i > 0; i--) {
      state.cards[i].fliped = false;
      state.isWinned = false;
    }
    return Array.from(state.cards).map((cardInfo, id) => {
      return (
        <CardComponent
          key={id}
          handleChange={handleChange}
          cardInfo={cardInfo}
        />
      );
    });
  };

  return (
    <div className="App">
      <h1>PICK FOUR CARDS</h1>
      {state.isWinned && <h3>TELL YOUR STORY!</h3>}
      {generateCards()}
      <h1>
        <button
          class="button"
          mat-raised-button
          color="primary"
          click={resetCards()}
        >
          Reset Cards
        </button>
      </h1>
    </div>
  );
};

export default FlipGameContainers;
