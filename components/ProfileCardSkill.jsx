import profileTextsSkills from "../data/profileTextsSkills";
import Image from "next/image";

const ProfileCardSkill = () => {
  const { header, imgName, subHeader, textBox } = profileTextsSkills;

  console.log(textBox);
  return (
    <div className="profile_cardBox">
      <h3 className="text-5xl my-10 font-extrabold text-white">{header}</h3>
      <div className="profile_textBox flex flex-col items-start justify-center text-xl">
        {subHeader &&
          subHeader.map((head, idx) => (
            <div className="mb-4" key={idx}>
              <h4>{head}</h4>
              {/* {textBox.forEach(
                (texts) => texts.key === head && <p>{texts.text}</p>
              )} */}
              {textBox.map(
                (texts, idx) =>
                  texts.key === head && (
                    <div className="flex items-start md:items-start" key={idx}>
                      <Image
                        src={"/profile_img/puzzle.png"}
                        width={26}
                        height={10}
                        alt={"퍼즐 이미지"}
                        className={"mr-2 mt-3 md:mt-1"}
                      />
                      <div
                        dangerouslySetInnerHTML={{ __html: texts.text }}
                      ></div>
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
