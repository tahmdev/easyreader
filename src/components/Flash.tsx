import React, { useEffect, useRef, useState } from "react";
import { setFlashIndex } from "../redux/slices/flashSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { htmlToElement } from "../utils/htmlToElement";

interface Props {}
export const Flash: React.FC<Props> = () => {
  const article = useAppSelector((state) => state.article.value);
  const flashIdx = useAppSelector((state) => state.flash.value);
  const speed = Number(
    useAppSelector(
      (state) =>
        state.settings.value
          .filter((el) => el.title === "Flash")[0]
          .settings.filter((el) => el.label === "Speed")[0].value
    )
  );
  const useSmartFlashing = Boolean(
    useAppSelector(
      (state) =>
        state.settings.value
          .filter((el) => el.title === "Flash")[0]
          .settings.filter((el) => el.label === "Use smart flashing")[0].value
    )
  );
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);
  const timer = useRef<any>(null);
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    if (article) {
      const arr = htmlToElement(article.content)
        ?.textContent?.replaceAll(/([a-z]|\.)([A-Z])/g, "$1 $2")
        .split(/\s+/);
      if (arr) setText(arr.filter((el) => el));
    }
  }, []);

  const next = () => {
    if (flashIdx <= text.length) {
      dispatch(setFlashIndex({ value: flashIdx + 1 }));
    }
  };

  const prev = () => {
    if (flashIdx > 0) {
      dispatch(setFlashIndex({ value: flashIdx - 1 }));
    }
  };

  useEffect(() => {
    if (playing) {
      timer.current = setTimeout(() => {
        next();
      }, calculateSmartSpeed(speed));
    } else {
      clearInterval(timer.current);
    }
  }, [playing, next]);

  const calculateSmartSpeed = (speed: number) => {
    if (text[flashIdx].includes(".")) {
      return speed * 1.8;
    }
    if (useSmartFlashing && text[flashIdx]) {
      let smartSpeed = speed * (text[flashIdx].length * 0.1);
      smartSpeed =
        smartSpeed < 1
          ? Math.min(smartSpeed, speed * 1.25)
          : Math.max(smartSpeed, speed * 0.75);
      return smartSpeed;
    }
    return speed;
  };

  return (
    <div className="flash-reader">
      <p> {text[flashIdx]} </p>
      <div className="flash-controls">
        <button onClick={prev}>prev</button>
        <button onClick={() => setPlaying(!playing)}>play</button>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
};
