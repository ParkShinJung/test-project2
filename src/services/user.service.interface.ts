/**
 * USER 서비스 인터페이스
 * 사용자 관련 비즈니스 로직을 정의합니다.
 */

import { IUser, ICreateUserRequest, IUpdateUserRequest } from '../interfaces/user.interface';
import { UserFilterOptions, UserPaginationOptions } from '../types/user.types';

export interface IUserService {
  /**
   * 모든 사용자 조회
   * @param filter - 필터 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 사용자 목록
   */
  getAllUsers(
    filter?: UserFilterOptions,
    pagination?: UserPaginationOptions
  ): Promise<IUser[]>;

  /**
   * 사용자 ID로 조회
   * @param id - 사용자 ID
   * @returns 사용자 정보
   */
  getUserById(id: string): Promise<IUser | null>;

  /**
   * 사용자 이메일로 조회
   * @param email - 사용자 이메일
   * @returns 사용자 정보
   */
  getUserByEmail(email: string): Promise<IUser | null>;

  /**
   * 사용자 생성
   * @param createUserRequest - 사용자 생성 요청
   * @returns 생성된 사용자 정보
   */
  createUser(createUserRequest: ICreateUserRequest): Promise<IUser>;

  /**
   * 사용자 정보 업데이트
   * @param id - 사용자 ID
   * @param updateUserRequest - 사용자 업데이트 요청
   * @returns 업데이트된 사용자 정보
   */
  updateUser(id: string, updateUserRequest: IUpdateUserRequest): Promise<IUser>;

  /**
   * 사용자 삭제
   * @param id - 사용자 ID
   * @returns 삭제 성공 여부
   */
  deleteUser(id: string): Promise<boolean>;

  /**
   * 사용자 활성화
   * @param id - 사용자 ID
   * @returns 활성화된 사용자 정보
   */
  activateUser(id: string): Promise<IUser>;

  /**
   * 사용자 비활성화
   * @param id - 사용자 ID
   * @returns 비활성화된 사용자 정보
   */
  deactivateUser(id: string): Promise<IUser>;

  /**
   * 사용자 존재 여부 확인
   * @param id - 사용자 ID
   * @returns 존재 여부
   */
  userExists(id: string): Promise<boolean>;

  /**
   * 사용자 총 개수 조회
   * @returns 사용자 총 개수
   */
  getUserCount(): Promise<number>;
}
