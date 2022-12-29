import { useState, useEffect } from "react";

// Type match-up data
const pokemonTypes = {
  normal: {
    immune: ['ghost'],
    resists: ['rock', 'steel'],
    superEffective: []
  },
  fire: {
    immune: [],
    resists: ['fire', 'water', 'rock', 'dragon'],
    superEffective: ['grass', 'ice', 'bug', 'steel']
  },
  water: {
    immune: [],
    resists: ['water', 'grass', 'dragon'],
    superEffective: ['fire', 'ground', 'rock']
  },
  electric: {
    immune: [],
    resists: ['electric', 'grass', 'dragon'],
    superEffective: ['water', 'flying']
  },
  grass: {
    immune: [],
    resists: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    superEffective: ['water', 'ground', 'rock']
  },
  ice: {
    immune: [],
    resists: ['fire', 'water', 'ice', 'steel'],
    superEffective: ['grass', 'ground', 'flying', 'dragon']
  },
  fighting: {
    resists: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    superEffective: ['normal', 'ice', 'rock', 'dark', 'steel']
  },
  poison: {
    immune: [],
    resists: ['poison', 'ground', 'rock', 'ghost'],
    superEffective: ['grass', 'fairy']
  },
  ground: {
    immune: ['electric'],
    resists: ['grass', 'bug'],
    superEffective: ['fire', 'electric', 'poison', 'rock', 'steel']
  },
  flying: {
    immune: ['ground'],
    resists: ['electric', 'rock', 'steel'],
    superEffective: ['grass', 'fighting', 'bug']
  },
  psychic: {
    immune: [],
    resists: ['psychic', 'steel'],
    superEffective: ['fighting', 'poison']
  },
  bug: {
    immune: [],
    resists: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    superEffective: ['grass', 'psychic', 'dark']
  },
  rock: {
    immune: [],
    resists: ['fighting', 'ground', 'steel'],
    superEffective: ['fire', 'ice', 'flying', 'bug']
  },
  ghost: {
    immune: ['normal', 'fighting'],
    resists: ['dark'],
    superEffective: ['psychic', 'ghost']
  },
  dragon: {
    immune: [],
    resists: ['steel'],
    superEffective: ['dragon']
  },
  dark: {
    immune: ['psychic'],
    resists: ['fighting', 'dark', 'fairy'],
    superEffective: ['psychic', 'ghost']
  },
  steel: {
    immune: ['poison'],
    resists: ['fire', 'water', 'electric', 'steel'],
    superEffective: ['ice', 'rock', 'fairy']
  },
  fairy: {
    immune: ['dragon'],
    resists: ['fire', 'poison', 'steel'],
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
      weak = weak.concat(pokemonTypes[type2].resists);

      strong = strong.concat(pokemonTypes[type1].superEffective);
      weak = weak.concat(pokemonTypes[type1].resists);

      strong = [...new Set(strong)];
      weak = [...new Set(weak)];

      setStrong(strong);
      setWeak(weak);
    } else {
      strong = strong.concat(pokemonTypes[str].superEffective);
      weak = weak.concat(pokemonTypes[str].resists);
  
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

  return (
    <div>
      <p>
        {
          party[i].pokeType
            ? party[i].pokeType
            : null
        }
      </p>
      <p>
        {
          strong
        }
      </p>
      <p>
        {
          weak
        }
        </p>
    </div>
  );
};

export default TypeSlot;
