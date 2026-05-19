/**
 * USER 저장소 인터페이스
 * 데이터베이스 접근 계층을 정의합니다.
 */

import { IUser, ICreateUserRequest, IUpdateUserRequest } from '../interfaces/user.interface';
import { UserFilterOptions, UserPaginationOptions } from '../types/user.types';

export interface IUserRepository {
  /**
   * 모든 사용자 조회
   * @param filter - 필터 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 사용자 목록
   */
  findAll(
    filter?: UserFilterOptions,
    pagination?: UserPaginationOptions
  ): Promise<IUser[]>;

  /**
   * 사용자 ID로 조회
   * @param id - 사용자 ID
   * @returns 사용자 정보
   */
  findById(id: string): Promise<IUser | null>;

  /**
   * 사용자 이메일로 조회
   * @param email - 사용자 이메일
   * @returns 사용자 정보
   */
  findByEmail(email: string): Promise<IUser | null>;

  /**
   * 사용자 생성
   * @param createUserRequest - 사용자 생성 요청
   * @returns 생성된 사용자 정보
   */
  create(createUserRequest: ICreateUserRequest): Promise<IUser>;

  /**
   * 사용자 정보 업데이트
   * @param id - 사용자 ID
   * @param updateUserRequest - 사용자 업데이트 요청
   * @returns 업데이트된 사용자 정보
   */
  update(id: string, updateUserRequest: IUpdateUserRequest): Promise<IUser>;

  /**
   * 사용자 삭제
   * @param id - 사용자 ID
   * @returns 삭제 성공 여부
   */
  delete(id: string): Promise<boolean>;

  /**
   * 사용자 존재 여부 확인
   * @param id - 사용자 ID
   * @returns 존재 여부
   */
  exists(id: string): Promise<boolean>;

  /**
   * 사용자 총 개수 조회
   * @param filter - 필터 옵션
   * @returns 사용자 총 개수
   */
  count(filter?: UserFilterOptions): Promise<number>;

  /**
   * 모든 사용자 삭제 (테스트용)
   * @returns 삭제된 사용자 개수
   */
  deleteAll(): Promise<number>;
}
