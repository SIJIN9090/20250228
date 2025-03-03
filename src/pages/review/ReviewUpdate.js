import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function OnlineCounselUpdate() {
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
                  <TableTitle type="text" placeholder="제목" />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent placeholder="내용" />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <Button>수정</Button>
          <Link to="/OnlineCounsel">
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

// 제목 섹션
const Title = styled.div`
  margin-top: 100px;
  width: 100%;
  text-align: left;
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

// 입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TableContent = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

// 하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// 버튼 스타일
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default OnlineCounselUpdate;
