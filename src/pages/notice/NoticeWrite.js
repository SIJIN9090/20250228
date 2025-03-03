import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import axios from "axios";

//관리자 공지작성으로

function NoticelWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState([]); // 추가: 파일 목록 상태 추가

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };
  const chsangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeFile = (event) => {
    // 총 5개까지만 허용
    const selectedFiles = Array.from(event.target.files).slice(0, 5);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // 주어진 배열의 일부에 대한 얕은 복사본을 생성
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /* 파일 업로드 */
  const fileUpload = async (noticeId) => {
    console.log("업로드할 파일 목록:", files);
    // 파일 데이터 저장
    const fd = new FormData();
    files.forEach((file) => fd.append("file", file));

    for (let pair of fd.entries()) {
      console.log(`✅ FormData 확인 -> ${pair[0]}:`, pair[1]);
    }

    await axios
      .post(`/api/admin/notice/${noticeId}/file/upload`, fd, {
        headers: headers,
      })
      .then((resp) => {
        console.log("[file.js] fileUpload() success :D");
        console.log(resp.data);

        alert("파일 업로드 성공 :D");
      })
      .catch((err) => {
        console.log("[FileData.js] fileUpload() error :<");
        console.log(err);
      });
  };

  const createBbs = async () => {
    const req = {
      title: title,
      content: content,
      // password: password,
    };

    await axios
      .post("/api/admin/notice/write", req, { headers: headers })
      .then((resp) => {
        console.log("응답 데이터:", resp.data); // 응답 데이터 확인
        const noticeId = resp.data.id; // `noticeId` 대신 `id` 사용
        console.log("추출한 noticeId:", noticeId);
        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/noticedetail/${noticeId}`);

        if (noticeId) {
          fileUpload(noticeId); // 올바른 ID를 전달하여 파일 업로드 실행
        } else {
          console.error("❌ noticeId가 응답 데이터에 포함되지 않음!");
        }
      })
      .catch((err) => {
        console.error("[NoticeWrite.js] createBbs() error:", err);
      });

    // await axios
    //   .post("/api/admin/notice/write", req, { headers: headers })
    //   .then((resp) => {

    //     console.log(resp.data);

    //     const noticeId = resp.data.noticeId;

    //     console.log("noticeId:", noticeId);
    //     fileUpload(noticeId);

    //     alert("새로운 게시글을 성공적으로 등록했습니다 :D");
    //     navigate(`/noticedetail/${noticeId}`);
    //   })
    //   .catch((err) => {
    //     console.log("[noticeWrite.js] createBbs() error :<");
    //     console.log(err);
    //   });
  };

  // useEffect(() => {
  //   // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
  //   setHeaders({
  //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //   });

  //   // 로그인한 사용자인지 체크
  //   if (!auth) {
  //     alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <Container>
      <ContentWrapper>
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
              <tr>
                <UploadWrapper>
                  <FileInputWrapper>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <p>
                          <strong>FileName:</strong> {file.name}
                        </p>
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                        >
                          {/* x */}
                        </button>
                      </div>
                    ))}
                    {files.length < 5 && (
                      <div>
                        <InputFile
                          type="file"
                          name="file"
                          onChange={handleChangeFile}
                          multiple="multiple"
                        />
                      </div>
                    )}
                  </FileInputWrapper>
                </UploadWrapper>
              </tr>
            </tbody>
          </Table>
        </TableBox>
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
// -----------------------------------------------------------
const UploadWrapper = styled.div`
  margin-bottom: 10px;
  width: 1000px;
`;

const InputFile = styled.input`
  width: 270px;
  font-size: 16px;
  color: #111111;
  cursor: pointer;

  padding: 10px 20px;
  border: 1px solid #111111;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f8f0;
  }
`;

const FileInputWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 30%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export default NoticelWrite;
