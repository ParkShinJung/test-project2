/**
 * POST(게시글) 저장소 인터페이스
 * 게시글 데이터 접근 계층을 정의합니다.
 */

import { IPost, ICreatePostRequest, IUpdatePostRequest } from '../interfaces/post.interface';
import { PostFilterOptions, PostPaginationOptions } from '../types/post.types';

export interface IPostRepository {
  /**
   * 모든 게시글 조회
   * @param filter - 필터 옵션
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록
   */
  findAll(
    filter?: PostFilterOptions,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 게시글 ID로 조회
   * @param id - 게시글 ID
   * @returns 게시글 정보
   */
  findById(id: string): Promise<IPost | null>;

  /**
   * 게시글 제목으로 조회
   * @param title - 게시글 제목
   * @returns 게시글 정보
   */
  findByTitle(title: string): Promise<IPost | null>;

  /**
   * 작성자별 게시글 조회
   * @param authorId - 작성자 ID
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록
   */
  findByAuthorId(
    authorId: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 카테고리별 게시글 조회
   * @param category - 카테고리
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록
   */
  findByCategory(
    category: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 태그별 게시글 조회
   * @param tag - 태그
   * @param pagination - 페이지네이션 옵션
   * @returns 게시글 목록
   */
  findByTag(
    tag: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]>;

  /**
   * 게시글 생성
   * @param createPostRequest - 게시글 생성 요청
   * @returns 생성된 게시글 정보
   */
  create(createPostRequest: ICreatePostRequest): Promise<IPost>;

  /**
   * 게시글 정보 업데이트
   * @param id - 게시글 ID
   * @param updatePostRequest - 게시글 업데이트 요청
   * @returns 업데이트된 게시글 정보
   */
  update(id: string, updatePostRequest: IUpdatePostRequest): Promise<IPost>;

  /**
   * 게시글 삭제 (소프트 삭제)
   * @param id - 게시글 ID
   * @returns 삭제 성공 여부
   */
  delete(id: string): Promise<boolean>;

  /**
   * 게시글 영구 삭제
   * @param id - 게시글 ID
   * @returns 삭제 성공 여부
   */
  permanentlyDelete(id: string): Promise<boolean>;

  /**
   * 게시글 존재 여부 확인
   * @param id - 게시글 ID
   * @returns 존재 여부
   */
  exists(id: string): Promise<boolean>;

  /**
   * 게시글 총 개수 조회
   * @param filter - 필터 옵션
   * @returns 게시글 총 개수
   */
  count(filter?: PostFilterOptions): Promise<number>;

  /**
   * 조회수 증가
   * @param id - 게시글 ID
   * @returns 업데이트된 조회수
   */
  incrementViewCount(id: string): Promise<number>;

  /**
   * 좋아요 수 증가
   * @param id - 게시글 ID
   * @returns 업데이트된 좋아요 수
   */
  incrementLikeCount(id: string): Promise<number>;

  /**
   * 좋아요 수 감소
   * @param id - 게시글 ID
   * @returns 업데이트된 좋아요 수
   */
  decrementLikeCount(id: string): Promise<number>;

  /**
   * 댓글 수 증가
   * @param id - 게시글 ID
   * @returns 업데이트된 댓글 수
   */
  incrementCommentCount(id: string): Promise<number>;

  /**
   * 댓글 수 감소
   * @param id - 게시글 ID
   * @returns 업데이트된 댓글 수
   */
  decrementCommentCount(id: string): Promise<number>;

  /**
   * 모든 게시글 삭제 (테스트용)
   * @returns 삭제된 게시글 개수
   */
  deleteAll(): Promise<number>;

  /**
   * 고정된 게시글 조회
   * @param pagination - 페이지네이션 옵션
   * @returns 고정된 게시글 목록
   */
  findPinnedPosts(pagination?: PostPaginationOptions): Promise<IPost[]>;

  /**
   * 공개된 게시글 조회
   * @param pagination - 페이지네이션 옵션
   * @returns 공개된 게시글 목록
   */
  findPublishedPosts(pagination?: PostPaginationOptions): Promise<IPost[]>;
}
