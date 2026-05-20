/**
 * 게시글 컨트롤러 구현
 * 게시글 관련 HTTP 요청을 처리합니다.
 */

import { IPostController } from './post.controller.interface';
import { IPostService } from '../services';
import {
  ICreatePostRequest,
  IUpdatePostRequest,
  IPostResponse,
  IPostStatistics,
} from '../interfaces';
import {
  PostFilterOptions,
  PostPaginationOptions,
  PostSortBy,
} from '../types';

export class PostController implements IPostController {
  constructor(private postService: IPostService) {}

  /**
   * 새 게시글 생성
   */
  async createPost(
    userId: string,
    request: ICreatePostRequest
  ): Promise<IPostResponse> {
    // 입력 검증
    this.validateCreatePostRequest(request);

    return await this.postService.createPost(userId, request);
  }

  /**
   * 게시글 조회
   */
  async getPost(postId: string): Promise<IPostResponse> {
    if (!postId || postId.trim() === '') {
      throw new Error('Post ID is required');
    }

    return await this.postService.getPost(postId);
  }

  /**
   * 게시글 목록 조회
   */
  async getPosts(
    filter?: PostFilterOptions,
    pagination?: PostPaginationOptions,
    sortBy?: PostSortBy
  ): Promise<{ posts: IPostResponse[]; total: number }> {
    // 페이지네이션 검증
    if (pagination) {
      this.validatePagination(pagination);
    }

    return await this.postService.getPosts(filter, pagination, sortBy);
  }

  /**
   * 게시글 수정
   */
  async updatePost(
    postId: string,
    userId: string,
    request: IUpdatePostRequest
  ): Promise<IPostResponse> {
    if (!postId || postId.trim() === '') {
      throw new Error('Post ID is required');
    }

    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    // 최소 하나의 필드가 제공되어야 함
    if (
      !request.title &&
      !request.content &&
      !request.category &&
      !request.tags
    ) {
      throw new Error('At least one field must be provided for update');
    }

    return await this.postService.updatePost(postId, userId, request);
  }

  /**
   * 게시글 삭제
   */
  async deletePost(postId: string, userId: string): Promise<void> {
    if (!postId || postId.trim() === '') {
      throw new Error('Post ID is required');
    }

    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    await this.postService.deletePost(postId, userId);
  }

  /**
   * 게시글 발행
   */
  async publishPost(postId: string, userId: string): Promise<IPostResponse> {
    if (!postId || postId.trim() === '') {
      throw new Error('Post ID is required');
    }

    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    return await this.postService.publishPost(postId, userId);
  }

  /**
   * 게시글 좋아요
   */
  async likePost(postId: string): Promise<IPostResponse> {
    if (!postId || postId.trim() === '') {
      throw new Error('Post ID is required');
    }

    return await this.postService.likePost(postId);
  }

  /**
   * 게시글 검색
   */
  async searchPosts(
    keyword: string,
    pagination?: PostPaginationOptions
  ): Promise<{ posts: IPostResponse[]; total: number }> {
    if (!keyword || keyword.trim() === '') {
      throw new Error('Search keyword is required');
    }

    if (pagination) {
      this.validatePagination(pagination);
    }

    return await this.postService.searchPosts(keyword, pagination);
  }

  /**
   * 게시글 통계 조회
   */
  async getStatistics(userId: string): Promise<IPostStatistics> {
    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    return await this.postService.getStatistics(userId);
  }

  /**
   * 게시글 생성 요청 검증
   */
  private validateCreatePostRequest(request: ICreatePostRequest): void {
    if (!request.title || request.title.trim() === '') {
      throw new Error('Title is required');
    }

    if (!request.content || request.content.trim() === '') {
      throw new Error('Content is required');
    }

    if (!request.category || request.category.trim() === '') {
      throw new Error('Category is required');
    }

    if (request.title.length > 200) {
      throw new Error('Title must be less than 200 characters');
    }

    if (request.content.length > 10000) {
      throw new Error('Content must be less than 10000 characters');
    }
  }

  /**
   * 페이지네이션 검증
   */
  private validatePagination(pagination: PostPaginationOptions): void {
    if (pagination.page < 1) {
      throw new Error('Page must be greater than 0');
    }

    if (pagination.limit < 1 || pagination.limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }
  }
}
