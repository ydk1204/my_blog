import Container from "../components/Container";
import Image from "next/image";
import Link from "next/link";

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
        <div className="copyright">
          <Link
            target="_blank"
            href={
              "https://kr.freepik.com/free-vector/404-error-with-a-cute-animal-concept-illustration_7906236.htm#query=404&position=26&from_view=search&track=sph"
            }
          >
            이미지 제공 Freepik - storyset
          </Link>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
