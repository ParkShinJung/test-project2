/**
 * POST(게시글) 컨트롤러 인터페이스
 * 게시글 HTTP 요청 처리 계층을 정의합니다.
 */

import { IPostResponse, IPostListResponse, ICreatePostRequest, IUpdatePostRequest } from '../interfaces/post.interface';
import { PostFilterOptions, PostPaginationOptions, PostSearchOptions } from '../types/post.types';

export interface IPostController {
  /**
   * 모든 게시글 조회
   * @param filter - 필터 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록 응답
   */
  getAllPosts(
    filter?: PostFilterOptions,
    pagination?: PostPaginationOptions
  ): Promise<IPostListResponse>;

  /**
   * 게시글 ID로 조회
   * @param id - 게시글 ID
   * @returns 게시글 응답
   */
  getPostById(id: string): Promise<IPostResponse>;

  /**
   * 게시글 생성
   * @param createPostRequest - 게시글 생성 요청
   * @returns 게시글 응답
   */
  createPost(createPostRequest: ICreatePostRequest): Promise<IPostResponse>;

  /**
   * 게시글 정보 업데이트
   * @param id - 게시글 ID
   * @param updatePostRequest - 게시글 업데이트 요청
   * @returns 게시글 응답
   */
  updatePost(id: string, updatePostRequest: IUpdatePostRequest): Promise<IPostResponse>;

  /**
   * 게시글 삭제
   * @param id - 게시글 ID
   * @returns 삭제 결과 응답
   */
  deletePost(id: string): Promise<IPostResponse>;

  /**
   * 게시글 검색
   * @param searchOptions - 검색 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 검색 결과 응답
   */
  searchPosts(
    searchOptions: PostSearchOptions,
    pagination?: PostPaginationOptions
  ): Promise<IPostListResponse>;

  /**
   * 게시글 조회수 증가
   * @param id - 게시글 ID
   * @returns 게시글 응답
   */
  incrementViewCount(id: string): Promise<IPostResponse>;

  /**
   * 게시글 좋아요 추가
   * @param id - 게시글 ID
   * @returns 게시글 응답
   */
  addLike(id: string): Promise<IPostResponse>;

  /**
   * 게시글 좋아요 제거
   * @param id - 게시글 ID
   * @returns 게시글 응답
   */
  removeLike(id: string): Promise<IPostResponse>;

  /**
   * 게시글 고정
   * @param id - 게시글 ID
   * @returns 게시글 응답
   */
  pinPost(id: string): Promise<IPostResponse>;

  /**
   * 게시글 고정 해제
   * @param id - 게시글 ID
   * @returns 게시글 응답
   */
  unpinPost(id: string): Promise<IPostResponse>;

  /**
   * 게시글 공개 상태 변경
   * @param id - 게시글 ID
   * @param isPublished - 공개 여부
   * @returns 게시글 응답
   */
  publishPost(id: string, isPublished: boolean): Promise<IPostResponse>;

  /**
   * 사용자별 게시글 조회
   * @param authorId - 작성자 ID
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록 응답
   */
  getPostsByAuthor(
    authorId: string,
    pagination?: PostPaginationOptions
  ): Promise<IPostListResponse>;

  /**
   * 카테고리별 게시글 조회
   * @param category - 카테고리
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록 응답
   */
  getPostsByCategory(
    category: string,
    pagination?: PostPaginationOptions
  ): Promise<IPostListResponse>;

  /**
   * 태그별 게시글 조회
   * @param tag - 태그
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록 응답
   */
  getPostsByTag(
    tag: string,
    pagination?: PostPaginationOptions
  ): Promise<IPostListResponse>;

  /**
   * 인기 게시글 조회
   * @param limit - 조회 개수
   * @returns 게시글 목록 응답
   */
  getPopularPosts(limit: number): Promise<IPostListResponse>;

  /**
   * 최신 게시글 조회
   * @param limit - 조회 개수
   * @returns 게시글 목록 응답
   */
  getRecentPosts(limit: number): Promise<IPostListResponse>;

  /**
   * 게시글 통계 조회
   * @returns 통계 응답
   */
  getPostStatistics(): Promise<IPostResponse>;
}
