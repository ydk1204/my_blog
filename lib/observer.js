const observerOption = {
  threshold: [0, 0.25, 0.5, 0.75, 1],
  rootMargin: '200px',
};

export const getIntersectionObserver = (setState) => {
  let direction = '';
  let prevYposition = 0;

  // scroll 방향 check function
  const checkScrollDirection = (prevY) => {
    if (window.scrollY === 0 && prevY === 0) return;
    else if (window.scrollY > prevY) direction = 'down';
    else direction = 'up';

    prevYposition = window.scrollY;
  };

  // observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      checkScrollDirection(prevYposition);

      if ((direction === 'down' && !entry.isIntersecting) ||
        (direction === 'up' && entry.isIntersecting)) {
        setState(entry.target.innerText);
      }
    });
  });

  return observer;
}

export default getIntersectionObserver;