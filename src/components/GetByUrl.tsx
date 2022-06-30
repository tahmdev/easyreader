import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ArticleContext } from "../context/ArticleCTX";

interface Props {
  hide: () => void;
}
export const GetByURL: React.FC<Props> = ({ hide }) => {
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

  return (
    <div className="get-by-url">
      <input value={queryUrl} onChange={handleChange} placeholder="url" />
      <button onClick={handleQuery}>Get</button>
    </div>
  );
};
