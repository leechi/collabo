import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
/**
 * 사용자가 인증되었는지 확인하는 보호된 라우트 컴포넌트.
 * 사용자가 인증되지 않은 경우 로그인 페이지로 리디렉션.
 * @param children - 사용자가 인증된 경우 렌더링할 컴포넌트.
 * @return 사용자가 인증된 경우 children 컴포넌트를 반환하고, 그렇지 않은 경우 로그인 페이지로 리디렉션.
 */


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 현재 인증된 사용자가 있는지 확인
  const user = auth.currentUser;
  // 사용자가 인증되지 않은 경우 로그인 페이지로 리디렉션
  if (user === null) {
    return <Navigate to="/login" />;
  }
  // 사용자가 인증된 경우 children 컴포넌트를 렌더링
  return children;
}