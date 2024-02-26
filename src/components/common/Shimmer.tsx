import styled from "styled-components";

const Shimmer = () => {
  return (
    <ShimmerWrap>
      <ShimmerOverlay />
    </ShimmerWrap>
  );
};

export default Shimmer;
const ShimmerWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 25px;
  z-index: 200;
`;
const ShimmerOverlay = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 15px;
  background: linear-gradient(-45deg, #ccc 40%, #faf9f6 50%, #eee 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 5s infinite linear;
  @keyframes shimmer {
    to {
      background-position-x: 0%;
    }
  }
`;
