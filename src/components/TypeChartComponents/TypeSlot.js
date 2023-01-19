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
    noEffect: ['ground'],
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
    noEffect: ['ghost'],
    notEffective: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    superEffective: ['normal', 'ice', 'rock', 'dark', 'steel']
  },
  poison: {
    noEffect: ['steel'],
    notEffective: ['poison', 'ground', 'rock', 'ghost'],
    superEffective: ['grass', 'fairy']
  },
  ground: {
    noEffect: ['flying'],
    notEffective: ['grass', 'bug'],
    superEffective: ['fire', 'electric', 'poison', 'rock', 'steel']
  },
  flying: {
    noEffect: [],
    notEffective: ['electric', 'rock', 'steel'],
    superEffective: ['grass', 'fighting', 'bug']
  },
  psychic: {
    noEffect: ['dark'],
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
    noEffect: ['normal'],
    notEffective: ['dark'],
    superEffective: ['psychic', 'ghost']
  },
  dragon: {
    noEffect: ['fairy'],
    notEffective: ['steel'],
    superEffective: ['dragon']
  },
  dark: {
    noEffect: [],
    notEffective: ['fighting', 'dark', 'fairy'],
    superEffective: ['psychic', 'ghost']
  },
  steel: {
    noEffect: [],
    notEffective: ['fire', 'water', 'electric', 'steel'],
    superEffective: ['ice', 'rock', 'fairy']
  },
  fairy: {
    noEffect: [],
    notEffective: ['fire', 'poison', 'steel'],
    superEffective: ['fighting', 'dragon', 'dark']
  }
};

const TypeSlot = (props) => {
  const { party, index } = props;
  const [superEffective, setSuperEffective] = useState([]);
  const [notEffective, setNotEffective] = useState([]);
  const [noEffect, setNoEffect] = useState([]);

  // Receives a string and outputs a set of respective types
  const calculateTypeMatchups = str => {
    let superEffective = [];
    let notEffective = [];
    let noEffect =[];
    
    // If the pokemon has two types
    if (str.includes('/')) {
      const arr = str.slice().split('/');
      const type1 = arr[0];
      const type2 = arr[1];

      // Add type one effectiveness
      superEffective = superEffective.concat(pokemonTypes[type1].superEffective);
      notEffective = notEffective.concat(pokemonTypes[type1].notEffective);
      noEffect = noEffect.concat(pokemonTypes[type1].noEffect);

      // Add type two effectiveness
      superEffective = superEffective.concat(pokemonTypes[type2].superEffective);
      notEffective = notEffective.concat(pokemonTypes[type2].notEffective);
      noEffect = noEffect.concat(pokemonTypes[type2].noEffect);

      // If nothing to display, display "none"
      if (superEffective.length === 0) {
        superEffective = superEffective.concat('none');
      }

      if (notEffective.length === 0) {
        notEffective = notEffective.concat('none');
      }

      if (noEffect.length === 0) {
        noEffect = noEffect.concat('none');
      }

      // Remove any duplicate values
      superEffective = [...new Set(superEffective)];
      notEffective = [...new Set(notEffective)];
      noEffect = [...new Set(noEffect)];

      // Set the state variables
      setSuperEffective(superEffective);
      setNotEffective(notEffective);
      setNoEffect(noEffect);
      // If the pokemon has one type
    } else {
      // Add type effectiveness
      superEffective = superEffective.concat(pokemonTypes[str].superEffective);
      notEffective = notEffective.concat(pokemonTypes[str].notEffective);
      noEffect = noEffect.concat(pokemonTypes[str].noEffect);

      // If nothing to display, display "none"
      if (superEffective.length === 0) {
        superEffective = superEffective.concat('none');
      }

      if (notEffective.length === 0) {
        notEffective = notEffective.concat('none');
      }

      if (noEffect.length === 0) {
        noEffect = noEffect.concat('none');
      }

      // Remove any duplicate values
      superEffective = [...new Set(superEffective)];
      notEffective = [...new Set(notEffective)];
      noEffect = [...new Set(noEffect)];
      
      // Set the state variables
      setSuperEffective(superEffective);
      setNotEffective(notEffective);
      setNoEffect(noEffect);
    }
  };

  // On party or index update, calculate type matchups
  useEffect(prevParty => {
    if (prevParty !== party && party[index].pokeType) {
      calculateTypeMatchups(party[index].pokeType);
    }
  }, [party, index]);

  return (
    <div className={`type-slot-${index + 1}`}>
      {
        party[index].pokeType
          ? <>
              <h3>Type</h3>
              <span>{party[index].pokeType}</span>
              <h3>Super Effective Against</h3>
              {superEffective.map((type, i) => <span key={i}>{type}</span>)}
              <h3>Not Effective Against</h3>
              {notEffective.map((type, i) => <span key={i}>{type}</span>)}
              <h3>No Effect Against</h3>
              {noEffect.map((type, i) => <span key={i}>{type}</span>)}
            </>
          : null
      }
    </div>
  );
};

export default TypeSlot;
