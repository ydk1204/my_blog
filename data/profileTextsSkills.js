const profileTextsSkills =
  {
    header: "사용 기술",
    subHeader : ["Language", "Framework", "VersionControl"],
    imgName: "puzzle",
    textBox: [
      
      { key: "Language", type: "default" , text: `<p>JavaScript : 주 사용 언어입니다.</p>` },
      {
        key: "Language", type: "default" , text: `<p>
                TypeScript : 느슨해진 JS 개발 환경에 긴장감을 더 해줍니다.
              </p>
              `},
      {
        key: "Language", type: "default" , text: `<p>
                Python : 편하게 사용하기 좋아서 알고리즘 문제를 풀 때
                사용합니다.
              </p>`},
      {
        key: "Framework", type: "default" , text: `<p>
                React : 컴포넌트 재사용의 유용성, 덕분에 UI 개발의 편리함이
                있습니다.
              </p>
              `},
      {
        key: "Framework", type: "group_first", text: `
              <p class="group_text_top">
                Next.js : SEO 구현이 편합니다. React와 마찬가지로 공식문서
                정리가 잘 되어있고,
              </p>`
              },
      {
        key: "Framework", type: "group_second", text:
              `<p class="group_text_bottom pl-9">
                많은 개발자들이 사용해서 관련 자료를 찾기 편합니다.
              </p>
              `},
      {
        key: "Framework", type: "group_first" , text: `
              <p class="group_text_top">
                TailwindCSS : React 개발 환경에서 주로 사용 중입니다, JSX,
                TSX 파일 내에
              </p>
              `},
      {
        key: "Framework", type: "group_second", text:
              `<p class="group_text_bottom pl-9">
                즉각적으로 코드를 삽입해 변경 사항을 확인할 수 있어
                좋습니다.
              </p>`
              },
      {
        key: "VersionControl", type: "default" , text: `
              <p>Git : 프로젝트 관리에 유용합니다. 아직 덜 친해졌습니다.</p>
              `}
      
    ]
  }

export default profileTextsSkills;