# 사용자와 게시글 인터페이스 구조 분석 보고서

## 📋 목차
1. [개요](#개요)
2. [엔티티 관계도](#엔티티-관계도)
3. [User 엔티티 상세](#user-엔티티-상세)
4. [Post 엔티티 상세](#post-엔티티-상세)
5. [인터페이스 계층 구조](#인터페이스-계층-구조)
6. [데이터 흐름](#데이터-흐름)
7. [설계 패턴 및 특징](#설계-패턴-및-특징)
8. [API 엔드포인트](#api-엔드포인트)

---

## 개요

본 문서는 게시판 시스템의 핵심 엔티티인 **User(사용자)**와 **Post(게시글)**의 인터페이스 구조를 상세히 분석합니다.

### 핵심 관계
- **관계 유형**: One-to-Many (1:N)
- **설명**: 한 명의 사용자는 여러 개의 게시글을 작성할 수 있습니다.
- **외래키**: `Post.authorId` → `User.id`

---

## 엔티티 관계도

```
┌─────────────────────────────────────────────────────────────┐
│                         USER (1)                             │
├─────────────────────────────────────────────────────────────┤
│ PK: id (string)                                             │
│ - name: string                                              │
│ - email: string                                             │
│ - phone?: string                                            │
│ - address?: string                                          │
│ - isActive: boolean                                         │
│ - createdAt: Date                                           │
│ - updatedAt: Date                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ writes (1:N)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      POST (0..*)                             │
├─────────────────────────────────────────────────────────────┤
│ PK: id (string)                                             │
│ FK: authorId (string) → User.id                             │
│ - title: string                                             │
│ - content: string                                           │
│ - author?: IUser                                            │
│ - category?: string                                         │
│ - tags?: string[]                                           │
│ - viewCount: number                                         │
│ - likeCount: number                                         │
│ - commentCount: number                                      │
│ - isPublished: boolean                                      │
│ - isPinned: boolean                                         │
│ - createdAt: Date                                           │
│ - updatedAt: Date                                           │
│ - deletedAt?: Date (소프트 삭제)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## User 엔티티 상세

### IUser 인터페이스

```typescript
export interface IUser {
  /**
   * 사용자 고유 ID
   * - 타입: string (UUID 또는 자동 생성)
   * - 필수: Yes
   * - 유니크: Yes
   */
  id: string;

  /**
   * 사용자 이름
   * - 타입: string
   * - 필수: Yes
   * - 최대 길이: 255
   */
  name: string;

  /**
   * 사용자 이메일
   * - 타입: string
   * - 필수: Yes
   * - 유니크: Yes
   * - 형식: email
   */
  email: string;

  /**
   * 사용자 전화번호
   * - 타입: string
   * - 필수: No
   * - 형식: phone number
   */
  phone?: string;

  /**
   * 사용자 주소
   * - 타입: string
   * - 필수: No
   * - 최대 길이: 500
   */
  address?: string;

  /**
   * 사용자 생성 날짜
   * - 타입: Date
   * - 필수: Yes
   * - 자동 생성: Yes
   */
  createdAt: Date;

  /**
   * 사용자 수정 날짜
   * - 타입: Date
   * - 필수: Yes
   * - 자동 업데이트: Yes
   */
  updatedAt: Date;

  /**
   * 사용자 활성화 여부
   * - 타입: boolean
   * - 필수: Yes
   * - 기본값: true
   */
  isActive: boolean;
}
```

### User 관련 요청/응답 인터페이스

#### ICreateUserRequest
```typescript
export interface ICreateUserRequest {
  name: string;           // 필수
  email: string;          // 필수
  phone?: string;         // 선택
  address?: string;       // 선택
}
```

#### IUpdateUserRequest
```typescript
export interface IUpdateUserRequest {
  name?: string;          // 선택
  email?: string;         // 선택
  phone?: string;         // 선택
  address?: string;       // 선택
  isActive?: boolean;     // 선택
}
```

#### IUserResponse
```typescript
export interface IUserResponse {
  success: boolean;       // 요청 성공 여부
  data?: IUser;          // 사용자 정보
  message?: string;      // 성공 메시지
  error?: string;        // 에러 메시지
}
```

#### IUserListResponse
```typescript
export interface IUserListResponse {
  success: boolean;       // 요청 성공 여부
  data?: IUser[];        // 사용자 목록
  total?: number;        // 전체 개수
  message?: string;      // 성공 메시지
  error?: string;        // 에러 메시지
}
```

### User 관련 타입 정의

| 타입명 | 값 | 설명 |
|--------|-----|------|
| **UserRole** | 'admin' \| 'user' \| 'guest' | 사용자 역할 |
| **UserStatus** | 'active' \| 'inactive' \| 'suspended' \| 'deleted' | 사용자 상태 |
| **UserGender** | 'male' \| 'female' \| 'other' \| 'not_specified' | 사용자 성별 |
| **UserSortBy** | 'id' \| 'name' \| 'email' \| 'createdAt' \| 'updatedAt' | 정렬 기준 |
| **SortOrder** | 'asc' \| 'desc' | 정렬 순서 |

### User 필터 및 페이지네이션

#### UserFilterOptions
```typescript
export interface UserFilterOptions {
  role?: UserRole;                // 역할로 필터링
  status?: UserStatus;            // 상태로 필터링
  isActive?: boolean;             // 활성화 여부로 필터링
  createdAfter?: Date;            // 생성 날짜 이후
  createdBefore?: Date;           // 생성 날짜 이전
}
```

#### UserPaginationOptions
```typescript
export interface UserPaginationOptions {
  page: number;                   // 페이지 번호 (1부터 시작)
  limit: number;                  // 페이지당 항목 수
  sortBy?: UserSortBy;            // 정렬 기준
  sortOrder?: SortOrder;          // 정렬 순서
}
```

---

## Post 엔티티 상세

### IPost 인터페이스

```typescript
export interface IPost {
  /**
   * 게시글 고유 ID
   * - 타입: string (UUID 또는 자동 생성)
   * - 필수: Yes
   * - 유니크: Yes
   */
  id: string;

  /**
   * 게시글 제목
   * - 타입: string
   * - 필수: Yes
   * - 최대 길이: 255
   */
  title: string;

  /**
   * 게시글 내용
   * - 타입: string
   * - 필수: Yes
   * - 최대 길이: 10000
   */
  content: string;

  /**
   * 게시글 작성자 ID
   * - 타입: string
   * - 필수: Yes
   * - 외래키: User.id
   */
  authorId: string;

  /**
   * 게시글 작성자 정보
   * - 타입: IUser
   * - 필수: No (선택적 로딩)
   * - 관계: ManyToOne
   */
  author?: IUser;

  /**
   * 게시글 카테고리
   * - 타입: string
   * - 필수: No
   * - 값: notice, general, question, review, free, other
   */
  category?: string;

  /**
   * 게시글 태그 목록
   * - 타입: string[]
   * - 필수: No
   * - 최대 개수: 10
   */
  tags?: string[];

  /**
   * 게시글 조회수
   * - 타입: number
   * - 필수: Yes
   * - 기본값: 0
   * - 최소값: 0
   */
  viewCount: number;

  /**
   * 게시글 좋아요 수
   * - 타입: number
   * - 필수: Yes
   * - 기본값: 0
   * - 최소값: 0
   */
  likeCount: number;

  /**
   * 게시글 댓글 수
   * - 타입: number
   * - 필수: Yes
   * - 기본값: 0
   * - 최소값: 0
   */
  commentCount: number;

  /**
   * 게시글 생성 날짜
   * - 타입: Date
   * - 필수: Yes
   * - 자동 생성: Yes
   */
  createdAt: Date;

  /**
   * 게시글 수정 날짜
   * - 타입: Date
   * - 필수: Yes
   * - 자동 업데이트: Yes
   */
  updatedAt: Date;

  /**
   * 게시글 삭제 날짜
   * - 타입: Date
   * - 필수: No
   * - 설명: 소프트 삭제 구현 (물리적 삭제 아님)
   */
  deletedAt?: Date;

  /**
   * 게시글 공개 여부
   * - 타입: boolean
   * - 필수: Yes
   * - 기본값: false
   */
  isPublished: boolean;

  /**
   * 게시글 고정 여부
   * - 타입: boolean
   * - 필수: Yes
   * - 기본값: false
   */
  isPinned: boolean;
}
```

### Post 관련 요청/응답 인터페이스

#### ICreatePostRequest
```typescript
export interface ICreatePostRequest {
  title: string;          // 필수
  content: string;        // 필수
  authorId: string;       // 필수
  category?: string;      // 선택
  tags?: string[];        // 선택
  isPublished?: boolean;  // 선택 (기본값: false)
}
```

#### IUpdatePostRequest
```typescript
export interface IUpdatePostRequest {
  title?: string;         // 선택
  content?: string;       // 선택
  category?: string;      // 선택
  tags?: string[];        // 선택
  isPublished?: boolean;  // 선택
  isPinned?: boolean;     // 선택
}
```

#### IPostResponse
```typescript
export interface IPostResponse {
  success: boolean;       // 요청 성공 여부
  data?: IPost;          // 게시글 정보
  message?: string;      // 성공 메시지
  error?: string;        // 에러 메시지
}
```

#### IPostListResponse
```typescript
export interface IPostListResponse {
  success: boolean;       // 요청 성공 여부
  data?: IPost[];        // 게시글 목록
  total?: number;        // 전체 개수
  page?: number;         // 현재 페이지
  limit?: number;        // 페이지당 항목 수
  message?: string;      // 성공 메시지
  error?: string;        // 에러 메시지
}
```

#### IPostStatistics
```typescript
export interface IPostStatistics {
  totalPosts: number;                    // 전체 게시글 수
  totalViews: number;                    // 전체 조회수
  totalLikes: number;                    // 전체 좋아요 수
  averageComments: number;               // 평균 댓글 수
  postsPerCategory: Record<string, number>; // 카테고리별 게시글 수
}
```

### Post 관련 타입 정의

| 타입명 | 값 | 설명 |
|--------|-----|------|
| **PostStatus** | 'draft' \| 'published' \| 'archived' \| 'deleted' | 게시글 상태 |
| **PostCategory** | 'notice' \| 'general' \| 'question' \| 'review' \| 'free' \| 'other' | 게시글 카테고리 |
| **PostSortBy** | 'id' \| 'title' \| 'createdAt' \| 'updatedAt' \| 'viewCount' \| 'likeCount' \| 'commentCount' | 정렬 기준 |
| **SortOrder** | 'asc' \| 'desc' | 정렬 순서 |

### Post 필터, 검색 및 페이지네이션

#### PostFilterOptions
```typescript
export interface PostFilterOptions {
  category?: PostCategory;        // 카테고리로 필터링
  authorId?: string;              // 작성자 ID로 필터링
  isPublished?: boolean;          // 공개 여부로 필터링
  isPinned?: boolean;             // 고정 여부로 필터링
  tags?: string[];                // 태그로 필터링
  createdAfter?: Date;            // 생성 날짜 이후
  createdBefore?: Date;           // 생성 날짜 이전
  minViewCount?: number;          // 최소 조회수
  minLikeCount?: number;          // 최소 좋아요 수
  searchKeyword?: string;         // 검색 키워드
}
```

#### PostSearchOptions
```typescript
export interface PostSearchOptions {
  keyword: string;                // 검색 키워드 (필수)
  searchIn?: ('title' | 'content' | 'tags')[]; // 검색 대상
  category?: PostCategory;        // 카테고리 필터
  authorId?: string;              // 작성자 ID 필터
}
```

#### PostPaginationOptions
```typescript
export interface PostPaginationOptions {
  page: number;                   // 페이지 번호 (1부터 시작)
  limit: number;                  // 페이지당 항목 수
  sortBy?: PostSortBy;            // 정렬 기준
  sortOrder?: SortOrder;          // 정렬 순서
}
```

#### PostStatisticsFilter
```typescript
export interface PostStatisticsFilter {
  startDate?: Date;               // 시작 날짜
  endDate?: Date;                 // 종료 날짜
  category?: PostCategory;        // 카테고리 필터
  authorId?: string;              // 작성자 ID 필터
}
```

---

## 인터페이스 계층 구조

### 아키텍처 레이어

```
┌─────────────────────────────────────────────────────────────┐
│                    HTTP Layer                               │
│              (HTTP Request/Response)                         │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 Controller Layer                             │
│  IUserController          │         IPostController          │
│  - getAllUsers()          │         - getAllPosts()          │
│  - getUserById()          │         - getPostById()          │
│  - createUser()           │         - createPost()           │
│  - updateUser()           │         - updatePost()           │
│  - deleteUser()           │         - deletePost()           │
│  - activateUser()         │         - searchPosts()          │
│  - deactivateUser()       │         - getPostsByAuthor()     │
│                           │         - getPopularPosts()      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Service Layer                              │
│  IUserService             │         IPostService            │
│  - 비즈니스 로직           │         - 비즈니스 로직          │
│  - 유효성 검사             │         - 검색 처리             │
│  - 트랜잭션 관리           │         - 통계 계산             │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                Repository Layer                             │
│  IUserRepository          │         IPostRepository         │
│  - find()                 │         - find()                │
│  - findById()             │         - findById()            │
│  - save()                 │         - save()                │
│  - update()               │         - update()              │
│  - delete()               │         - delete()              │
│                           │         - search()              │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                │
│              (PostgreSQL Database)                           │
└─────────────────────────────────────────────────────────────┘
```

### 인터페이스/타입 레이어

```
┌─────────────────────────────────────────────────────────────┐
│              Interface/Type Layer                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User 관련                    │    Post 관련                 │
│  ├─ IUser                     │    ├─ IPost                 │
│  ├─ ICreateUserRequest        │    ├─ ICreatePostRequest    │
│  ├─ IUpdateUserRequest        │    ├─ IUpdatePostRequest    │
│  ├─ IUserResponse             │    ├─ IPostResponse         │
│  ├─ IUserListResponse         │    ├─ IPostListResponse     │
│  ├─ UserRole                  │    ├─ IPostStatistics       │
│  ├─ UserStatus               │    ├─ PostStatus            │
│  ├─ UserGender               │    ├─ PostCategory          │
│  ├─ UserFilterOptions        │    ├─ PostFilterOptions     │
│  └─ UserPaginationOptions    │    ├─ PostSearchOptions     │
│                               │    ├─ PostPaginationOptions │
│                               │    └─ PostStatisticsFilter  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 데이터 흐름

### User 생성 흐름

```
HTTP POST /users
    ↓
IUserController.createUser(ICreateUserRequest)
    ↓
IUserService.createUser(ICreateUserRequest)
    ├─ 유효성 검사
    ├─ 중복 확인 (email)
    └─ 데이터 변환
    ↓
IUserRepository.save(IUser)
    ↓
Database (INSERT)
    ↓
IUserResponse { success: true, data: IUser }
    ↓
HTTP 201 Created
```

### Post 생성 흐름

```
HTTP POST /posts
    ↓
IPostController.createPost(ICreatePostRequest)
    ↓
IPostService.createPost(ICreatePostRequest)
    ├─ 유효성 검사
    ├─ 작성자 확인 (authorId)
    └─ 데이터 변환
    ↓
IPostRepository.save(IPost)
    ↓
Database (INSERT)
    ↓
IPostResponse { success: true, data: IPost }
    ↓
HTTP 201 Created
```

### Post 조회 (작성자 정보 포함) 흐름

```
HTTP GET /posts/:id
    ↓
IPostController.getPostById(id)
    ↓
IPostService.getPostById(id)
    ↓
IPostRepository.findById(id, { relations: ['author'] })
    ├─ Post 조회
    └─ User 정보 JOIN
    ↓
Database (SELECT with JOIN)
    ↓
IPost { ..., author: IUser }
    ↓
IPostResponse { success: true, data: IPost }
    ↓
HTTP 200 OK
```

---

## 설계 패턴 및 특징

### 1. 관계 로딩 (Lazy/Eager Loading)

Post 조회 시 작성자(author) 정보를 선택적으로 로드할 수 있습니다.

```typescript
// 작성자 정보 없이 조회
const post = await postRepository.findById(id);

// 작성자 정보 포함하여 조회
const post = await postRepository.findById(id, { relations: ['author'] });
```

### 2. 소프트 삭제 (Soft Delete)

Post의 `deletedAt` 필드를 사용하여 논리적 삭제를 구현합니다.

```typescript
// 물리적 삭제 대신 deletedAt 설정
post.deletedAt = new Date();
await postRepository.save(post);

// 조회 시 삭제되지 않은 게시글만 반환
const posts = await postRepository.find({ where: { deletedAt: IsNull() } });
```

### 3. 메타데이터 추적

게시글의 인기도를 추적하기 위해 메타데이터를 관리합니다.

```typescript
interface IPost {
  viewCount: number;      // 조회수
  likeCount: number;      // 좋아요 수
  commentCount: number;   // 댓글 수
}
```

### 4. 상태 관리

게시글의 상태를 명확히 관리합니다.

```typescript
interface IPost {
  isPublished: boolean;   // 공개 여부
  isPinned: boolean;      // 고정 여부
}
```

### 5. 필터링 및 검색

유연한 필터링과 검색 기능을 제공합니다.

```typescript
// 필터링
const posts = await postService.getAllPosts({
  category: 'notice',
  authorId: 'user-123',
  isPublished: true,
  minViewCount: 100
});

// 검색
const results = await postService.searchPosts({
  keyword: 'TypeScript',
  searchIn: ['title', 'content'],
  category: 'general'
});
```

### 6. 페이지네이션

대량의 데이터를 효율적으로 처리합니다.

```typescript
const response = await postService.getAllPosts(
  {},
  {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
);
```

### 7. 통계 기능

게시글 통계를 제공합니다.

```typescript
const stats = await postService.getPostStatistics();
// {
//   totalPosts: 1000,
//   totalViews: 50000,
//   totalLikes: 5000,
//   averageComments: 2.5,
//   postsPerCategory: { notice: 100, general: 500, ... }
// }
```

---

## API 엔드포인트

### User API

| 메서드 | 엔드포인트 | 설명 | 요청 | 응답 |
|--------|-----------|------|------|------|
| GET | `/users` | 모든 사용자 조회 | - | IUserListResponse |
| GET | `/users/:id` | 사용자 조회 | - | IUserResponse |
| POST | `/users` | 사용자 생성 | ICreateUserRequest | IUserResponse |
| PATCH | `/users/:id` | 사용자 수정 | IUpdateUserRequest | IUserResponse |
| DELETE | `/users/:id` | 사용자 삭제 | - | IUserResponse |
| POST | `/users/:id/activate` | 사용자 활성화 | - | IUserResponse |
| POST | `/users/:id/deactivate` | 사용자 비활성화 | - | IUserResponse |

### Post API

| 메서드 | 엔드포인트 | 설명 | 요청 | 응답 |
|--------|-----------|------|------|------|
| GET | `/posts` | 모든 게시글 조회 | PostFilterOptions, PostPaginationOptions | IPostListResponse |
| GET | `/posts/:id` | 게시글 조회 | - | IPostResponse |
| POST | `/posts` | 게시글 생성 | ICreatePostRequest | IPostResponse |
| PATCH | `/posts/:id` | 게시글 수정 | IUpdatePostRequest | IPostResponse |
| DELETE | `/posts/:id` | 게시글 삭제 | - | IPostResponse |
| POST | `/posts/search` | 게시글 검색 | PostSearchOptions, PostPaginationOptions | IPostListResponse |
| POST | `/posts/:id/view` | 조회수 증가 | - | IPostResponse |
| POST | `/posts/:id/like` | 좋아요 추가 | - | IPostResponse |
| DELETE | `/posts/:id/like` | 좋아요 제거 | - | IPostResponse |
| POST | `/posts/:id/pin` | 게시글 고정 | - | IPostResponse |
| DELETE | `/posts/:id/pin` | 게시글 고정 해제 | - | IPostResponse |
| PATCH | `/posts/:id/publish` | 게시글 공개 상태 변경 | { isPublished: boolean } | IPostResponse |
| GET | `/users/:authorId/posts` | 사용자별 게시글 조회 | PostPaginationOptions | IPostListResponse |
| GET | `/posts/category/:category` | 카테고리별 게시글 조회 | PostPaginationOptions | IPostListResponse |
| GET | `/posts/tag/:tag` | 태그별 게시글 조회 | PostPaginationOptions | IPostListResponse |
| GET | `/posts/popular` | 인기 게시글 조회 | limit | IPostListResponse |
| GET | `/posts/recent` | 최신 게시글 조회 | limit | IPostListResponse |
| GET | `/posts/statistics` | 게시글 통계 조회 | - | IPostResponse |

---

## 요약

### 핵심 특징

1. **명확한 관계 정의**: User-Post 간 One-to-Many 관계를 명확히 정의
2. **포괄적인 인터페이스**: 생성, 수정, 조회, 삭제 등 모든 작업에 대한 인터페이스 제공
3. **유연한 필터링**: 다양한 조건으로 데이터를 필터링할 수 있는 옵션 제공
4. **효율적인 페이지네이션**: 대량의 데이터를 효율적으로 처리
5. **메타데이터 추적**: 게시글의 조회수, 좋아요, 댓글 수 등을 추적
6. **소프트 삭제**: 데이터 무결성을 유지하면서 삭제 기능 구현
7. **통계 기능**: 게시글 통계를 제공하여 분석 가능

### 확장 가능성

- 댓글(Comment) 엔티티 추가 가능 (Post와 One-to-Many 관계)
- 좋아요(Like) 엔티티 추가 가능 (User-Post 간 Many-to-Many 관계)
- 팔로우(Follow) 엔티티 추가 가능 (User 간 Many-to-Many 관계)
- 알림(Notification) 엔티티 추가 가능 (User와 One-to-Many 관계)

---

**작성일**: 2024년
**버전**: 1.0
**상태**: 완료
