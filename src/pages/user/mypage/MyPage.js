import React, { useState } from "react";
import styled from "styled-components";

import ReservationCheck from "./ReservationCheck";
import UserProfile from "./UserProfile";
import UserUpdate from "./UserUpdate";

function MyPage() {
  const [page, setPage] = useState("1");

  return (
    <MyPageContainer>
      <MyPageTitle>
        <TitleH1>마이페이지</TitleH1>
      </MyPageTitle>

      <ButtonContainer>
        <MyPageButton onClick={() => setPage("1")}>프로필</MyPageButton>
        <MyPageButton className="middle" onClick={() => setPage("2")}>
          회원정보수정
        </MyPageButton>
        <MyPageButton onClick={() => setPage("3")}>예약확인</MyPageButton>
      </ButtonContainer>

      <MyPageContentBox>
        {page === "1" && <UserProfile />}
        {page === "2" && <UserUpdate />}
        {page === "3" && <ReservationCheck />}
      </MyPageContentBox>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const MyPageTitle = styled.div`
  margin-top: 100px;
  text-align: left;
`;

const TitleH1 = styled.h1`
  margin-left: 0;
  font-size: 36px;
  font-family: "Noto Sans KR", serif;
  font-weight: bold;
`;

// 버튼들을 가운데 수평정렬하기 위해 flex 컨테이너로 변경
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  .middle {
    border: none;
    border-top: 1px solid #111111;
    border-bottom: 1px solid #111111;
  }
`;

const MyPageButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#fff")};
  color: ${(props) => (props.disabled ? "#111" : "#111")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 20px;
  font-family: "Noto Sans KR", serif;
  border: 1px solid #111111;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f4f4f4" : "#111111")};
    color: ${(props) => (props.disabled ? "#111111" : "#fff")};
  }
`;

const MyPageContentBox = styled.div`
  width: 100%;
  max-width: 1280px;
  padding-left: 140px;
  padding-right: 140px;
  margin-bottom: 30px;
`;

export default MyPage;
