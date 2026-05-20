/**
 * POST(게시글) 인터페이스
 * 기본적인 게시글 정보를 정의합니다.
 */

import { IUser } from './user.interface';

/**
 * POST 기본 인터페이스
 */
export interface IPost {
  /**
   * 게시글 고유 ID
   */
  id: string;

  /**
   * 게시글 제목
   */
  title: string;

  /**
   * 게시글 내용
   */
  content: string;

  /**
   * 게시글 작성자 ID
   */
  authorId: string;

  /**
   * 게시글 작성자 정보 (선택사항)
   */
  author?: IUser;

  /**
   * 게시글 카테고리
   */
  category?: string;

  /**
   * 게시글 태그 목록
   */
  tags?: string[];

  /**
   * 게시글 조회수
   */
  viewCount: number;

  /**
   * 게시글 좋아요 수
   */
  likeCount: number;

  /**
   * 게시글 댓글 수
   */
  commentCount: number;

  /**
   * 게시글 생성 날짜
   */
  createdAt: Date;

  /**
   * 게시글 수정 날짜
   */
  updatedAt: Date;

  /**
   * 게시글 삭제 날짜 (소프트 삭제)
   */
  deletedAt?: Date;

  /**
   * 게시글 공개 여부
   */
  isPublished: boolean;

  /**
   * 게시글 고정 여부
   */
  isPinned: boolean;
}

/**
 * POST 생성 요청 인터페이스
 */
export interface ICreatePostRequest {
  title: string;
  content: string;
  authorId: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
}

/**
 * POST 업데이트 요청 인터페이스
 */
export interface IUpdatePostRequest {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
  isPinned?: boolean;
}

/**
 * POST 응답 인터페이스
 */
export interface IPostResponse {
  success: boolean;
  data?: IPost;
  message?: string;
  error?: string;
}

/**
 * POST 목록 응답 인터페이스
 */
export interface IPostListResponse {
  success: boolean;
  data?: IPost[];
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
  error?: string;
}

/**
 * POST 통계 인터페이스
 */
export interface IPostStatistics {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  averageComments: number;
  postsPerCategory: Record<string, number>;
}
