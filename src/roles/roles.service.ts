/* eslint-disable prefer-const */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, RolesDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IsEmpty } from 'class-validator';
import mongoose from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name)
    private roleModel: SoftDeleteModel<RolesDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name, des, isActive, permission } = createRoleDto;
    const isExist = await this.roleModel.findOne({ name });

    if (isExist)
      throw new BadRequestException(`role với name = ${name} đã tồn tại`);

    const newRole = await this.roleModel.create({
      name,
      des,
      isActive,
      permission,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return { _id: newRole._id };
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

    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (IsEmpty(sort)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.roleModel
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
    return await this.roleModel.findById(id).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, name: 1, method: 1 },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('not found role');

    return await this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
        updatedBy: { _id: user._id, email: user.email },
      },
    );
  }

  async remove(id: string, user: IUser) {
    const foundRole = await this.roleModel.findById(id);
    if (foundRole?.name === 'admin')
      throw new BadRequestException('kh dc xoa admin');
    await this.roleModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );
    return await this.roleModel.softDelete({ _id: id });
  }
}
