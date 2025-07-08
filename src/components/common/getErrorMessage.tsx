// getErrorMessage.ts
import { AxiosError } from 'axios'

export function getErrorMessage(error: unknown): string | void {
  const axiosError = error as AxiosError;

  if (
    axiosError.response?.data &&
    typeof axiosError.response.data === 'object' &&
    'errorReason' in axiosError.response.data
  ) {
    const reason = (axiosError.response.data as any).errorReason?.reason;
    if (reason && typeof reason === "string") {
      return reason.replace(/^\[ERROR\]\s*/, "");
    }
  }

  if (axiosError.request) {
    alert("⚠️ 서버에 연결할 수 없습니다.\n인터넷 상태를 확인하거나 관리자에게 문의해 주세요.");
    return;
  }

  alert("⚠️ 알 수 없는 오류가 발생했습니다.\n계속 문제가 발생하면 관리자에게 문의해 주세요.");
}