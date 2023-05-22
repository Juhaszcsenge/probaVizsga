import { Body, Controller, Get, HttpCode, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import Payments from './Entity/payment.entity';
import Members from './Entity/member.entity';
import { MemberDTO } from './member.dto';
import { PaymentDTO } from './payment.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource
  ) {}

  @Post("/seed")
  async fillPayments() {
    const paymentRepo = this.dataSource.getRepository(Payments)
      for (let i = 0; i < 16; i++) {
      const payment = new Payments();
      payment.id = i;
      payment.amount = i * 1234;
      payment.member_id = i;
      payment.paid_at = "2023-04-07";
      await paymentRepo.save(payment);
    }
    return Payments;
  }

  @Get("/api/members")
  async getAllMembers() {
    const membersRepo = this.dataSource.getRepository(Members);
    return membersRepo.find();
  }

  @Post("/api/members")
  async newMember(@Body() memberDto: MemberDTO) {
    const membersRepo = this.dataSource.getRepository(Members);
    const newMember = new Members();
    newMember.name = memberDto.name;
    newMember.birth_date = memberDto.birth_date;
    newMember.gender = memberDto.gender;
    newMember.created_at = new Date().toString();
    try {
      membersRepo.save(newMember);
    } catch (e) {
      return e;
    }
    return newMember;
  }

  @Post("/api/members/:id/pay")
  async findOne(@Param() param:any) {
    const newPayment = new Payments();
    const payRepo = this.dataSource.getRepository(Payments);
    newPayment.paid_at = new Date().toString();
    newPayment.amount = 5000;
    newPayment.member_id = param.id;
    payRepo.save(newPayment);
    return newPayment;
  }
}
