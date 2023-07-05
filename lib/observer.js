const observerOption = {
  rootMargin: '0px 0px -5% 0px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

export const getIntersectionObserver = (setState, visibleHeaders, contents) => {
  // observer
  const observer = new IntersectionObserver((entries) => {
    // 마지막 header가 화면에 표시될 경우 마지막 header를 true로 선정하기 위한 변수
    // let selectLastOne;
    const visible = [];
    entries.forEach((entry) => {
      visible.push(entry.isIntersecting && entry.target);
      
      // console.log(entry.isIntersecting, entry.intersectionRatio, entry.intersectionRect ,entry.target);
      const current = visible.filter(a => a !== false);
      //   // 전달 받은 contents(header의 text들)중 현재 보여지는(target) 제목의 인덱스 번호 반환
      //   const index = contents.indexOf(entry.target.innerHTML);
      //   // 위에서 받은 index를 이용해서 현재 보여지고 있는 header들의 배열을 구축해서 true, false 값 선언
      //   visibleHeaders[index] = entry.isIntersecting
      //   // 만약 마지막 헤더가 있는 index까지 도달했다면 마지막 헤더를 추가
      //   selectLastOne = index === contents.length - 1 && entry.isIntersecting && entry.intersectionRatio >= 0.97;
      //   // 지금 선택된 index는 마지막 헤더라면 마지막 헤더의 인덱스를, 아니면 보여지고 있는 헤더 중 가장 첫번째 헤더 반환
      //   const selectIndex = selectLastOne ? contents.length - 1 : findFirstIntersecting(visibleHeaders, contents.indexOf(entry.target.innerHTML));
      // sidebar 컴포넌트의 state값 변경
      // setState(contents[selectIndex]);
      // console.log(current);
      const isVisible = current.length > 1 ? current[0].innerHTML : entry.target.innerHTML;
      // console.log("isVisible", isVisible);
      setState(isVisible)
    })
    // console.log('-----------------------------------');
  }, observerOption);

  return observer;
}

// 보여지는 화면에 헤더가 여러개 있을 경우 최상단 헤더만 true로, 이때 중간에 긴 글이 섞여 있을 경우 마지막 true로 선정된 헤더 return
// intersections = 헤더 별 isIntersecting 여부를 담은 배열
// currentTrue = 현재 화면에 보여진 헤더 중 최근에 true로 선정된 index
const findFirstIntersecting = (intersections, currentTrue) => {
  // true들 중에 첫번째 인덱스 선정
  const index = intersections.indexOf(true);
  // 화면에 보여지는 헤더가 하나도 없을 경우 indexOf(true)에서 true가 하나도 없어 -1이 반환됨으로 이를 방지 하기 위해
  // 이전 화면에 보여진 헤더를 current 변수에 담음
  const current = index !== -1 ? index : currentTrue;
  // indexOf(true)가 -1이 아니면 index, 맞다면 최근 true로 선정된 index 번호 리턴
  return index >= 0 ? index : current
}

export default getIntersectionObserver;