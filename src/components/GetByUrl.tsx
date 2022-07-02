import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArticleContext } from "../context/ArticleCTX";

interface Props {
  hide: () => void;
}
export const GetByURL: React.FC<Props> = ({ hide }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialRender = useRef(true);
  const [queryUrl, setQueryUrl] = useState("");
  const { setArticle } = useContext(ArticleContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQueryUrl(e.target.value);
  };

  const handleQuery = () => {
    fetch("http://localhost:9000/scrape/url/?url=" + queryUrl)
      .then((res) => res.json())
      .then((json) => setArticle(json));
    hide();
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (
      e.target instanceof Node &&
      !wrapperRef.current?.contains(e.target) &&
      !initialRender.current
    ) {
      hide();
    } else {
      initialRender.current = false;
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="get-by-url" ref={wrapperRef}>
      <input
        value={queryUrl}
        onChange={handleChange}
        placeholder="url"
        ref={inputRef}
      />
      <button onClick={handleQuery}>Get</button>
    </div>
  );
};
