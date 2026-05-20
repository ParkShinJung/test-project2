/**
 * POST(게시글) 서비스 인터페이스
 * 게시글 관련 비즈니스 로직을 정의합니다.
 */

import { IPost, ICreatePostRequest, IUpdatePostRequest, IPostStatistics } from '../interfaces/post.interface';
import { PostFilterOptions, PostPaginationOptions, PostSearchOptions, PostStatisticsFilter } from '../types/post.types';

export interface IPostService {
  /**
   * 모든 게시글 조회
   * @param filter - 필터 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록
   */
  getAllPosts(
    filter?: PostFilterOptions,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 게시글 ID로 조회
   * @param id - 게시글 ID
   * @returns 게시글 정보
   */
  getPostById(id: string): Promise<IPost | null>;

  /**
   * 게시글 생성
   * @param createPostRequest - 게시글 생성 요청
   * @returns 생성된 게시글 정보
   */
  createPost(createPostRequest: ICreatePostRequest): Promise<IPost>;

  /**
   * 게시글 정보 업데이트
   * @param id - 게시글 ID
   * @param updatePostRequest - 게시글 업데이트 요청
   * @returns 업데이트된 게시글 정보
   */
  updatePost(id: string, updatePostRequest: IUpdatePostRequest): Promise<IPost>;

  /**
   * 게시글 삭제 (소프트 삭제)
   * @param id - 게시글 ID
   * @returns 삭제 성공 여부
   */
  deletePost(id: string): Promise<boolean>;

  /**
   * 게시글 영구 삭제
   * @param id - 게시글 ID
   * @returns 삭제 성공 여부
   */
  permanentlyDeletePost(id: string): Promise<boolean>;

  /**
   * 게시글 검색
   * @param searchOptions - 검색 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 검색 결과 게시글 목록
   */
  searchPosts(
    searchOptions: PostSearchOptions,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 게시글 조회수 증가
   * @param id - 게시글 ID
   * @returns 업데이트된 조회수
   */
  incrementViewCount(id: string): Promise<number>;

  /**
   * 게시글 좋아요 추가
   * @param id - 게시글 ID
   * @returns 업데이트된 좋아요 수
   */
  addLike(id: string): Promise<number>;

  /**
   * 게시글 좋아요 제거
   * @param id - 게시글 ID
   * @returns 업데이트된 좋아요 수
   */
  removeLike(id: string): Promise<number>;

  /**
   * 게시글 고정
   * @param id - 게시글 ID
   * @returns 고정된 게시글 정보
   */
  pinPost(id: string): Promise<IPost>;

  /**
   * 게시글 고정 해제
   * @param id - 게시글 ID
   * @returns 고정 해제된 게시글 정보
   */
  unpinPost(id: string): Promise<IPost>;

  /**
   * 게시글 공개 상태 변경
   * @param id - 게시글 ID
   * @param isPublished - 공개 여부
   * @returns 업데이트된 게시글 정보
   */
  publishPost(id: string, isPublished: boolean): Promise<IPost>;

  /**
   * 사용자별 게시글 조회
   * @param authorId - 작성자 ID
   * @param pagination - 페이지네이션 옵션
   * @returns 사용자의 게시글 목록
   */
  getPostsByAuthor(
    authorId: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 카테고리별 게시글 조회
   * @param category - 카테고리
   * @param pagination - 페이지네이션 옵션
   * @returns 카테고리의 게시글 목록
   */
  getPostsByCategory(
    category: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 태그별 게시글 조회
   * @param tag - 태그
   * @param pagination - 페이지네이션 옵션
   * @returns 태그의 게시글 목록
   */
  getPostsByTag(
    tag: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 게시글 존재 여부 확인
   * @param id - 게시글 ID
   * @returns 존재 여부
   */
  postExists(id: string): Promise<boolean>;

  /**
   * 게시글 총 개수 조회
   * @param filter - 필터 옵션
   * @returns 게시글 총 개수
   */
  getPostCount(filter?: PostFilterOptions): Promise<number>;

  /**
   * 게시글 통계 조회
   * @param filter - 통계 필터 옵션
   * @returns 게시글 통계
   */
  getPostStatistics(filter?: PostStatisticsFilter): Promise<IPostStatistics>;

  /**
   * 인기 게시글 조회
   * @param limit - 조회 개수
   * @returns 인기 게시글 목록
   */
  getPopularPosts(limit: number): Promise<IPost[]>;

  /**
   * 최신 게시글 조회
   * @param limit - 조회 개수
   * @returns 최신 게시글 목록
   */
  getRecentPosts(limit: number): Promise<IPost[]>;
}
