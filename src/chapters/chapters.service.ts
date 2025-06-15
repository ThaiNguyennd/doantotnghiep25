/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { IUser } from 'src/users/users.interface';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IsEmpty } from 'class-validator';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name)
    private chapterModel: SoftDeleteModel<ChapterDocument>,
  ) {}
  async create(createChapterDto: CreateChapterDto, user: IUser) {
    return await this.chapterModel.create({
      ...createChapterDto,
      createdBy: { _id: user._id, email: user.email },
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, projection, population } = aqp(qs);
    let { sort } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    // filter mặc định đã có gtri không mong muốn, nên cần xóa đi
    let offset = (+currentPage - 1) * +limit; // tính tổng số trang
    let defaultLimit = +limit ? +limit : 10; // mặc định số bản ghi 1 trang nếu kh truyền vào

    const totalItems = (await this.chapterModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (IsEmpty(sort)) {
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.chapterModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  async findOne(id: string) {
    return await this.chapterModel.findById(id);
  }
  async findByBook(id: string) {
    return await this.chapterModel
      .find({ 'book._id': id })
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateChapterDto: UpdateChapterDto, user: IUser) {
    return await this.chapterModel.updateOne(
      { _id: id },
      { ...updateChapterDto, updatedBy: { _id: user._id, email: user.email } },
    );
  }

  async remove(id: string, user: IUser) {
    await this.chapterModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );
    return this.chapterModel.softDelete({ _id: id });
  }
}
