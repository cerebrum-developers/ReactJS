import { FC } from "react";
import Header from "./pages/header/Header";

interface ComponentProps {
  component: FC;
}
const Parent: FC<ComponentProps> = ({ component: Component }) => (
  <div>
    <Header />
    <Component />
  </div>
);

export default Parent;
