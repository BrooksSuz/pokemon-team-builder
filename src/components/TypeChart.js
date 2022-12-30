import TypeSlot from "./TypeSlot";

const TypeChart = (props) => {
  const { party } = props;

  return (
    <div className='container type-chart'>
      <h2 
        style={{ position: 'absolute', alignSelf: 'flex-end' }}
      >
        Type Chart
      </h2>
      {
        Array.from(
          { length: 6 }, (_, index) => 
          <TypeSlot
            party={party}
            index={index}
            key={index}
          />
        )
      }
    </div>
  );
}

export default TypeChart;
