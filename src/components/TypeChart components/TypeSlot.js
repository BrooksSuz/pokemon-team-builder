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
  const { party, index } = props;
  const [superEffective, setSuperEffective] = useState([]);
  const [notEffective, setNotEffective] = useState([]);
  const [noEffect, setNoEffect] = useState([]);

  const calculateTypeMatchups = str => {
    let superEffective = [];
    let notEffective = [];
    let noEffect =[];
    
    if (str.includes('/')) {
      const arr = str.slice().split('/');
      const type1 = arr[0];
      const type2 = arr[1];

      superEffective = superEffective.concat(pokemonTypes[type2].superEffective);
      notEffective = notEffective.concat(pokemonTypes[type2].notEffective);
      noEffect = noEffect.concat(pokemonTypes[type2].noEffect);

      superEffective = superEffective.concat(pokemonTypes[type1].superEffective);
      notEffective = notEffective.concat(pokemonTypes[type1].notEffective);
      noEffect = noEffect.concat(pokemonTypes[type1].noEffect);

      superEffective = [...new Set(superEffective)];
      notEffective = [...new Set(notEffective)];
      noEffect = [...new Set(noEffect)];

      setSuperEffective(superEffective);
      setNotEffective(notEffective);
      setNoEffect(noEffect);
    } else {
      superEffective = superEffective.concat(pokemonTypes[str].superEffective);
      notEffective = notEffective.concat(pokemonTypes[str].notEffective);
      noEffect = noEffect.concat(pokemonTypes[str].noEffect);
  
      superEffective = [...new Set(superEffective)];
      notEffective = [...new Set(notEffective)];
      noEffect = [...new Set(noEffect)];
  
      setSuperEffective(superEffective);
      setNotEffective(notEffective);
      setNoEffect(noEffect);
    }
  };

  useEffect((prevParty) => {
    if (prevParty !== party && party[index].pokeType) {
      calculateTypeMatchups(party[index].pokeType);
    }
  }, [index, party]);

  return (
    <ul className={`type-slot-${index + 1}`}>
      {
        party[index].pokeType
          ? <>
              <li><h3>Type</h3></li>
              <li><p>{party[index].pokeType}</p></li>
              <li><h3>Super Effective Against</h3></li>
              <li>{superEffective.map((type, j) => <p key={j}>{type}</p>)}</li>
              <li><h3>Not Effective</h3></li>
              <li>{notEffective.map((type, j) => <p key ={j}>{type}</p>)}</li>
              <li><h3>No Effect</h3></li>
              <li>{noEffect.map((type, j) => <p key={j}>{type}</p>)}</li>
            </>
          : null
      }
    </ul>
  );
};

export default TypeSlot;
