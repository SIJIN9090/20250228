import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const NoticeContainer = styled.div`
  margin: auto;
  display: block;
  width: 1000px;
  height: 50px;
  position: relative;
  button {
  }
`;

const NoticeSection = styled.div`
  margin: auto;
  display: block;
  width: 1000px;
  height: 50px;
  position: relative;
  div {
    background-color: #f4f4f4;
    width: 1000px;
    height: 50px;
  }
  button {
  }
`;
// 작성/수정 버튼 박스
const WriteBox = styled.div`
  display: flex;
  gap: 10px;
`;

// 작성/수정 버튼 스타일
const WriteButton = styled(Link)`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
function AdminCounselAnswer() {
  return (
    <NoticeContainer>
      <NoticeSection>
        <div>
          <label>내용</label>
          <textarea rows="3" name="content"></textarea>
        </div>
      </NoticeSection>
      <WriteBox>
        <WriteButton to="/NoticeUpdate">수정</WriteButton>
        <WriteButton>삭제</WriteButton>
      </WriteBox>
    </NoticeContainer>
  );
}

export default AdminCounselAnswer;
