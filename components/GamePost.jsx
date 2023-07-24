import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const GamePost = ({ title = "", count, posts = [] }) => {
  const [slug, setSlug] = useState("");
  const imgRef = useRef(null);

  // 전체 포스트 중에서 같은 항목(ex_maple)의 포스트 선별
  useEffect(() => {
    getPath(title, posts).then((res) => setSlug(res));
  }, [title, posts]);

  const color = {
    "--clr": "#FF8000",
  };

  return (
    <>
      <div className="game_card" style={color}>
        <div className="game_imgBx">
          <Image
            src={"/postImg/mapleDefault.jpg"}
            width={400}
            height={400}
            alt={"메이플 썸네일"}
            onLoadingComplete={() => imgRef.current.remove()}
          />
          <div className="img-animation" ref={imgRef}></div>
        </div>
        <div className="game_content">
          <h2>메이플스토리</h2>
          <p>
            메이플 캐릭터 육성 및 컨텐츠를 즐기면서 생기는 일화 혹은 정보 등을
            포스팅합니다.
          </p>
          <Link href={`/${slug}`}>Read More</Link>
        </div>
      </div>
    </>
  );
};

export const getPath = async (title, posts) => {
  const slugs = await posts
    .filter((a) => a.note === title)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const slug = slugs[0]._raw.flattenedPath;
  return slug;
};

export default GamePost;
