/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IUser } from 'src/users/users.interface';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: SoftDeleteModel<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: IUser) {
    return await this.commentModel.create({
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
    const comment = await this.commentModel.findOne({ _id: id });

    if (!comment) throw new BadRequestException('kh tìm thấy cmt');

    if (comment.user.toString() !== user._id.toString()) {
      throw new ForbiddenException('Không có quyền xoá comment này');
    }

    if (!comment.parent) {
      const idsToDelete = [comment._id];
      let currentLevel = [comment._id];

      while (currentLevel.length > 0) {
        const replies = await this.commentModel
          .find({ parent: { $in: currentLevel } }, '_id')
          .lean();

        const replyIds = replies.map((r) => r._id);
        idsToDelete.push(...replyIds);
        currentLevel = replyIds;
      }

      // Ghi người xoá
      await this.commentModel.updateMany(
        { _id: { $in: idsToDelete } },
        { deletedBy: { _id: user._id, email: user.email } },
      );

      // Xoá mềm

      return await this.commentModel.softDelete({ _id: { $in: idsToDelete } });
    }

    // Nếu là comment cha
    await this.commentModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );

    return await this.commentModel.softDelete({ _id: id });
  }
}
