import TypeSlot from "./TypeSlot";

// TODO: Need to make party.type into an object.
// OR: Need to make calculateTypeMatchups receive a string input instead.
const TypeChart = (props) => {
  const { party } = props;

  return (
    <div className='container type-chart'>
      <h2 style={{ position: 'absolute', alignSelf: 'flex-start' }}>Type Chart</h2>
      {
        Array.from(
          { length: 6 }, (_, i) => 
          <TypeSlot
            party={party}
            i={i}
            key={i}
          />
        )
      }
    </div>
  );
}

export default TypeChart;
