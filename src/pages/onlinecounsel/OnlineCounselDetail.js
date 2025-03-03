import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import File from "../file/File";

function NoticeDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [notice, setNotice] = useState({});
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`/api/member/notice/${noticeId}`);

      console.log("[NoticeDetail.js] getBbsDetail() success :D");
      console.log(response.data);

      setNotice(response.data);
    } catch (error) {
      console.log("[NoticeDetail.js] getBbsDetail() error :<");
      console.error(error);
    }
  };

  const deleteNotice = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/notice/${noticeId}/delete`
      );
      console.log(response);
      console.log("deleteNotice seccess");
      if (response.status == 200) {
        alert("게시글을 삭제 하였습니다.");
        navigate("/notice");
      }
    } catch (error) {
      console.log("deleteNotice error");
      console.error(error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    getBbsDetail();
  }, []);

  useEffect(() => {
    console.log("noticeId:", noticeId); // 콘솔로 확인
    if (!noticeId) return;
    console.log("noticeId:", noticeId);
    getBbsDetail();
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <TableTitle>{notice.title}</TableTitle>
              </tr>
              <tr>
                <td>
                  <File></File>
                </td>
              </tr>
              <tr>
                <TableContent>{notice.content} </TableContent>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <coment></coment>

        <BottomBox>
          <Button onClick={deleteNotice}>삭제</Button>

          <Link to={`/notice/update/${noticeId}`}>
            <Button>수정</Button>
          </Link>
          <Link to="/notice">
            <Button>취소</Button>
          </Link>
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  max-width: 1000px;

  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 10px 10px;
`;

// 입력 필드
const TableTitle = styled.td`
  width: 1000px;

  height: 40px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: medium;
  font-size: 20px;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;
`;

const TableContent = styled.td`
  width: 1000px;

  height: 400px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-weight: regular;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
`;

// 하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// 버튼 스타일
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #111111;
  }
`;

export default NoticeDetail;
