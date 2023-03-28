import React from "react";
import { TailSpin } from "react-loader-spinner";

function Spinner() {
  return (
    <TailSpin
      height="40"
      width="40"
      color="green"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

export default Spinner;
