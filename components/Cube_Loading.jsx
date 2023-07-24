const Loading = () => {
  const num0 = { "--i": 0 };
  const num1 = { "--i": 1 };
  const num2 = { "--i": 2 };
  const num3 = { "--i": 3 };
  return (
    <div className="loading_conteiner">
      <div className="loading_cube">
        <div className="loading_top"></div>
        <div>
          <span style={num0}></span>
          <span style={num1}></span>
          <span style={num2}></span>
          <span style={num3}></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
