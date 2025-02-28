import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import axios from "axios";

//관리자 공지작성으로

function OnlineCounselWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };
  const chsangePassword = (event) => {
    setPassword(event.target.value);
  };

  const createBbs = async () => {
    const req = {
      title: title,
      content: content,

      // password: password,
    };

    console.log("📌 보내는 데이터:", req); // 요청 데이터 확인
    await axios
      .post("/api/member/question/write", req, { headers: headers })
      .then((resp) => {
        console.log("받는 데이터", resp.data);

        const questionId = resp.data.id;

        console.log("onlineCounselId:", questionId);
        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/onlineCounselDetail/${questionId}`);
      })
      .catch((err) => {
        console.log("[onlineCounselWrite.js] createBbs() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("access_token:", localStorage.getItem("access_token"));
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Title>
          <h1>온라인 상담</h1>
        </Title>

        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={changeTitle}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent
                    placeholder="내용"
                    value={content}
                    onChange={changeContent}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <PasswordInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={chsangePassword}
          />
          <div>
            <Button onClick={createBbs}>등록</Button>
            <Link to="/OnlineCounsel">
              <Button>취소</Button>
            </Link>
          </div>
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

//  컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  제목 섹션
const Title = styled.div`
  margin-top: 100px;
  width: 100%;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR", serif;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

//  입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #111111;
  font-size: 20px;
  font-weight: medium;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;

  outline: none;
`;

const TableContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 5px;
  border: none;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  border: none;
  border-bottom: 1px solid #111111;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

//  하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px;
`;

// 버튼 스타일
const Button = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  background-color: #f4f4f4;
  border: 1px solid #111111;
  margin-left: 20px;
`;

// 비밀번호 입력 필드
const PasswordInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  outline: none;
`;

export default OnlineCounselWrite;
