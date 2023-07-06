const observerOption = { threshold: [0.5], rootMargin: "0px 0px -90% 0px" };

export const getObserver = (setState) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setState(entry.target.innerHTML);
      });
  }, observerOption);
  return observer;
}

export default getObserver;