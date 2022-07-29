import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getFrun } from "../redux/features/frunSlice";

const SingleFrun = () => {
  const dispatch = useDispatch();
  const { frun } = useSelector((state) => ({ ...state.frun }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getFrun(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={frun.imageFile}
            alt={frun.title}
          />
          <MDBCardBody>
            <h3>{frun.title}</h3>
            <span>
              <p className="text-start frunName">Created By: {frun.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {frun && frun.tags && frun.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(frun.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {frun.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SingleFrun;