import './Screen.css';

const Screen = ({ input="", prevInput="", symbol="" }) => {
  return (
    <>
      <div>
        <span style={{ display:'inline-block' }}>{prevInput}</span>
        <span style={{ display:'inline-block', paddingLeft:"1rem" }}>{symbol}</span>
      </div>
      {input}
    </>
  );

};

export default Screen;
