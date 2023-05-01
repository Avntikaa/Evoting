import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const StartEnd = (props) => {
  const btn = {
    display: "block",
    padding: "21px",
    marginLeft: "600px",
    minWidth: "max-content",
    textAlign: "center",
    width: "600px",
    alignSelf: "center",
    marginTop:"20px",


  };
  return (
    <div
      className="container-main"
    >
      {!props.elStarted ? (
        <>
          {/* edit here to display start election Again button */}
          {!props.elEnded ? (
            <>
              {/* <div
                className="container-item attention"
                style={{ display: "block" }}
              >
                <h2>Do not forget to add candidates.</h2>
                <p>
                  Go to{" "}
                  <Link
                    title="Add a new "
                    to="/addCandidate"
                    style={{
                      color: "black",
                      textDecoration: "underline",
                    }}
                  >
                    add candidates
                  </Link>{" "}
                  page.
                </p>
              </div> */}
                
                <Button
              type="submit"
              fullWidth
              variant="contained"
              style={btn}
            >
                  Start Election {props.elEnded ? "Again" : null}
            </Button>
            </>
          ) : (
            <div className="container-item">
              <center>
                <p>Re-deploy the contract to start election again.</p>
              </center>
            </div>
          )}
          {props.elEnded ? (
            <div className="container-item">
              <center>
                <p>The election ended.</p>
              </center>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="container-item">
            <center>
              <p>The election started.</p>
            </center>
          </div>
            <Button
              type="button"
              // onClick={this.endElection}
                            variant="contained"

              onClick={props.endElFn}
              style={btn}
            >
              End
            </Button>
        </>
      )}
    </div>
  );
};

export default StartEnd;
