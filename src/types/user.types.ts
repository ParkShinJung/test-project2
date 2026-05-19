/**
 * USER 관련 타입 정의
 */

/**
 * 사용자 역할 타입
 */
export type UserRole = 'admin' | 'user' | 'guest';

/**
 * 사용자 상태 타입
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

/**
 * 사용자 성별 타입
 */
export type UserGender = 'male' | 'female' | 'other' | 'not_specified';

/**
 * 사용자 정렬 기준 타입
 */
export type UserSortBy = 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt';

/**
 * 사용자 정렬 순서 타입
 */
export type SortOrder = 'asc' | 'desc';

/**
 * 사용자 필터 옵션 타입
 */
export interface UserFilterOptions {
  role?: UserRole;
  status?: UserStatus;
  isActive?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
}

/**
 * 사용자 페이지네이션 옵션 타입
 */
export interface UserPaginationOptions {
  page: number;
  limit: number;
  sortBy?: UserSortBy;
  sortOrder?: SortOrder;
}
