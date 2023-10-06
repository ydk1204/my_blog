const Container = (props) => {
  return (
    <>
      <main className={`w-full min-h-screen md:-z-10`}>{props.children}</main>
    </>
  );
};

export default Container;
