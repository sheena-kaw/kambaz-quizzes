import { useSelector } from "react-redux";

export default function HelloRedux() {

  const { message } = useSelector((state: any) => state.helloReducer);

  return (
    <div id="wd-hello-redux">
      <h4>Hello Redux</h4>
      <h5>{message}</h5> <hr />
    </div>
  );
}
