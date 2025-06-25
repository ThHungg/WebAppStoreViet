import { memo } from "react";
import Header from "../header";

const MasterLayout = ({ children, ...props }) => {
  return (
    <>
      <div {...props}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default memo(MasterLayout);
