import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async create(createCommentDto: CreateCommentDto, user: IUser) {
    return this.commentModel.create({
      ...createCommentDto,
      user: user._id,
      parent: createCommentDto.parent || null,
    });
  }

async findAllByBook(bookId: string) {
  const allComments = await this.commentModel
    .find({ book: bookId, isDeleted: false })
    .populate('user', 'name email')
    .sort({ createdAt: 1 }) // oldest first
    .lean();

  const map = new Map<string, any>();

  for (const cmt of allComments) {
    (cmt as any).replies = [];
    map.set(cmt._id.toString(), cmt);
  }

  const roots: any[] = [];

  for (const cmt of allComments) {
    const parentId = cmt.parent?.toString();
    if (parentId && map.has(parentId)) {
      map.get(parentId).replies.push(cmt);
    } else {
      roots.push(cmt); // cấp 1 (gốc)
    }
  }

  return roots;
}

  async remove(id: string, user: IUser) {
    return this.commentModel.updateOne(
      { _id: id, user: user._id },
      { isDeleted: true }
    );
  }
}
