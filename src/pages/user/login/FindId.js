import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import logo_b from "../../../assets/imgs/logo_b.png";

function FindId() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [emailFound, setEmailFound] = useState(""); // 찾은 이메일 저장
  const [isEmailVisible, setIsEmailVisible] = useState(false); // 이메일 표시 여부
  const [error, setError] = useState(""); // 에러 메시지 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleFindEmail = async () => {
    setError("");
    setIsLoading(true);

    if (!name || !phoneNum) {
      setError("이름과 전화번호를 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

    console.log("Request data: ", { name, phoneNum }); // 데이터 확인용 로그

    try {
      const response = await fetch("/api/findId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNum }),
      });

      if (!response.ok) {
        throw new Error("아이디를 찾을 수 없습니다.");
      }

      const data = await response.text();
      console.log("Response data: ", data); // 백엔드 응답 확인용 로그

      const email = data.replace("귀하의 이메일 입니다. : ", "");
      setEmailFound(email);
      setIsEmailVisible(true);
    } catch (err) {
      setError(err.message);
      setIsEmailVisible(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FindIdContainer>
      <FindIdSection>
        <FindLogo>
          <img src={logo_b} />
        </FindLogo>

        <Title>
          <h4> 아이디찾기 </h4>
        </Title>
        <FindiIdInput>
          <div>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="전화번호"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            ></input>
          </div>
        </FindiIdInput>
        {error && <ErrorSection>{error}</ErrorSection>}
        {isEmailVisible && (
          <FoundEmailSection>
            <p>찾은 이메일 : {emailFound}</p>
          </FoundEmailSection>
        )}

        <PwFind>
          <Link to="/findPw">
            <h6>비밀번호찾기 </h6>
          </Link>
        </PwFind>

        <CheckBox>
          <button onClick={handleFindEmail}>확인</button>
        </CheckBox>
      </FindIdSection>
    </FindIdContainer>
  );
}

const FindIdContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ----------------------------------------------------------------------------------

const FindIdSection = styled.div`
  margin: auto;
  align-items: center;
  margin-top: 130px;
  padding-top: 30px;
  width: 600px;
  min-height: 500px;
  background-color: #f4f4f4;
  margin-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
const FindLogo = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 600px;
  height: 40px;
  background-color: #f4f4f4;

  margin-bottom: 30px;
  img {
    width: 145px;
    height: 35px;
  }
`;

const Title = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 40px;
  margin-bottom: 30px;
  h4 {
    font-size: 36px;
    color: #111111;
    font-weight: bold;
  }
`;

const FindiIdInput = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  gap: 20px; /* input 사이의 간격을 20px로 설정 */

  div {
    width: 100%;
    height: 120px;
  }
  input:first-child {
    margin-bottom: 5px;
  }
  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
    display: block;
    margin: 0 auto;
  }
`;

const FoundEmailSection = styled.div`
  margin: 20px 0;
  text-align: center;
  p {
    font-size: 18px;
    color: #111111;
  }
`;

const PwFind = styled.div`
  margin: 12px 0;
  width: 100%; /* Make it take full width */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  height: 40px;

  a {
    text-decoration: none;
  }

  h6 {
    font-weight: regular;
    font-size: 16px;
    color: #111111;
  }
`;
const CheckBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
  button {
    font-size: 20px;
    font-weight: 700;
    width: 460px;
    height: 60px;
    background-color: #111111;
    color: #fff;
  }
`;
const ErrorSection = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
`;
export default FindId;
