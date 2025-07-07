// 에러 메시지 처리 함수
// 에러에서 사용자에게 보여줄 메시지를 뽑아주는 함수
export function getErrorMessage(error) {
  if (error?.response?.data?.errorReason?.reason) {
    // 서버 메시지는 return
    return error.response.data.errorReason.reason.replace(/^\[ERROR\]\s*/, "");
  }
  // 네트워크/기타 오류는 return 없이 alert만
  if (error?.request) {
    alert("⚠️ 서버에 연결할 수 없습니다.\n인터넷 상태를 확인하거나 관리자에게 문의해 주세요.");
    return;
  }
  alert("⚠️ 알 수 없는 오류가 발생했습니다.\n계속 문제가 발생하면 관리자에게 문의해 주세요.");
  return;
}