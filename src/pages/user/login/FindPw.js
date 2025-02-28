import React, { useState } from "react";

import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo_b from "../../../assets/imgs/logo_b.png";

function FindPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const navigate = useNavigate();
  const handleSendCode = async () => {
    try {
      await axios.post("/api/findPw", { email });
      alert("인증 메일이 전송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      alert(error.response?.data || "이메일 전송에 실패했습니다.");
    }
  };
  const handleVerifyCode = async () => {
    console.log("Email:", email);
    console.log("Verification Code:", verificationCode); // 입력된 인증코드 확인
    try {
      await axios.post("api/findPw/verify", { email, code: verificationCode });
      alert("인증번호가 확인되었습니다.");
      setIsCodeVerified(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "잘못된 인증번호입니다.");
    }
  };

  const handleSubmit = async () => {
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      alert("비밀번호는 문자와 숫자를 포함해야 합니다.");
      return;
    }

    try {
      await axios.post("api/findPw/resetPw", {
        email,
        code: verificationCode,
        newPassword,
        newPasswordCheck,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/signIn"); // 로그인 화면으로 이동
    } catch (error) {
      alert(error.response?.data || "비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <FindPasswordContainer>
      <FindPasswordSection>
        <FindLogo>
          <img src={logo_b} alt="Logo" />
        </FindLogo>

        <Title>
          <h4>비밀번호 찾기</h4>
        </Title>

        <FindInput>
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendCode}>발송</button>
          </div>
        </FindInput>

        {isCodeSent && (
          <VerificationSection>
            <div>
              <input
                type="text"
                placeholder="인증번호"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={handleVerifyCode}>인증번호 확인</button>
            </div>
          </VerificationSection>
        )}
        {isCodeVerified && (
          <PasswordSection>
            <div>
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={newPasswordCheck}
                onChange={(e) => setNewPasswordCheck(e.target.value)}
              />
            </div>
          </PasswordSection>
        )}

        {isCodeVerified && (
          <CheckBox>
            <button onClick={handleSubmit}>확인</button>
          </CheckBox>
        )}
      </FindPasswordSection>
    </FindPasswordContainer>
  );
}

const FindPasswordContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FindPasswordSection = styled.div`
  margin: auto;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: 600px;
  background-color: #f4f4f4;
  padding-bottom: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  margin-bottom: 200px;
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

const FindInput = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;
  position: relative;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin: 0 auto;
  }
  button {
    right: 90px;
    position: absolute;
    background-color: #f4f4f4;
    color: #111111;
    border: none;
    padding: 10px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const VerificationSection = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;
  position: relative;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin: 0 auto;
  }
  button {
    right: 90px;
    position: absolute;
    background-color: #f4f4f4;
    color: #111111;
    border: none;
    padding: 10px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const PasswordSection = styled.div`
  width: 600px;
  margin-top: 20px;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    margin: 0 auto;
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

export default FindPassword;
