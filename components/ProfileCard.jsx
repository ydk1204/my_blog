import Image from "next/image";

const ProfileCard = ({ header, imgName, textBox }) => {
  return (
    <div className="profile_cardBox">
      <h3 className="text-5xl my-10 font-extrabold text-white">{header}</h3>
      <div className="profile_textBox flex flex-col items-start justify-center text-xl">
        {textBox.map((text, idx) => (
          <div className="flex items-start md:items-start" key={idx}>
            <Image
              src={`/profile_img/${imgName}.png`}
              width={30}
              height={30}
              alt={"소개 아이콘 이미지"}
              className={"mr-2 mt-2 md:mt-1"}
            />

            <div className="profile_text flex w-[40rem]">
              <div className="">
                <span className="yellow underline">{text}</span>
              </div>
              <Image
                src={`/profile_img/pencil_line.png`}
                width={30}
                height={30}
                alt={"커서 이미지"}
                className={"mr-2 mt-2 md:mt-1 profile_pencil"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
