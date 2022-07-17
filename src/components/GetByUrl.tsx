import React, {
  ChangeEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { setArticle } from "../redux/slices/articleSlice";
import { setDisplay } from "../redux/slices/displaySlice";
import { setFlashIndex } from "../redux/slices/flashSlice";
import { useAppDispatch } from "../redux/typedHooks";

interface Props {
  hide: () => void;
}
export const GetByURL: React.FC<Props> = ({ hide }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialRender = useRef(true);
  const [queryUrl, setQueryUrl] = useState("");
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQueryUrl(e.target.value);
  };

  const handleQuery = () => {
    fetch("http://192.168.178.22:9000/scrape/url/?url=" + queryUrl)
      .then((res) => res.json())
      .then((json) => dispatch(setArticle(json)))
      .then(() => {
        dispatch(setFlashIndex({ value: 0 }));
        dispatch(setDisplay({ value: "reader" }));
        window.scroll(0, 0);
      });
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
