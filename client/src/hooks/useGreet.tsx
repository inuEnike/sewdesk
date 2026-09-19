import { useEffect, useState } from "react";

export const useGreet = () => {
  const [greet, setGreet] = useState("Good Day");

  useEffect(() => {
    const time = new Date().getHours();
    if (time < 12) {
      setGreet("Good morning");
    } else if (time >= 12 && time <= 16) {
      setGreet("Good Afternoon");
    } else {
      setGreet("Good Evening");
    }
  }, []);

  return { greet };
};
