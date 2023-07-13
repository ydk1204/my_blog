const Container = (props) => {
  return (
    <>
      <main className={`w-full mt-20`}>{props.children}</main>
    </>
  );
};

export default Container;
