// src/types/book.ts

export interface Tag {
    _id: string;
    name: string;
}

export interface CreatedBy {
    _id: string;
    email: string;
}

export interface Book {
    _id: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    tags: Tag | Tag[]; // nếu sau này chuyển thành array thì khỏi sửa nhiều
    isPremium: boolean;
    createdBy: CreatedBy;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;

    // Các field frontend thêm
    isLiked?: boolean;
    totalLikes?: number;
    rating?: number;
    totalReviews?: number;
    category?: string;
    coverImage?: string; // nếu m dùng thêm tên này
}
