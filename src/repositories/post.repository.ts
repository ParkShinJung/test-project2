/**
 * 게시글 저장소 구현
 * 게시글 데이터 접근 계층을 담당합니다.
 */

import { IPostRepository } from './post.repository.interface';
import { IPost } from '../interfaces';
import {
  PostFilterOptions,
  PostPaginationOptions,
  PostSortBy,
  PostStatus,
} from '../types';

export class PostRepository implements IPostRepository {
  // 메모리 저장소 (실제 구현에서는 데이터베이스 사용)
  private posts: Map<string, IPost> = new Map();

  /**
   * 게시글 생성
   */
  async create(post: IPost): Promise<IPost> {
    this.posts.set(post.id, post);
    return post;
  }

  /**
   * ID로 게시글 조회
   */
  async findById(id: string): Promise<IPost | null> {
    return this.posts.get(id) || null;
  }

  /**
   * 모든 게시글 조회
   */
  async findAll(
    filter?: PostFilterOptions,
    pagination?: PostPaginationOptions,
    sortBy?: PostSortBy
  ): Promise<IPost[]> {
    let results = Array.from(this.posts.values());

    // 필터 적용
    if (filter) {
      if (filter.status) {
        results = results.filter((p) => p.status === filter.status);
      }
      if (filter.category) {
        results = results.filter((p) => p.category === filter.category);
      }
      if (filter.userId) {
        results = results.filter((p) => p.userId === filter.userId);
      }
      if (filter.tags && filter.tags.length > 0) {
        results = results.filter((p) =>
          filter.tags!.some((tag) => p.tags.includes(tag))
        );
      }
    }

    // 정렬 적용
    if (sortBy) {
      results = this.sortPosts(results, sortBy);
    } else {
      // 기본 정렬: 최신순
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // 페이지네이션 적용
    if (pagination) {
      const skip = (pagination.page - 1) * pagination.limit;
      results = results.slice(skip, skip + pagination.limit);
    }

    return results;
  }

  /**
   * 사용자별 게시글 조회
   */
  async findByUserId(userId: string): Promise<IPost[]> {
    return Array.from(this.posts.values()).filter((p) => p.userId === userId);
  }

  /**
   * 게시글 수정
   */
  async update(id: string, post: IPost): Promise<IPost> {
    this.posts.set(id, post);
    return post;
  }

  /**
   * 게시글 삭제
   */
  async delete(id: string): Promise<void> {
    this.posts.delete(id);
  }

  /**
   * 게시글 검색
   */
  async search(
    keyword: string,
    pagination?: PostPaginationOptions
  ): Promise<IPost[]> {
    let results = Array.from(this.posts.values()).filter(
      (p) =>
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.content.toLowerCase().includes(keyword.toLowerCase())
    );

    // 최신순 정렬
    results.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 페이지네이션 적용
    if (pagination) {
      const skip = (pagination.page - 1) * pagination.limit;
      results = results.slice(skip, skip + pagination.limit);
    }

    return results;
  }

  /**
   * 게시글 개수 조회
   */
  async count(filter?: PostFilterOptions): Promise<number> {
    let results = Array.from(this.posts.values());

    if (filter) {
      if (filter.status) {
        results = results.filter((p) => p.status === filter.status);
      }
      if (filter.category) {
        results = results.filter((p) => p.category === filter.category);
      }
      if (filter.userId) {
        results = results.filter((p) => p.userId === filter.userId);
      }
      if (filter.tags && filter.tags.length > 0) {
        results = results.filter((p) =>
          filter.tags!.some((tag) => p.tags.includes(tag))
        );
      }
    }

    return results.length;
  }

  /**
   * 검색 결과 개수 조회
   */
  async countSearch(keyword: string): Promise<number> {
    return Array.from(this.posts.values()).filter(
      (p) =>
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.content.toLowerCase().includes(keyword.toLowerCase())
    ).length;
  }

  /**
   * 게시글 정렬
   */
  private sortPosts(posts: IPost[], sortBy: PostSortBy): IPost[] {
    const sorted = [...posts];

    switch (sortBy) {
      case PostSortBy.LATEST:
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case PostSortBy.OLDEST:
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case PostSortBy.MOST_VIEWED:
        sorted.sort((a, b) => b.views - a.views);
        break;
      case PostSortBy.MOST_LIKED:
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case PostSortBy.MOST_COMMENTED:
        sorted.sort((a, b) => b.comments - a.comments);
        break;
      default:
        break;
    }

    return sorted;
  }
}
