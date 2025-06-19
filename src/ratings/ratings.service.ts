/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Rating, RatingDocument } from './schemas/rating.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IsEmpty } from 'class-validator';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name)
    private ratingModel: SoftDeleteModel<RatingDocument>,
  ) {}

  async create(createRatingDto: CreateRatingDto, user: IUser) {
    return await this.ratingModel.create({
      ...createRatingDto,
      createdBy: { _id: user._id, email: user.email },
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filter, projection, population } = aqp(qs);
    let { sort } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    // filter mặc định đã có gtri không mong muốn, nên cần xóa đi
    let offset = (+currentPage - 1) * +limit; // tính tổng số trang
    let defaultLimit = +limit ? +limit : 10; // mặc định số bản ghi 1 trang nếu kh truyền vào

    const totalItems = (await this.ratingModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (IsEmpty(sort)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.ratingModel
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

  update(id: string, updateRatingDto: UpdateRatingDto, user: IUser) {
    return this.ratingModel.updateOne(
      { _id: id },
      { ...updateRatingDto, updatedBy: { _id: user._id, email: user.email } },
    );
  }

  async remove(id: string, user: IUser) {
    await this.ratingModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );
    return this.ratingModel.softDelete({ _id: id });
  }
}
