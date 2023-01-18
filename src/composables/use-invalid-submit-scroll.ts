export const useInvalidSubmitScroll = () => {
  const onInvalidSubmitScroll = () => {
    const fieldError =
      document.body.querySelector(".field-error")?.parentElement;
    if (fieldError) {
      const y = fieldError.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y - 80,
        behavior: "smooth",
      });
    }
  };

  return { onInvalidSubmitScroll };
};
