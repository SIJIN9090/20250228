import React, { useState } from "react";
import styled from "styled-components";

import NoticeWrite from "../notice/NoticeWrite";

function AdminHome() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isWriting, setIsWriting] = useState(false);

  const data = [
    {
      title: "회원 관리",
    },
    {
      title: "공지사항 관리",
    },
    {
      title: "온라인예약 관리",
    },
    {
      title: "온라인상담 관리",
    },
    {
      title: "고객 리뷰 관리",
    },
  ];

  const handleClick = (index) => {
    setSelectedIndex(index);
    // setIsBocccVisible(false); // 다른 페이지 클릭 시 Boccc 숨기기
  };

  const getHomeTitle = () => {
    return data[selectedIndex].title;
  };

  return (
    <HomeContainer>
      <HomeSection>
        <Homeva>
          <VaTitle>
            <h3>admin</h3>
          </VaTitle>
          <Vacontent>
            <ul>
              {data.map((item, index) => (
                <li
                  key={index}
                  className={selectedIndex === index ? "active" : ""}
                  onClick={() => handleClick(index)}
                >
                  <button>{item.title}</button>
                </li>
              ))}
            </ul>
          </Vacontent>
        </Homeva>
        <HomeSectionA>
          <HomeTitle>
            <h1>{getHomeTitle()}</h1>
          </HomeTitle>
        </HomeSectionA>
        <HomeSectionB>
          <div>
            {selectedIndex === 1 ? (
              <NoticeWrite />
            ) : (
              data[selectedIndex].content
            )}
          </div>
        </HomeSectionB>
        <HomeSectionC>{data[selectedIndex].page}</HomeSectionC>
        <HomeSectionD>{data[selectedIndex].button}</HomeSectionD>
      </HomeSection>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  height: 1450px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeSection = styled.div`
  width: 1280px;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 200px 80px 1000px;
  grid-template-rows: 50px 100% 30px 150px;
`;

const Homeva = styled.div`
  margin-top: 50px;
  background-color: #111111;
  width: 190px;
  height: 1315px;
  position: absolute;
  grid-row: span 4;
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: center; /* 가로 중앙 */
`;

const VaTitle = styled.div`
  background-color: #111111;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80px;
  font-size: 32px;
  font-weight: 700;
`;

const Vacontent = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  width: 100%; /* 버튼이 가운데 정렬되도록 넓이 조정 */

  li {
    margin-bottom: 1px;
    font-size: 20px;
    font-weight: 500;
    border: none;
    background-color: #f0f0f0;
    width: 155px;
    height: 80px;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center; /* 세로 중앙 정렬 */
    align-items: center; /* 가로 중앙 정렬 */
  }
  button {
    font-family: "Noto Sans KR", serif;
    width: 95px;
  }
  li.active {
    border: 1px solid #f0f0f0;
    color: #f0f0f0;
    background-color: #111111;
  }
`;
// -----------------------------------------------------------------
const HomeSectionA = styled.div`
  background-color: #111111;
  grid-column: 3;
  grid-row: 1;
  top: 50px;
  position: relative;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */

  display: flex;
  width: 1000px;
  height: 70px;
`;

const HomeTitle = styled.div`
  color: #ffffff;
  padding: 20px;
  font-size: 32px;
  font-weight: 700;
  display: flex;
`;
// ------------------------------------------------------------------------
const HomeSectionB = styled.div`
  position: relative;
  top: 60px;
  left: -140px;
  height: 1000px;
  grid-column: 3;
  grid-row: 2;
  transform: scale(1);
  display: flex;
`;
// ------------------------------------------------------------------------------
const HomeSectionC = styled.div`
  position: relative;
  top: -250px;
  height: 65px;
  width: 1000px;
  grid-column: 3;
  grid-row: 3;
`;
// ------------------------------------------------------------------------------
const HomeSectionD = styled.div`
  position: relative;
  top: -230px;
  background: #111111;
  height: 65px;
  width: 1000px;
  grid-column: 3;
  grid-row: 4;
`;

export default AdminHome;
