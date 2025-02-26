import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { numCards } from "../GameTable/gametable";
import backgroundMusic from "../../sounds/background.mp3"; // Importar a música
import gameOverSound from "../../sounds/gameover.mp3"; // Importar o som de Game Over
import "./gamehud.css";

const Gamehud = ({ updateTime, setUpdateTime, cardsCount, setCardsCount, nivel, setNivel, points, setPoints }) => {
  const [seconds, setSeconds] = useState(60);
  const [tempText, setTempText] = useState(""); 
  const [tempText2, setTempText2] = useState(""); 
  const [prevPoints, setPrevPoints] = useState(points);
  const [isGameOver, setIsGameOver] = useState(false); // Estado para controlar o Game Over
  const navigate = useNavigate(); 

  // Referências para os áudios
  const bgMusicRef = useRef(new Audio(backgroundMusic));
  const gameOverSoundRef = useRef(new Audio(gameOverSound));

  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    const playMusic = () => bgMusic.play().catch(() => {});
    document.addEventListener("click", playMusic, { once: true });

    return () => {
      document.removeEventListener("click", playMusic);
      bgMusic.pause();
    };
  }, []);

  // Função para parar todos os sons
  const stopAllSounds = () => {
    const bgMusic = bgMusicRef.current;
    bgMusic.pause();
    bgMusic.currentTime = 0;
  };

  // Contagem regressiva
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  // Quando o tempo chega a zero (Game Over)
  useEffect(() => {
    if (seconds === 0) {
      stopAllSounds(); // Para todos os sons
      const gameOverSound = gameOverSoundRef.current;
      gameOverSound.volume = 0.5;
      gameOverSound.play(); // Toca som de Game Over

      setIsGameOver(true); // Ativa o estado de Game Over

      setTimeout(() => {
        alert(`Parabéns! Sua pontuação foi: ${points}`);
      }, 3500);
      
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [seconds, points, navigate]);

  // Atualiza o tempo quando updateTime muda
  useEffect(() => {
    if (updateTime !== 0) {
      setSeconds((prev) => Math.max(prev + updateTime, 0));
      setTempText(`+${updateTime}s`); 
      setUpdateTime(0); 

      setTimeout(() => {
        setTempText(""); 
      }, 500);
    }
  }, [updateTime, setUpdateTime]);

  // Atualiza os pontos e exibe um texto temporário
  useEffect(() => {
    if (points > prevPoints) {
      const pontosGanhados = points - prevPoints;
      setTempText2(`+${pontosGanhados} pontos`);
      
      setTimeout(() => {
        setTempText2("");
      }, 500);
    }
    setPrevPoints(points);
  }, [points, prevPoints]);

  useEffect(() => {
    if ((numCards * 2) === cardsCount) {
      setNivel((prev) => prev + 1);
      setCardsCount(0);
    }
  }, [cardsCount, setCardsCount, nivel, setNivel]);

  return (
    <div className="hud">
      <div className="tempo">
        Tempo: {seconds}
        {tempText && (
          <span style={{ color: "green", marginLeft: "10px" }}>
            {tempText}
          </span>
        )}
      </div>
      <div className="pontos">
        Pontos: {points}
        {tempText2 && (
          <span style={{ color: "green", marginLeft: "10px" }}>
            {tempText2}
          </span>
        )}
      </div>
      <div className="nivel">Nível: {nivel}</div>
      <div className="cartas">Cartas: {cardsCount}/{numCards * 2}</div>
      
      {isGameOver && (
        <div id="overlay" style={overlayStyle}></div>
      )}
    </div>
  );
};

// Estilo para o overlay
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999, 
};

export { Gamehud };
