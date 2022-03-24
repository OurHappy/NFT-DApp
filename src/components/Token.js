import React, { useState } from "react";
// import "./styleToken.css";

const Token = () => {
  /* States */
  const [showToken, setShowToken] = useState(0);
  /* The followings are the states which need to call API */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exLink, setExLink] = useState("");
  const [meta, setMeta] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [own, setOwn] = useState(0);

  /* Functions */

  // to see whether it is a valid token
  // 之後會改成 token 是否存在的 API，這邊測試是 token「123」存在
  let tokenValid = (ID) => {
    if (ID === "123") return true;
    else return false;
  };

  let searchToken = (event) => {
    if (tokenValid(event.target.value)) {
      setShowToken((showToken) => 1);
    } else {
      setShowToken((showToken) => 0);
    }

    /* set Token (之後會改成用 API 來獲取資訊) */
    setName((name) => "Token Name 123");
    setDescription((description) => "Token description 123");
    setExLink((exLink) => "Token External Link 123");
    setMeta((meta) => "Token other meta 123");
    setTotalSupply((totalSupply) => 123);
    setOwn((own) => 123);
  };

  /* Render functions */
  return (
    <div className="divClass">
      <span className="tokenText">Token:</span>
      <input
        type="search"
        placeholder="Token ID"
        onChange={searchToken}
        className="tokenSearchClass"
      />

      {/* if token exists, show the token */}
      <div>
        {showToken === 1 && (
          <div className="container">
            {/* Show token metadata if a valid token is provided */}
            <div className="row">
              <div className="col">token image</div>
              <div className="col tokenInfo">
                Name: {name} <br />
                Description: {description} <br />
                <br />
                External Link: {exLink} <br />
                Other meta: {meta} <br />
                <br />
                Total Supply: {totalSupply} <br />
                You owned: {own}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Token;
