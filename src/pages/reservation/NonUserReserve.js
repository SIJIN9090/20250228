import React from "react";
import styled from "styled-components";

// 전체 컨테이너
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

//제목 섹션
const Title = styled.div`
  margin-top: 100px;
  width: 100%;
  text-align: left;
`;

//테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

//테이블
const Table = styled.table`
  width: 60%;
  height: 400px;
  border: 1px solid black;
  border-radius: 15px;
  text-align: center;
  padding: 10px;
`;

//입력 필드
const InputField = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// 버튼 스타일
const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

function NonUserReserve() {
  return (
    <Container>
      <ContentWrapper>
        <Title>
          <h1>비회원 예약</h1>
        </Title>

        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>이름</td>
              </tr>
              <tr>
                <td>
                  <InputField type="text" placeholder="이름" />
                </td>
              </tr>
              <tr>
                <td>전화번호</td>
              </tr>
              <tr>
                <td>
                  <InputField type="text" placeholder="전화번호" />
                </td>
              </tr>
              <tr>
                <td>
                  <SubmitButton>등록</SubmitButton>
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>
      </ContentWrapper>
    </Container>
  );
}

export default NonUserReserve;
