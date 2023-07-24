const Container = (props) => {
  return (
    <>
      <main className={`w-full min-h-screen mt-5 md:mt-20 md:-z-10`}>
        {props.children}
      </main>
    </>
  );
};

export default Container;
