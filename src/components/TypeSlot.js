import { useState, useEffect } from "react";

// Type match-up data
const pokemonTypes = {
  normal: {
    noEffect: ['ghost'],
    notEffective: ['rock', 'steel'],
    superEffective: []
  },
  fire: {
    noEffect: [],
    notEffective: ['fire', 'water', 'rock', 'dragon'],
    superEffective: ['grass', 'ice', 'bug', 'steel']
  },
  water: {
    noEffect: [],
    notEffective: ['water', 'grass', 'dragon'],
    superEffective: ['fire', 'ground', 'rock']
  },
  electric: {
    noEffect: [],
    notEffective: ['electric', 'grass', 'dragon'],
    superEffective: ['water', 'flying']
  },
  grass: {
    noEffect: [],
    notEffective: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    superEffective: ['water', 'ground', 'rock']
  },
  ice: {
    noEffect: [],
    notEffective: ['fire', 'water', 'ice', 'steel'],
    superEffective: ['grass', 'ground', 'flying', 'dragon']
  },
  fighting: {
    notEffective: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    superEffective: ['normal', 'ice', 'rock', 'dark', 'steel']
  },
  poison: {
    noEffect: [],
    notEffective: ['poison', 'ground', 'rock', 'ghost'],
    superEffective: ['grass', 'fairy']
  },
  ground: {
    noEffect: ['electric'],
    notEffective: ['grass', 'bug'],
    superEffective: ['fire', 'electric', 'poison', 'rock', 'steel']
  },
  flying: {
    noEffect: ['ground'],
    notEffective: ['electric', 'rock', 'steel'],
    superEffective: ['grass', 'fighting', 'bug']
  },
  psychic: {
    noEffect: [],
    notEffective: ['psychic', 'steel'],
    superEffective: ['fighting', 'poison']
  },
  bug: {
    noEffect: [],
    notEffective: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    superEffective: ['grass', 'psychic', 'dark']
  },
  rock: {
    noEffect: [],
    notEffective: ['fighting', 'ground', 'steel'],
    superEffective: ['fire', 'ice', 'flying', 'bug']
  },
  ghost: {
    noEffect: ['normal', 'fighting'],
    notEffective: ['dark'],
    superEffective: ['psychic', 'ghost']
  },
  dragon: {
    noEffect: [],
    notEffective: ['steel'],
    superEffective: ['dragon']
  },
  dark: {
    noEffect: ['psychic'],
    notEffective: ['fighting', 'dark', 'fairy'],
    superEffective: ['psychic', 'ghost']
  },
  steel: {
    noEffect: ['poison'],
    notEffective: ['fire', 'water', 'electric', 'steel'],
    superEffective: ['ice', 'rock', 'fairy']
  },
  fairy: {
    noEffect: ['dragon'],
    notEffective: ['fire', 'poison', 'steel'],
    superEffective: ['fighting', 'dragon', 'dark']
  }
};

const TypeSlot = (props) => {
  const { party, i } = props;
  const [strong, setStrong] = useState([]);
  const [weak, setWeak] = useState([]);

  const calculateTypeMatchups = str => {
    let strong = [];
    let weak = [];
    
    if (str.includes('/')) {
      const arr = str.slice().split('/');
      const type1 = arr[0];
      const type2 = arr[1];

      strong = strong.concat(pokemonTypes[type2].superEffective);
      weak = weak.concat(pokemonTypes[type2].notEffective);

      strong = strong.concat(pokemonTypes[type1].superEffective);
      weak = weak.concat(pokemonTypes[type1].notEffective);

      strong = [...new Set(strong)];
      weak = [...new Set(weak)];

      setStrong(strong);
      setWeak(weak);
    } else {
      strong = strong.concat(pokemonTypes[str].superEffective);
      weak = weak.concat(pokemonTypes[str].notEffective);
  
      strong = [...new Set(strong)];
      weak = [...new Set(weak)];
  
      setStrong(strong);
      setWeak(weak);
    }
  };

  useEffect((prevParty) => {
    if (prevParty !== party && party[i].pokeType) {
      calculateTypeMatchups(party[i].pokeType);
    }
  }, [i, party]);


  //TODO: Update strong/weak so they don't linger on the screen
  return (
    <ul className={`type-slot-${i + 1}`}>
      {
        party[i].pokeType
          ? <>
              <li>
                <h3>Type:</h3>
                <p>{party[i].pokeType}</p>
              </li>
              <li>
                <h3>Super Effective Against:</h3>
                <p>{strong.join(', ')}</p>
              </li>
              <li>
                <h3>Not Effective:</h3>
                <p>{weak.join(', ')}</p>
              </li>
            </>
          : null
      }
    </ul>
  );
};

export default TypeSlot;
