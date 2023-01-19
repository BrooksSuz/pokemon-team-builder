import TypeSlot from "./TypeSlot";

const TypeChart = (props) => {
  const { party } = props;

  return (
    <div className='container type-chart'>
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
