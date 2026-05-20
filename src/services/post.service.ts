/**
 * 게시글 서비스 구현
 * 게시글 관련 비즈니스 로직을 처리합니다.
 */

import { IPostService } from './post.service.interface';
import {
  IPost,
  ICreatePostRequest,
  IUpdatePostRequest,
  IPostResponse,
  IPostStatistics,
} from '../interfaces';
import {
  PostStatus,
  PostFilterOptions,
  PostPaginationOptions,
  PostSortBy,
} from '../types';
import { IPostRepository } from '../repositories';

export class PostService implements IPostService {
  constructor(private postRepository: IPostRepository) {}

  /**
   * 새 게시글 생성
   */
  async createPost(
    userId: string,
    request: ICreatePostRequest
  ): Promise<IPostResponse> {
    const post: IPost = {
      id: this.generateId(),
      userId,
      title: request.title,
      content: request.content,
      category: request.category,
      status: PostStatus.DRAFT,
      views: 0,
      likes: 0,
      comments: 0,
      tags: request.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedPost = await this.postRepository.create(post);
    return this.mapToResponse(savedPost);
  }

  /**
   * 게시글 조회
   */
  async getPost(postId: string): Promise<IPostResponse> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    // 조회수 증가
    post.views += 1;
    await this.postRepository.update(postId, post);

    return this.mapToResponse(post);
  }

  /**
   * 게시글 목록 조회
   */
  async getPosts(
    filter?: PostFilterOptions,
    pagination?: PostPaginationOptions,
    sortBy?: PostSortBy
  ): Promise<{ posts: IPostResponse[]; total: number }> {
    const posts = await this.postRepository.findAll(filter, pagination, sortBy);
    const total = await this.postRepository.count(filter);

    return {
      posts: posts.map((post) => this.mapToResponse(post)),
      total,
    };
  }

  /**
   * 게시글 수정
   */
  async updatePost(
    postId: string,
    userId: string,
    request: IUpdatePostRequest
  ): Promise<IPostResponse> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    if (post.userId !== userId) {
      throw new Error('Unauthorized: Only post author can update');
    }

    const updatedPost: IPost = {
      ...post,
      title: request.title ?? post.title,
      content: request.content ?? post.content,
      category: request.category ?? post.category,
      tags: request.tags ?? post.tags,
      updatedAt: new Date(),
    };

    const result = await this.postRepository.update(postId, updatedPost);
    return this.mapToResponse(result);
  }

  /**
   * 게시글 삭제
   */
  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    if (post.userId !== userId) {
      throw new Error('Unauthorized: Only post author can delete');
    }

    await this.postRepository.delete(postId);
  }

  /**
   * 게시글 발행
   */
  async publishPost(postId: string, userId: string): Promise<IPostResponse> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    if (post.userId !== userId) {
      throw new Error('Unauthorized: Only post author can publish');
    }

    const publishedPost: IPost = {
      ...post,
      status: PostStatus.PUBLISHED,
      updatedAt: new Date(),
    };

    const result = await this.postRepository.update(postId, publishedPost);
    return this.mapToResponse(result);
  }

  /**
   * 게시글 좋아요
   */
  async likePost(postId: string): Promise<IPostResponse> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    post.likes += 1;
    const result = await this.postRepository.update(postId, post);
    return this.mapToResponse(result);
  }

  /**
   * 게시글 검색
   */
  async searchPosts(
    keyword: string,
    pagination?: PostPaginationOptions
  ): Promise<{ posts: IPostResponse[]; total: number }> {
    const posts = await this.postRepository.search(keyword, pagination);
    const total = await this.postRepository.countSearch(keyword);

    return {
      posts: posts.map((post) => this.mapToResponse(post)),
      total,
    };
  }

  /**
   * 게시글 통계 조회
   */
  async getStatistics(userId: string): Promise<IPostStatistics> {
    const posts = await this.postRepository.findByUserId(userId);

    const totalPosts = posts.length;
    const publishedPosts = posts.filter(
      (p) => p.status === PostStatus.PUBLISHED
    ).length;
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);

    return {
      totalPosts,
      publishedPosts,
      draftPosts: totalPosts - publishedPosts,
      totalViews,
      totalLikes,
      totalComments,
      averageViews: totalPosts > 0 ? totalViews / totalPosts : 0,
      averageLikes: totalPosts > 0 ? totalLikes / totalPosts : 0,
    };
  }

  /**
   * 응답 객체로 변환
   */
  private mapToResponse(post: IPost): IPostResponse {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
      category: post.category,
      status: post.status,
      views: post.views,
      likes: post.likes,
      comments: post.comments,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  /**
   * ID 생성 (UUID 형식)
   */
  private generateId(): string {
    return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
