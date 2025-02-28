import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext, HttpHeadersContext } from "../../../context";
import logo from "../../../assets/imgs/logo_b.png";

function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const { setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    const req = {
      email: id,
      password: pwd,
    };

    try {
      const resp = await axios.post("/api/login", req);
      console.log("Login OK");
      console.log(resp.data);

      alert(resp.data.nickName + "님, 성공적으로 로그인 되었습니다요");

      localStorage.setItem("access_token", resp.data.token);
      localStorage.setItem("nick_name", resp.data.nickName);

      setAuth(resp.data.nickName);
      setHeaders({ Authorization: `Bearer ${resp.data.token}` });

      navigate("/");
    } catch (err) {
      console.log("Login failed");
      console.error("Error Details:", err);

      const errorMessage = err.response?.data
        ? JSON.stringify(err.response?.data)
        : "알 수 없는 오류 발생";
      alert("로그인 실패! " + errorMessage);
    }
  };

  return (
    <LoginContainer>
      <LoginSection>
        <img src={logo} alt="logo" />
        <LoginTitle>
          <h1>로그인</h1>
        </LoginTitle>
        <InputBox>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={changeId}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={changePwd}
            onKeyDown={handleKeyDown}
          />
          <IdFind>
            <Link to="/findId">
              <h6>아이디찾기</h6>
            </Link>
          </IdFind>
          <PwFind>
            <Link to="/findPw">
              <h6>비밀번호찾기</h6>
            </Link>
          </PwFind>
          <SignInButton onClick={login}>로그인</SignInButton>
          <SignupButton>
            <Link to="/signup">회원가입</Link>
          </SignupButton>
          <SocialLoginButton
            onClick={() =>
              (window.location.href =
                "http://localhost:8989/oauth2/authorization/google")
            }
          >
            구글 로그인
          </SocialLoginButton>
          <SocialLoginButton
            onClick={() =>
              (window.location.href =
                "http://localhost:8989/oauth2/authorization/naver")
            }
          >
            네이버 로그인
          </SocialLoginButton>
        </InputBox>
      </LoginSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 1040px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 600px;
  height: 840px; // 높이를 740px에서 840px로 증가
  text-align: center;
  background: #f4f4f4;
  img {
    margin-top: 30px;
    width: 145px;
    height: 35px;
    margin-bottom: 30px;
  }
`;

const LoginTitle = styled.div`
  width: 600px;
  height: 40px;
  h1 {
    font-weight: bold;
    font-size: 36px;
  }
`;

const InputBox = styled.div`
  margin-top: 30px;
  width: 480px;
  height: 600px; // 370px에서 600px로 변경
  box-sizing: border-box;
  text-align: center;

  input {
    font-family: "Noto Sans KR", serif;
    border: none;
    padding-left: 15px;
    width: 460px;
    height: 60px;
    color: #111111;
    background: #ffffff;
    font-weight: medium;
    font-size: 20px;
    outline: none;
  }
  input:nth-child(2) {
    margin-top: 5px;
  }
`;

const IdFind = styled.div`
  float: left;
  margin: 12px 50px 12px 100px;
  width: 90px;
  height: 16px;
  display: flex;
  a {
    text-decoration: none;
  }
  h6 {
    font-weight: regular;
    font-size: 16px;
    color: #111111;
  }
`;

const PwFind = styled.div`
  margin: 12px 100px 12px 30px;
  float: right;
  width: 110px;
  height: 16px;
  display: flex;
  a {
    text-decoration: none;
  }
  h6 {
    font-weight: regular;
    font-size: 16px;
    color: #111111;
  }
`;

const SignInButton = styled.button`
  margin-top: 12px;
  margin-left: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 60px;
  background: #111111;
  font-weight: medium;
  font-size: 20px;
  color: white;
  border: none;
`;

const SignupButton = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 60px;
  background: #111111;
  font-weight: medium;
  font-size: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`;

const SocialLoginButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 60px;
  background: #ffffff;
  font-weight: medium;
  font-size: 20px;
  color: #111111;
  border: 1px solid #111111;
  cursor: pointer;
`;

export default SignIn;
