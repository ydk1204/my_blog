import Container from "../components/Container";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <Container>
        <Image
          src={"/404.svg"}
          width={100}
          height={100}
          alt={"에러 페이지 이미지"}
          className={"w-screen h-screen"}
        />
      </Container>
    </>
  );
};

export default NotFound;
