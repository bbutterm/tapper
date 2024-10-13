import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [energy, setEnergy] = useState(100);
  const [showShop, setShowShop] = useState(false);
  const [autoClickerActive, setAutoClickerActive] = useState(false);
  const [autoClickerInterval, setAutoClickerInterval] = useState(3000); // Время автокликера в миллисекундах

  const handleClick = () => {
    if (energy > 0) {
      setScore(score + multiplier);
      setEnergy(energy - 1);
    }
  };

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setEnergy(Math.min(energy + 1, 100));
    }, 1000);

    if (autoClickerActive) {
      const autoClickInterval = setInterval(() => {
        setScore(score + multiplier);
      }, autoClickerInterval); // Используем autoClickerInterval

      return () => {
        clearInterval(energyInterval);
        clearInterval(autoClickInterval);
      };
    } else {
      return () => clearInterval(energyInterval);
    }
  }, [energy, autoClickerActive, autoClickerInterval]);

  const openShop = () => {
    setShowShop(true);
  };

  const closeShop = () => {
    setShowShop(false);
  };

  return (
    <div className="App">
      <div className="content-container">
        <div className="score-container">
          <Score score={score} multiplier={multiplier} energy={energy} />
        </div>
        <div className="center-container">
          <Clicker handleClick={handleClick} />
        </div>
        <div className="shop-button-container">
          <ShopButton onClick={openShop} />
        </div>
      </div>
      {showShop && (
        <Shop
          score={score}
          setScore={setScore}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          autoClickerActive={autoClickerActive}
          setAutoClickerActive={setAutoClickerActive}
          closeShop={closeShop}
          autoClickerInterval={autoClickerInterval}
          setAutoClickerInterval={setAutoClickerInterval}
        />
      )}
    </div>
  );
}

function Score({ score, multiplier, energy }) {
  return (
    <div className="score-container">
      <div className="score">Score: {score}</div>
      <div className="multiplier">Multiplier:X{multiplier}</div>
      <div className="energy-container">
        <div className="energy-bar">
          <div className="energy-fill" style={{ height: `${energy}%` }}></div>
        </div>
        <div className="energy-value">{energy}</div>
      </div>
    </div>
  );
}

function Clicker({ handleClick }) {
  return (
    <div onClick={handleClick}>
      <img src="https://cdn.icon-icons.com/icons2/1403/PNG/128/sodacanicon_97035.png" alt="Rocket" className="rocket" />
    </div>
  );
}

function ShopButton({ onClick }) {
  return (
    <button onClick={onClick} className="shop-button">
      Shop
    </button>
  );
}

function Shop({
  score,
  setScore,
  multiplier,
  setMultiplier,
  autoClickerActive,
  setAutoClickerActive,
  closeShop,
  autoClickerInterval,
  setAutoClickerInterval,
}) {
  const buyMultiplier2 = () => {
    if (score >= 200 && multiplier === 1) {
      setScore(score - 200);
      setMultiplier(2);
      closeShop();
    }
  };

  const buyMultiplier5 = () => {
    if (score >= 600 && multiplier < 5) {
      setScore(score - 600);
      setMultiplier(5);
      closeShop();
    }
  };

  const buyAutoClicker = () => {
    if (score >= 1000 && !autoClickerActive) {
      setScore(score - 1000);
      setAutoClickerActive(true);
      closeShop();
    }
  };

  return (
    <div className="shop">
      <div className="shop-header">
        <h2>Shop</h2>
        <button onClick={closeShop}>Close</button>
      </div>
      <div className="shop-item">
        <h3>Multiplier x2</h3>
        <p>Price: 200</p>
        <button
          onClick={buyMultiplier2}
          disabled={score < 200 || multiplier !== 1}
          className={score < 200 || multiplier !== 1 ? 'disabled-button' : ''}
        >
          Buy
        </button>
      </div>
      <div className="shop-item">
        <h3>Multiplier x5</h3>
        <p>Price: 600</p>
        <button
          onClick={buyMultiplier5}
          disabled={score < 600 || multiplier >= 5}
          className={score < 600 || multiplier >= 5 ? 'disabled-button' : ''}
        >
          Buy
        </button>
      </div>
      <div className="shop-item">
        <h3>Auto-Clicker</h3>
        <p>Price: 1000</p>
        <button
          onClick={buyAutoClicker}
          disabled={score < 1000 || autoClickerActive}
          className={score < 1000 || autoClickerActive ? 'disabled-button' : ''}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default App;