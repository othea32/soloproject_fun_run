import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getFruns } from "../redux/features/frunSlice";
import CardFrun from "../components/CardFrun";
import Spinner from "../components/Spinner";

const Home = () => {
  const { fruns, loading } = useSelector((state) => ({ ...state.frun }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFruns());
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {fruns.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Fun Runs Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {fruns &&
                fruns.map((item, index) => <CardFrun key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;