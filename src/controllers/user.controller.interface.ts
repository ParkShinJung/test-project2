/**
 * USER 컨트롤러 인터페이스
 * HTTP 요청 처리 계층을 정의합니다.
 */

import { ICreateUserRequest, IUpdateUserRequest, IUserResponse, IUserListResponse } from '../interfaces/user.interface';

export interface IUserController {
  /**
   * 모든 사용자 조회
   * @returns 사용자 목록 응답
   */
  getAllUsers(): Promise<IUserListResponse>;

  /**
   * 사용자 ID로 조회
   * @param id - 사용자 ID
   * @returns 사용자 정보 응답
   */
  getUserById(id: string): Promise<IUserResponse>;

  /**
   * 사용자 생성
   * @param createUserRequest - 사용자 생성 요청
   * @returns 생성된 사용자 정보 응답
   */
  createUser(createUserRequest: ICreateUserRequest): Promise<IUserResponse>;

  /**
   * 사용자 정보 업데이트
   * @param id - 사용자 ID
   * @param updateUserRequest - 사용자 업데이트 요청
   * @returns 업데이트된 사용자 정보 응답
   */
  updateUser(id: string, updateUserRequest: IUpdateUserRequest): Promise<IUserResponse>;

  /**
   * 사용자 삭제
   * @param id - 사용자 ID
   * @returns 삭제 결과 응답
   */
  deleteUser(id: string): Promise<IUserResponse>;

  /**
   * 사용자 활성화
   * @param id - 사용자 ID
   * @returns 활성화된 사용자 정보 응답
   */
  activateUser(id: string): Promise<IUserResponse>;

  /**
   * 사용자 비활성화
   * @param id - 사용자 ID
   * @returns 비활성화된 사용자 정보 응답
   */
  deactivateUser(id: string): Promise<IUserResponse>;
}
