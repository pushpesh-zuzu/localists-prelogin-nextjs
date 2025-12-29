export const handleScrollToBottom = () => {
  typeof window !== undefined &&
    window.scrollTo({ top: 0, behavior: "smooth" });
};
