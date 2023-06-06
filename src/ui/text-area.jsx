import React from "react";

const TextArea = ({label, state, setState, height="100px" }) => {
  return (
    <div className="form-floating">
      <textarea
        cols="30"
        rows="10"
        id="floatingTextarea2"
        className="form-control"
        placeholder={label}
        value={state}
        onChange={e=>setState(e.target.value)}
        style={{height:height}}
      ></textarea>
      <label htmlFor="floatingTextarea2">{label}</label>
    </div>
  );
};

export default TextArea;
