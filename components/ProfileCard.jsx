import Image from "next/image";

const ProfileCard = ({ header, imgName, textBox }) => {
  return (
    <div className="profile_cardBox">
      <h3 className="text-5xl my-10 font-extrabold text-white">{header}</h3>
      <div className="profile_textBox flex flex-col items-start justify-center text-xl">
        {textBox.map((texts, idx) => (
          <div className="flex items-start md:items-start " key={idx}>
            {texts.type === "group_second" ? (
              ""
            ) : (
              <Image
                src={`/profile_img/${imgName}.png`}
                width={30}
                height={30}
                alt={"소개 아이콘 이미지"}
                className={"mr-2 mt-3 md:mt-2 w-6"}
              />
            )}

            <div className="profile_text flex">
              <div
                className={`textBx my-2 ${
                  texts.type === "group_second" && "ml-9"
                } ${texts.type === "group_first" && "mb-0"}`}
              >
                <div dangerouslySetInnerHTML={{ __html: texts.text }}></div>
                <div className="line">
                  <Image
                    src={`/profile_img/pencil_line.png`}
                    width={30}
                    height={30}
                    alt={"커서 이미지"}
                    className={"mr-2 profile_pencil"}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
