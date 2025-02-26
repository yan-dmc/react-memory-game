import { useState, useEffect } from "react";
import "./gametable.css";

const cards = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
  "Pikachu",
  "Raichu",
  "Sandshrew",
  "Sandslash",
  "Nidoran-f",
  "Nidorina",
  "Nidoqueen",
  "Nidoran-m",
  "Nidorino",
  "Nidoking",
  "Clefairy",
  "Clefable",
  "Vulpix",
  "Ninetales",
  "Jigglypuff",
  "Wigglytuff",
  "Zubat",
  "Golbat",
  "Oddish",
  "Gloom",
  "Vileplume",
  "Paras",
  "Parasect",
  "Venonat",
  "Venomoth",
  "Diglett",
  "Dugtrio",
  "Meowth",
  "Persian",
  "Psyduck",
  "Golduck",
  "Mankey",
  "Primeape",
  "Growlithe",
  "Arcanine",
  "Poliwag",
  "Poliwhirl",
  "Poliwrath",
  "Abra",
  "Kadabra",
  "Alakazam",
  "Machop",
  "Machoke",
  "Machamp",
  "Bellsprout",
  "Weepinbell",
  "Victreebel",
  "Tentacool",
  "Tentacruel",
  "Geodude",
  "Graveler",
  "Golem",
  "Ponyta",
  "Rapidash",
  "Slowpoke",
  "Slowbro",
  "Magnemite",
  "Magneton",
  "Farfetchd",
  "Doduo",
  "Dodrio",
  "Seel",
  "Dewgong",
  "Grimer",
  "Muk",
  "Shellder",
  "Cloyster",
  "Gastly",
  "Haunter",
  "Gengar",
  "Onix",
  "Drowzee",
  "Hypno",
  "Krabby",
  "Kingler",
  "Voltorb",
  "Electrode",
  "Exeggcute",
  "Exeggutor",
  "Cubone",
  "Marowak",
  "Hitmonlee",
  "Hitmonchan",
  "Lickitung",
  "Koffing",
  "Weezing",
  "Rhyhorn",
  "Rhydon",
  "Chansey",
  "Tangela",
  "Kangaskhan",
  "Horsea",
  "Seadra",
  "Goldeen",
  "Seaking",
  "Staryu",
  "Starmie",
  "Mr-mime",
  "Scyther",
  "Jynx",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Magikarp",
  "Gyarados",
  "Lapras",
  "Ditto",
  "Eevee",
  "Vaporeon",
  "Jolteon",
  "Flareon",
  "Porygon",
  "Omanyte",
  "Omastar",
  "Kabuto",
  "Kabutops",
  "Aerodactyl",
  "Snorlax",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew",
];

const getImage = (name, version) => {
  try {
    return require(`../../images/${name}${version}.png`);
  } catch (error) {
    return null;
  }
};

const getUniqueCard = (usedCards) => {
  let pokemon, version, key;

  do {
    pokemon = cards[Math.floor(Math.random() * cards.length)];
    version = Math.floor(Math.random() * 9) + 1;

    while (version > 0 && !getImage(pokemon, version)) {
      version--;
    }

    key = `${pokemon}-${version}`;
  } while (usedCards.has(key) && version > 0);

  usedCards.add(key);
  return { pokemon, version };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export let numCards = 2;


const generateCards = () => {  
  const usedCards = new Set();
  const selectedCards = Array.from({ length: numCards }, () =>
    getUniqueCard(usedCards)
  );
  const duplicatedCards = [...selectedCards, ...selectedCards];
  shuffleArray(duplicatedCards);
  return duplicatedCards;
};

const Gametable = ({ setUpdateTime, setCardsCount, nivel, points, setPoints }) => {
  const [cards, setCards] = useState([]);
  const [paresName, setParesName] = useState([]);
  const [paresElement, setParesElement] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // Estado para controlar cartas viradas
  let cardsInTable;
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  
  if (nivel === 1) {
    numCards = 2;
    cardsInTable = isPortrait ? "repeat(2, 1fr) / repeat(2, 1fr)" : "repeat(2, 1fr) / repeat(2, 1fr)";
  } else if (nivel === 2) {
    numCards = 3;
    cardsInTable = isPortrait ? "repeat(3, 1fr) / repeat(2, 1fr)" : "repeat(2, 1fr) / repeat(3, 1fr)";
  } else if (nivel === 3) {
    numCards = 6;
    cardsInTable = isPortrait ? "repeat(4, 1fr) / repeat(3, 1fr)" : "repeat(3, 1fr) / repeat(4, 1fr)";
  } else if (nivel === 4) {
    numCards = 8;
    cardsInTable = isPortrait ? "repeat(4, 1fr) / repeat(4, 1fr)" : "repeat(4, 1fr) / repeat(4, 1fr)";
  } else if (nivel === 5) {
    numCards = 10;
    cardsInTable = isPortrait ? "repeat(5, 1fr) / repeat(4, 1fr)" : "repeat(4, 1fr) / repeat(5, 1fr)";
  } else if (nivel === 6) {
    numCards = 12;
    cardsInTable = isPortrait ? "repeat(6, 1fr) / repeat(4, 1fr)" : "repeat(4, 1fr) / repeat(6, 1fr)";
  } else if (nivel === 7) {
    numCards = 15;
    cardsInTable = isPortrait ? "repeat(6, 1fr) / repeat(5, 1fr)" : "repeat(5, 1fr) / repeat(6, 1fr)";
  }
  

  useEffect(() => {
    setCards([]); // Limpa o estado antes de gerar novas cartas
    setTimeout(() => {
      setCards(generateCards()); // Gera novas cartas
    }, 10); // Pequeno delay para garantir atualização

    setFlippedCards([]);
    setParesName([]);
    setParesElement([]);
  }, [nivel]);  

  const compararPar = (element, pkmName) => {
    // Atualiza os estados com os novos valores
    const newParesName = [...paresName, pkmName];
    const newParesElement = [...paresElement, element];
    setParesName(newParesName);
    setParesElement(newParesElement);
  
    // Verifica se há dois elementos para comparar
    if (newParesName.length === 2) {
      setTimeout(() => {
        if (newParesName[0] === newParesName[1]) {
          console.log("✅ Par encontrado");          
          newParesElement[0].style.pointerEvents = "none";
          newParesElement[1].style.pointerEvents = "none";
          setUpdateTime(2); // Aumenta o tempo em 2 segundos
          setCardsCount((prevCount) => prevCount + 2);
          setPoints((prevCount) => prevCount + (nivel * 200));


        } else {
          console.log("❌ Par não encontrado");
          newParesElement[0].classList.replace("flip", "unflip");
          newParesElement[1].classList.replace("flip", "unflip");
          newParesElement[0].style.pointerEvents = "auto";
          newParesElement[1].style.pointerEvents = "auto";
        }
        // Limpa os pares após verificar
        setParesName([]);
        setParesElement([]);
        setFlippedCards([]); // Reseta as cartas viradas
      }, 500);
    }
  };  

  const flip = (event) => {
    const element = event.currentTarget;
    if (flippedCards.length >= 2) return; // Evita cliques múltiplos

    element.style.pointerEvents = "none";
    element.classList.add("flip") || element.classList.replace("unflip", "flip");

    const firstChild = element.firstElementChild;
    const imageUrl = getComputedStyle(firstChild).backgroundImage;
    const pkmMatch = imageUrl
      .split("/")
      .pop()
      .match(/^[a-zA-Z]+\d?/);
    const pkmName = pkmMatch ? pkmMatch[0] : null;

    if (pkmName) {
      setFlippedCards((prev) => [...prev, element]); // Adiciona a carta virada ao estado
      compararPar(element, pkmName);
    }
  };

  return (
    <div className="gridbox" style={{gridTemplate: `${cardsInTable}`}}>
      {cards.map(({ pokemon, version }, index) => {
        const imageUrl =
          version > 0
            ? getImage(pokemon, version)
            : require(`../../images/Pikachu1.png`);

        return (
          <div
            onClick={flip}
            className="card"
            key={index}
          >
            <div
              className="cardFront"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="cardBack" />
          </div>
        );
      })}
    </div>
  );
};

export { Gametable };