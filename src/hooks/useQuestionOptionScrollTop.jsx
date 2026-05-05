import { useEffect, useRef } from "react";

const useQuestionOptionScrollTop = (dependency) => {
  const containerRef = useRef(null);

  useEffect(() => {
     if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [dependency]);

  return containerRef;
};

export default useQuestionOptionScrollTop;