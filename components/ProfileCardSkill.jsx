import profileTextsSkills from "../data/profileTextsSkills";
import Image from "next/image";

const ProfileCardSkill = () => {
  const { header, imgName, subHeader, textBox } = profileTextsSkills;
  return (
    <div className="profile_cardBox">
      <h3 className="text-5xl my-10 font-extrabold text-white">{header}</h3>
      <div className="profile_textBox flex flex-col items-start justify-center text-xl">
        {subHeader &&
          subHeader.map((head, idx) => (
            <div className="mb-4" key={idx}>
              <h4>{head}</h4>
              {textBox.map(
                (texts, idx) =>
                  texts.key === head && (
                    <div className="flex items-start md:items-start" key={idx}>
                      {texts.type === "group_second" ? (
                        ""
                      ) : (
                        <Image
                          src={`/profile_img/puzzle.png`}
                          width={30}
                          height={30}
                          alt={"소개 아이콘 이미지"}
                          className={"mr-2 mt-3 w-5"}
                        />
                      )}
                      <div className="profile_text flex">
                        <div
                          className={`textBx my-2 ${
                            texts.type === "group_second" && "ml-9"
                          } ${texts.type === "group_first" && "mb-0"}`}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: texts.text }}
                          ></div>
                          <div className="line">
                            <Image
                              src={`/profile_img/pencil_line.png`}
                              width={30}
                              height={30}
                              alt={"커서 이미지"}
                              className={"mr-2 mt-2 md:mt-1 profile_pencil"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileCardSkill;
