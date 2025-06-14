export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    price: number;
    category: string;
    rating: number;
    publishedDate: string;
    publisher: string;
    totalChapters: number;
    currentChapter: number;
    isMemberOnly: boolean;
    isLiked: boolean;
    totalReviews: number;
    totalLikes: number;
    tags: string[];
}

export interface Chapter {
    id: string;
    title: string;
    content: string;
    number: number;
}

export interface BookContent {
    id: string;
    title: string;
    author: string;
    currentChapter: Chapter;
    totalChapters: number;
    chapters: Chapter[];
    isMemberOnly: boolean;
}

// Sample book data
export const sampleBook: Book = {
    id: '684cf5855317590b27a8990b',
    title: 'Bảo bối của ngài Tống',
    author: 'Đại Mộng Sơ Tỉnh A',
    description: `Đối diện với toan tính của người thân, cô than nhiên ngồi lên đùi anh, nói: "Đường Lê tôi hoặc hoặc là độc thân, còn đã cưới thì phải lấy người đàn ông quyền lực nhất!"

Cứ thế, nhân vật tai to mặt lớn, quyền cao chức trọng như Tống Bách Ngạn dây dưa nửa đời còn lại với một cô nhóc.

Kiếp trước, cô sống trong dối lừa, kết cục thê thảm.

Kiếp này, cô thề sẽ không giẫm lên vết xe đổ của kiếp trước. Kết quả lại dây vào người đàn ông quyền lực, ngồi trên chúng sinh.

Cuộc sống sau khi cưới...

"Thưa ngài, phu nhân dỡ mất tường phía đông sơn trang rồi."
"Bảo vệ phu nhân cho kỹ, đừng để cô ấy bị thường."
"Thưa ngài, phu nhân nói muốn dẫn cậu chủ bỏ nhà ra đi."

Ngài Tống thở dài, đặt tài liệu trên tay xuống rồi căn dặn: "Lái xe đưa đi, đừng để hai mẹ con lạc đường."`,
    coverImage: 'https://waka.vn/images/books/bao-boi-cua-ngai-tong.jpg',
    price: 99000,
    category: 'Ngôn tình',
    rating: 4.7,
    publishedDate: '2023-01-15',
    publisher: 'NXB Lao Động',
    totalChapters: 58,
    currentChapter: 55,
    isMemberOnly: true,
    isLiked: false,
    totalReviews: 141,
    totalLikes: 1234,
    tags: ['Ngôn tình', 'Hiện đại', 'Cán bộ cấp cao', 'Trùng sinh', 'Sảng văn'],
};

// Sample chapters data
const generateChapters = (): Chapter[] => {
    const chapters: Chapter[] = [];
    for (let i = 1; i <= 58; i++) {
        chapters.push({
            id: `chapter-${i}`,
            title: `Chương ${i}: ${
                i === 1
                    ? 'Khởi đầu mới'
                    : i === 58
                    ? 'Kết thúc viên mãn'
                    : `Chương ${i}`
            }`,
            content: `Đây là nội dung của chương ${i}. ${
                i === 1
                    ? 'Đây là chương mở đầu của câu chuyện...'
                    : i === 58
                    ? 'Đây là chương cuối cùng của câu chuyện...'
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.repeat(
                          5
                      )
            }`,
            number: i,
        });
    }
    return chapters;
};

export const sampleBookContent: BookContent = {
    id: sampleBook.id,
    title: sampleBook.title,
    author: sampleBook.author,
    currentChapter: generateChapters()[54], // Chapter 55
    totalChapters: sampleBook.totalChapters,
    chapters: generateChapters(),
    isMemberOnly: sampleBook.isMemberOnly,
};

// Mock API functions
export const mockApi = {
    getBookDetails: async (id: string): Promise<Book> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (id === sampleBook.id) {
            return sampleBook;
        }
        throw new Error('Book not found');
    },

    getBookContent: async (id: string): Promise<BookContent> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (id === sampleBook.id) {
            return sampleBookContent;
        }
        throw new Error('Book content not found');
    },

    toggleLike: async (id: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (id === sampleBook.id) {
            sampleBook.isLiked = !sampleBook.isLiked;
            sampleBook.totalLikes += sampleBook.isLiked ? 1 : -1;
            return sampleBook.isLiked;
        }
        throw new Error('Book not found');
    },

    getChapter: async (
        bookId: string,
        chapterNumber: number
    ): Promise<Chapter> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (bookId === sampleBook.id) {
            const chapter = sampleBookContent.chapters.find(
                (c) => c.number === chapterNumber
            );
            if (chapter) {
                sampleBookContent.currentChapter = chapter;
                return chapter;
            }
        }
        throw new Error('Chapter not found');
    },
};
