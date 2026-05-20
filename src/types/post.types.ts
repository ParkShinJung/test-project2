/**
 * POST(게시글) 관련 타입 정의
 */

/**
 * 게시글 상태 타입
 */
export type PostStatus = 'draft' | 'published' | 'archived' | 'deleted';

/**
 * 게시글 카테고리 타입
 */
export type PostCategory = 'notice' | 'general' | 'question' | 'review' | 'free' | 'other';

/**
 * 게시글 정렬 기준 타입
 */
export type PostSortBy = 'id' | 'title' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'commentCount';

/**
 * 정렬 순서 타입
 */
export type SortOrder = 'asc' | 'desc';

/**
 * 게시글 필터 옵션 타입
 */
export interface PostFilterOptions {
  category?: PostCategory;
  authorId?: string;
  isPublished?: boolean;
  isPinned?: boolean;
  tags?: string[];
  createdAfter?: Date;
  createdBefore?: Date;
  minViewCount?: number;
  minLikeCount?: number;
  searchKeyword?: string;
}

/**
 * 게시글 페이지네이션 옵션 타입
 */
export interface PostPaginationOptions {
  page: number;
  limit: number;
  sortBy?: PostSortBy;
  sortOrder?: SortOrder;
}

/**
 * 게시글 검색 옵션 타입
 */
export interface PostSearchOptions {
  keyword: string;
  searchIn?: ('title' | 'content' | 'tags')[];
  category?: PostCategory;
  authorId?: string;
}

/**
 * 게시글 통계 필터 타입
 */
export interface PostStatisticsFilter {
  startDate?: Date;
  endDate?: Date;
  category?: PostCategory;
  authorId?: string;
}
