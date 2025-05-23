/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { IsEmpty } from 'class-validator';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: SoftDeleteModel<TagDocument>,
  ) {}

  async create(createTagDto: CreateTagDto, user: IUser) {
    return await this.tagModel.create({
      ...createTagDto,
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

    const totalItems = (await this.tagModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (IsEmpty(sort)) {
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.tagModel
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

  findOne(id: string) {
    return this.tagModel.findById(id);
  }

  async update(id: string, updateTagDto: UpdateTagDto, user: IUser) {
    return await this.tagModel.updateOne(
      { _id: id },
      { ...updateTagDto, updatedBy: { _id: user._id, email: user.email } },
    );
  }

  async remove(id: string, user: IUser) {
    await this.tagModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );
    return this.tagModel.softDelete({ _id: id });
  }
}
