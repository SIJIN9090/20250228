import { BrowserRouter, Routes, Route } from "react-router-dom";

// 메인
import Home from "./components/common/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Introduce from "./pages/introduce/Introduce";
import Directions from "./pages/introduce/Directions";
import Department from "./pages/introduce/Department";

import UserReserv from "./pages/reservation/UserReserv";
import NonUserReserve from "./pages/reservation/NonUserReserve";

import SignIn from "./pages/user/login/SignIn";
import SignUp from "./pages/user/login/SignUp";
import FindId from "./pages/user/login/FindId";
import FindPw from "./pages/user/login/FindPw";
import MyPage from "./pages/user/mypage/MyPage";

import AdminHome from "./pages/admin/AdminHome";
// import Sidebar from "./pages/admin/adminComponents/Sidebar";
// import PageTitle from "./pages/admin/adminComponents/PageTitle";
// import Content from "./pages/admin/adminComponents/Contents";
// import Admin from "../src/pages/admin/Admin";
// 공지사항
import NoticeLayout from "./pages/notice/NoticeLayout";
import Notice from "./pages/notice/Notice";
import NoticeWrite from "./pages/notice/NoticeWrite";
import NoticeDetail from "./pages/notice/NoticeDetail";
import NoticeUpdate from "./pages/notice/NoticeUpdate";

// 온라인 상담
import OnlineCounselLayout from "./pages/onlinecounsel/OnlineCounselLayout";
import OnlineCounsel from "./pages/onlinecounsel/OnlineCounsel";
import OnlineCounselWrite from "./pages/onlinecounsel/OnlineCounselWrite";
import OnlineCounselDetail from "./pages/onlinecounsel/OnlineCounselDetail";
import OnlineCounselUpdate from "./pages/onlinecounsel/OnlineCounselUpdate";

// 후기
import ReviewLayout from "./pages/review/ReviewLayout";
import Review from "./pages/review/Review";
import ReviewWrite from "./pages/review/ReviewWrite";
import ReviewDetail from "./pages/review/ReviewDetail";
import ReviewUpdate from "./pages/review/ReviewUpdate";

import React from "react";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 메인 라우트들 */}
        <Route path="/" element={<Home />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/directions" element={<Directions />} />
        <Route path="/department" element={<Department />} />
        <Route path="/userreserv" element={<UserReserv />} />
        <Route path="/nonuserreserve" element={<NonUserReserve />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* Admin 관련 라우트들 */}
        {/* <Route path="/admin" element={<AdminHome />} /> */}
        {/* <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/pageTitle" element={<PageTitle />} />
        <Route path="/content" element={<Content />} /> */}

        {/* Notice 관련 라우트들 */}
        <Route path="/notice" element={<NoticeLayout />}>
          <Route index element={<Notice />} />
          <Route path="write" element={<NoticeWrite />} />
          <Route path=":noticeId" element={<NoticeDetail />} />
          <Route path=":noticeId/update" element={<NoticeUpdate />} />
        </Route>

        {/* 온라인 상담 관련 라우트들 */}
        <Route path="/onlineCounsel" element={<OnlineCounselLayout />}>
          <Route index element={<OnlineCounsel />} />
          <Route path="write" element={<OnlineCounselWrite />} />
          <Route path=":onlineCounselId" element={<OnlineCounselDetail />} />
          <Route
            path=":onlineCounselId/update"
            element={<OnlineCounselUpdate />}
          />
        </Route>

        {/* 후기 관련 라우트들 */}
        <Route path="/review" element={<ReviewLayout />}>
          <Route index element={<Review />} />
          <Route path="write" element={<ReviewWrite />} />
          <Route path=":reviewId" element={<ReviewDetail />} />
          <Route path=":reviewId/update" element={<ReviewUpdate />} />
        </Route>

        {/* Admin 내부 관련 라우트들 */}

        {/* Admin 내부 관련 라우트들 */}
        <Route path="/admin" element={<AdminHome />}>
          {/* <Route index element={<Admin />} /> */}

          {/* Notice 관련 라우트들 */}
          <Route path="notice" element={<NoticeLayout />}>
            <Route index element={<Notice />} />
            <Route path="write" element={<NoticeWrite />} />
            <Route path=":admin/noticeId" element={<NoticeDetail />} />
            <Route path=":noticeId/update" element={<NoticeUpdate />} />
          </Route>

          {/* Online Counsel 관련 라우트들 */}
          <Route path="onlineCounsel" element={<OnlineCounselLayout />}>
            <Route index element={<OnlineCounsel />} />
            <Route path="write" element={<OnlineCounselWrite />} />
            <Route path=":onlineCounselId" element={<OnlineCounselDetail />} />
            <Route
              path=":onlineCounselId/update"
              element={<OnlineCounselUpdate />}
            />
          </Route>

          {/* Review 관련 라우트들 */}
          <Route path="review" element={<ReviewLayout />}>
            <Route index element={<Review />} />
            <Route path="write" element={<ReviewWrite />} />
            <Route path=":reviewId" element={<ReviewDetail />} />
            <Route path=":reviewId/update" element={<ReviewUpdate />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
