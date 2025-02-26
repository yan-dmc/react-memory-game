import { Gametable } from "../components/GameTable/gametable";
import { Gamehud } from "../components/GameHud/gamehud";
import { useState, useRef, useEffect } from "react";
import "../style.css";
import find from "../sounds/find.mp3"; // Importa o efeito sonoro

function Game() {
    const effectRef = useRef(new Audio(find)); // Cria um elemento de áudio para o efeito sonoro
  
    const [updateTime, setUpdateTime] = useState(0);
    const [cardsCount, setCardsCount] = useState(0);
    const [points, setPoints] = useState(0);
    const [nivel, setNivel] = useState(1);

    // Toca o efeito sonoro sempre que "points" mudar
    useEffect(() => {
            effectRef.current.currentTime = 0.5; // Reinicia o som caso já esteja tocando
            effectRef.current.volume = 0.5;
            effectRef.current.play();
    }, [points]);

    return (
        <div className="Game">
            <Gamehud
                cardsCount={cardsCount} setCardsCount={setCardsCount}
                points={points}         setPoints={setPoints}
                nivel={nivel}           setNivel={setNivel}
                updateTime={updateTime} setUpdateTime={setUpdateTime} />

            <Gametable
                nivel={nivel}
                points={points}         setPoints={setPoints}
                setUpdateTime={setUpdateTime} setCardsCount={setCardsCount}/>
        </div>
    );
}

export { Game };
