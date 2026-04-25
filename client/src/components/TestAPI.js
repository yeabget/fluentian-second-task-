import { useEffect } from "react";
import API from "../api/api";

export default function TestAPI() {
  useEffect(() => {
    const test = async () => {
      const res = await API.get("/courses");
      console.log(res.data);
    };

    test();
  }, []);

  return <div>Check console</div>;
}