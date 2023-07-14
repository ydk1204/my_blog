const observerOption = { threshold: [0.5], rootMargin: "0px 0px -90% 0px" };

export const getObserver = (setCurrentIndex) => {
  const observer = new IntersectionObserver(
        ([
          {
            isIntersecting,
            target: { textContent },
          },
        ]) => {
          if (!isIntersecting) return;
          setCurrentIndex(textContent);
        },
        observerOption
      );
  return observer;
}

export default getObserver;