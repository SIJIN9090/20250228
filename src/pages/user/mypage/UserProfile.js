import React from "react";
import styled from "styled-components";

function UserProfile() {
  return (
    <ProfileContainer>
      <TableBase>
        <thead>
          <tr>
            <TableHeader colSpan="2">회원 정보</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableData>김김김</TableData>
          </TableRow>
          <TableRow>
            <TableHead>닉네임</TableHead>
            <TableData>믹믹믹</TableData>
          </TableRow>
          <TableRow>
            <TableHead>주소</TableHead>
            <TableData>우리집</TableData>
          </TableRow>
          <TableRow>
            <TableHead>휴대폰번호</TableHead>
            <TableData>000-0000-0000</TableData>
          </TableRow>
        </tbody>
      </TableBase>

      <TableBase>
        <thead>
          <tr>
            <TableHeader colSpan="2">반려동물 정보</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableData>김김김</TableData>
          </TableRow>
          <TableRow>
            <TableHead>종류</TableHead>
            <TableData>고양이</TableData>
          </TableRow>
          <TableRow>
            <TableHead>나이</TableHead>
            <TableData>11</TableData>
          </TableRow>
          <TableRow>
            <TableHead>무게</TableHead>
            <TableData>5.2kg</TableData>
          </TableRow>
        </tbody>
      </TableBase>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const TableBase = styled.table`
  width: 100%;
  max-width: 500px;
  border-collapse: collapse;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;



const TableHeader = styled.th`
  font-size: 22px;
  padding: 12px;
  text-align: center;
  background-color: #111111;
  color: white;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableHead = styled.th`
  font-size: 18px;
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  font-size: 16px;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

export default UserProfile;
