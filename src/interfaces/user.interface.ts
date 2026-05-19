/**
 * USER 인터페이스
 * 기본적인 사용자 정보를 정의합니다.
 */

export interface IUser {
  /**
   * 사용자 고유 ID
   */
  id: string;

  /**
   * 사용자 이름
   */
  name: string;

  /**
   * 사용자 이메일
   */
  email: string;

  /**
   * 사용자 전화번호
   */
  phone?: string;

  /**
   * 사용자 주소
   */
  address?: string;

  /**
   * 사용자 생성 날짜
   */
  createdAt: Date;

  /**
   * 사용자 수정 날짜
   */
  updatedAt: Date;

  /**
   * 사용자 활성화 여부
   */
  isActive: boolean;
}

/**
 * USER 생성 요청 인터페이스
 */
export interface ICreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

/**
 * USER 업데이트 요청 인터페이스
 */
export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

/**
 * USER 응답 인터페이스
 */
export interface IUserResponse {
  success: boolean;
  data?: IUser;
  message?: string;
  error?: string;
}

/**
 * USER 목록 응답 인터페이스
 */
export interface IUserListResponse {
  success: boolean;
  data?: IUser[];
  total?: number;
  message?: string;
  error?: string;
}
