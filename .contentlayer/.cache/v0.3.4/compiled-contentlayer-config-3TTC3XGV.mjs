// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `**/*.mdx`,
  // mdx 파일경로 패턴
  // mdx로 작성한 글 정보에 대해 입력해야하는 필드 정의
  /*
    [필드명]: {
      type: '자료형',
      required: '필수여부',
    }
  */
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    description: { type: "string", required: true },
    tag: { type: "string", required: true },
    note: { type: "string", required: false }
  }
}));
var contentlayer_config_default = makeSource({
  // 마크다운 파일이 저장되어 있는 루트 폴더
  // contentDirPath: "posts",
  contentDirPath: "./posts",
  contentDirInclude: ["study", "html-study", "css-study", "js-study", "react-study", "game", "projects", "profile"],
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-3TTC3XGV.mjs.map
