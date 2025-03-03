import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext, HttpHeadersContext } from "../../../context";
import logo from "../../../assets/imgs/logo_b.png";
import one from "../../../assets/imgs/one.svg";
import google from "../../../assets/imgs/google_login.svg";



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
  const googleLogin = (response) => {
    console.log("Google 로그인 성공:", response);
  };

  return (
    <LoginContainer>


      <LoginBox>
        <LoginTitle>로그인</LoginTitle>
        <LoginSub>하이펫 홈페이지에 방문해주신 여러분 진심으로 환영합니다</LoginSub>
        </LoginBox>


      <LoginSection>
      <div className="logo_t">응급 24시 하이펫 반려동물 전문 메디컬센터</div>

     
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
          </InputBox>
      {/* 로그인 버튼*/}
      <SignInButton onClick={login}>로그인</SignInButton>

    
        {/* 회원가입/아이디찾기/비밀번호찾기*/}
        <LoginArticle>
        <Signup>
          <Link to="/signup">회원가입</Link>
          <img src={one} alt="one" />
        </Signup>

          <IdFind>
            <Link to="/findId">아이디 찾기</Link>
            <img src={one} alt="one"/>
          </IdFind>

          <PwFind>
          <Link to="/findPw">비밀번호 찾기</Link>
        </PwFind>
      </LoginArticle>

        {/*SNS 간편 로그인*/}
        <Article>
          <div className="left"></div>
          <div className="sns">SNS 간편 로그인</div>
          <div className="right"></div>
        </Article>

        <SignButton onClick={googleLogin}>
          <img src={google} alt="google"/>
          구글 로그인
        </SignButton>
     
      </LoginSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
 

  
  padding-bottom: 90px;
`;

// 1.로그인 문구_박스
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 30px;

`;


const LoginTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
`;


const LoginSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
  
`;

//02.로그인 전체 박스
const LoginSection = styled.div`
  max-width: 1280px;
  background-color: #f5f7f9;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 65px 0px;
  
  .logo_t{
    font-size: 24px;
    font-weight: 700;
    color: #0D326F;
    text-align: center;
    //font-family: "Montserrat", serif;
  }
`;

//3.로그인박스
const InputBox = styled.div`
  margin-top: 60px;
  width: 450px;
  box-sizing: border-box;
  text-align: center;
  

  input {
    width: 450px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
    border-radius: 5px;
    border: 1.5px solid #e0e0e0;
    background-color: #fff;
    outline: none;

    //
    font-size: 14.2px;
    color: #e6e6e6;
    font-weight: 400;
  }

  input:nth-child(2) {
    margin-top: 15px;
  }
`;

//4.로그인 버튼
const SignInButton = styled.button`
  margin-top: 45px;
  width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border-radius: 5px;
  border: none;
  background-color: #0D326F;
  outline: none;
  
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 45px;
  text-align: center;
  
  &:hover{
    border: 1px solid #FFA228;
    background-color: #FFA228;
  };
`;

//5.회원가입,아이디찾기,비밀번호찾기=부모박스
const LoginArticle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #888888;
  width: 420px;
  height: 23px;
  text-align: center;
  margin: 0 auto;
  padding: 20px 40px 20px 40px;
  margin-bottom: 45px;
  
  img{
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 3px;
    }

  `;

//5-1.회원가입
const Signup = styled.a`
  text-align: center;
  &:hover{
    color: #0D326F;
    font-weight: 600;
  };
`;

//5-2.아이디 찾기
const IdFind = styled.a`
  text-align: center;
  &:hover{
    color: #0D326F;
    font-weight: 600;
  };
`;

//5-3.비밀번호 찾기
const PwFind = styled.a`
  text-align: center;
  &:hover{
    color: #0D326F;
    font-weight: 600;
  };
  }
`;


//6-1. sns 간편 로그인
const Article = styled.div`
  position: relative;
  width: 470px;
  
  
  .sns{
    font-size: 12px;
    font-weight: 700;
    color: #888888;
    text-align: center;
    padding: 0px 20px 0px 5px;
  }
  .left{
    position: absolute;
    left: 20%;
    top: 50%;
    width: 25%;
    height: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
  .right{
    position: absolute;
    right: 0;
    top: 50%;
    width: 25%;
    height: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
`;



//6-2.구글 로그인(SNS)
const SignButton = styled.button`
  margin-top: 45px;
  width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border: 1.5px solid #e0e0e0;
  background-color: #fff;
  outline: none;
  
  color: #888888;
  font-weight: 500;
  font-size: 15.2px;
  text-align: center;
  margin-bottom: 45px;
  position: relative;
  
  img{
    float: left;
    position: absolute;
    left: 0;
    margin-left: 20px;
  }
  
  &:hover{
    border: 1px solid #0D326F;
    color: #0D326F;
    font-weight: 600;
    box-shadow: rgba(0,0,0,0.8);
  };
`;



// const LoginContainer = styled.div`
//   height: 1040px;
//   width: 100%;
//   max-width: 1920px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const LoginSection = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   margin: auto;
//   border-radius: 10px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   position: relative;
//   width: 600px;
//   height: 840px; // 높이를 740px에서 840px로 증가
//   text-align: center;
//   background: #f4f4f4;
//   img {
//     margin-top: 30px;
//     width: 145px;
//     height: 35px;
//     margin-bottom: 30px;
//   }
// `;

// const LoginTitle = styled.div`
//   width: 600px;
//   height: 40px;
//   h1 {
//     font-weight: bold;
//     font-size: 36px;
//   }
// `;

// const InputBox = styled.div`
//   margin-top: 30px;
//   width: 480px;
//   height: 600px; // 370px에서 600px로 변경
//   box-sizing: border-box;
//   text-align: center;

//   input {
//     font-family: "Noto Sans KR", serif;
//     border: none;
//     padding-left: 15px;
//     width: 460px;
//     height: 60px;
//     color: #111111;
//     background: #ffffff;
//     font-weight: medium;
//     font-size: 20px;
//     outline: none;
//   }
//   input:nth-child(2) {
//     margin-top: 5px;
//   }
// `;

// const IdFind = styled.div`
//   float: left;
//   margin: 12px 50px 12px 100px;
//   width: 90px;
//   height: 16px;
//   display: flex;
//   a {
//     text-decoration: none;
//   }
//   h6 {
//     font-weight: regular;
//     font-size: 16px;
//     color: #111111;
//   }
// `;

// const PwFind = styled.div`
//   margin: 12px 100px 12px 30px;
//   float: right;
//   width: 110px;
//   height: 16px;
//   display: flex;
//   a {
//     text-decoration: none;
//   }
//   h6 {
//     font-weight: regular;
//     font-size: 16px;
//     color: #111111;
//   }
// `;

// const SignInButton = styled.button`
//   margin-top: 12px;
//   margin-left: 10px;
//   margin-bottom: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 460px;
//   height: 60px;
//   background: #111111;
//   font-weight: medium;
//   font-size: 20px;
//   color: white;
//   border: none;
// `;

// const SignupButton = styled.div`
//   margin-left: 10px;
//   margin-bottom: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 460px;
//   height: 60px;
//   background: #111111;
//   font-weight: medium;
//   font-size: 20px;
//   a {
//     color: white;
//     text-decoration: none;
//   }
// `;

// const SocialLoginButton = styled.button`
//   margin-top: 10px;
//   margin-left: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 460px;
//   height: 60px;
//   background: #ffffff;
//   font-weight: medium;
//   font-size: 20px;
//   color: #111111;
//   border: 1px solid #111111;
//   cursor: pointer;
// `;

export default SignIn;
