# USER 인터페이스 구조 문서

## 개요
이 문서는 USER(사용자) 관련 인터페이스의 디렉토리 구조와 각 파일의 역할을 설명합니다.

## 디렉토리 구조

```
src/
├── interfaces/
│   └── user.interface.ts          # USER 기본 인터페이스 정의
├── types/
│   └── user.types.ts              # USER 관련 타입 정의
├── services/
│   └── user.service.interface.ts  # USER 서비스 인터페이스
├── repositories/
│   └── user.repository.interface.ts # USER 저장소 인터페이스
└── controllers/
    └── user.controller.interface.ts # USER 컨트롤러 인터페이스

docs/
└── USER_INTERFACE_STRUCTURE.md    # 이 문서
```

## 각 계층별 설명

### 1. Interfaces (`src/interfaces/user.interface.ts`)
기본적인 사용자 데이터 모델을 정의합니다.

**주요 인터페이스:**
- `IUser`: 사용자 기본 정보
- `ICreateUserRequest`: 사용자 생성 요청
- `IUpdateUserRequest`: 사용자 업데이트 요청
- `IUserResponse`: 단일 사용자 응답
- `IUserListResponse`: 사용자 목록 응답

### 2. Types (`src/types/user.types.ts`)
사용자 관련 타입과 열거형을 정의합니다.

**주요 타입:**
- `UserRole`: 사용자 역할 (admin, user, guest)
- `UserStatus`: 사용자 상태 (active, inactive, suspended, deleted)
- `UserGender`: 사용자 성별
- `UserSortBy`: 정렬 기준
- `SortOrder`: 정렬 순서
- `UserFilterOptions`: 필터 옵션
- `UserPaginationOptions`: 페이지네이션 옵션

### 3. Services (`src/services/user.service.interface.ts`)
비즈니스 로직을 정의하는 서비스 계층입니다.

**주요 메서드:**
- `getAllUsers()`: 모든 사용자 조회
- `getUserById()`: ID로 사용자 조회
- `getUserByEmail()`: 이메일로 사용자 조회
- `createUser()`: 사용자 생성
- `updateUser()`: 사용자 정보 업데이트
- `deleteUser()`: 사용자 삭제
- `activateUser()`: 사용자 활성화
- `deactivateUser()`: 사용자 비활성화
- `userExists()`: 사용자 존재 여부 확인
- `getUserCount()`: 사용자 총 개수 조회

### 4. Repositories (`src/repositories/user.repository.interface.ts`)
데이터베이스 접근 계층입니다.

**주요 메서드:**
- `findAll()`: 모든 사용자 조회
- `findById()`: ID로 사용자 조회
- `findByEmail()`: 이메일로 사용자 조회
- `create()`: 사용자 생성
- `update()`: 사용자 정보 업데이트
- `delete()`: 사용자 삭제
- `exists()`: 사용자 존재 여부 확인
- `count()`: 사용자 총 개수 조회
- `deleteAll()`: 모든 사용자 삭제 (테스트용)

### 5. Controllers (`src/controllers/user.controller.interface.ts`)
HTTP 요청 처리 계층입니다.

**주요 메서드:**
- `getAllUsers()`: 모든 사용자 조회
- `getUserById()`: ID로 사용자 조회
- `createUser()`: 사용자 생성
- `updateUser()`: 사용자 정보 업데이트
- `deleteUser()`: 사용자 삭제
- `activateUser()`: 사용자 활성화
- `deactivateUser()`: 사용자 비활성화

## 아키텍처 패턴

이 구조는 **계층화 아키텍처(Layered Architecture)** 패턴을 따릅니다:

```
Controller Layer (HTTP 요청 처리)
    ↓
Service Layer (비즈니스 로직)
    ↓
Repository Layer (데이터 접근)
    ↓
Database
```

## 사용 예시

### 1. 인터페이스 구현 (Service)
```typescript
import { IUserService } from './user.service.interface';
import { IUser, ICreateUserRequest } from '../interfaces/user.interface';

export class UserService implements IUserService {
  async createUser(createUserRequest: ICreateUserRequest): Promise<IUser> {
    // 구현 로직
  }
  // ... 다른 메서드들
}
```

### 2. 인터페이스 구현 (Repository)
```typescript
import { IUserRepository } from './user.repository.interface';

export class UserRepository implements IUserRepository {
  async create(createUserRequest: ICreateUserRequest): Promise<IUser> {
    // 데이터베이스 저장 로직
  }
  // ... 다른 메서드들
}
```

### 3. 인터페이스 구현 (Controller)
```typescript
import { IUserController } from './user.controller.interface';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  async createUser(createUserRequest: ICreateUserRequest): Promise<IUserResponse> {
    // HTTP 요청 처리 로직
  }
  // ... 다른 메서드들
}
```

## 확장 가능성

이 구조는 다음과 같은 확장을 쉽게 지원합니다:

1. **새로운 기능 추가**: 각 계층에 새로운 메서드 추가
2. **다양한 데이터베이스 지원**: Repository 구현체 변경
3. **인증/인가 추가**: Service 계층에 로직 추가
4. **캐싱 추가**: Service 계층에 캐싱 로직 추가
5. **로깅/모니터링**: 각 계층에 데코레이터 추가

## 다음 단계

1. 각 인터페이스의 구현체 작성
2. 단위 테스트 작성
3. 통합 테스트 작성
4. API 라우트 정의
5. 데이터베이스 스키마 정의
