import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AmqpService } from '@weather_wise_backend/shared/src/amqp/amqp.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { RolesGuard } from '@weather_wise_backend/src/auth/guards/roles.guard';
import { constants } from '@weather_wise_backend/shared/src/config/constants';
import { ContactService } from '@weather_wise_backend/src/worker/contact/contact.service';
import { SendContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/send-contact.input';
import { CreateContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/create-contact.input';
import { UpdateContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/update-contact.input';
import { FilterContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/filter-contact.input';

@ApiBearerAuth()
@ApiTags('Contact')
@UseGuards(RolesGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: ContactService, private readonly amqpService: AmqpService) { }

  @ApiOperation({ description: 'Contact send action' })
  @Post('send')
  async send(@Body() inputDto: SendContactInput) {
    await this.amqpService.send(constants.EXCHANGE_WORKER, `/send/${inputDto.job}`, inputDto.body);
  }

  @ApiOperation({ description: 'Contact creation action' })
  @Post()
  create(@Body() inputDto: CreateContactInput) {
    return this.emailService.create(inputDto);
  }

  @ApiOperation({ description: 'Get contacts list' })
  @Get()
  findAll(@Query() filterDto: FilterContactInput) {
    return this.emailService.findAll(filterDto);
  }

  @ApiOperation({ description: 'Get email' })
  @Get(':uuid')
  findOne(@Param('uuid') uuid: UUID) {
    return this.emailService.findOne({ uuid });
  }

  @ApiOperation({ description: 'Contact update' })
  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() inputDto: UpdateContactInput) {
    return this.emailService.update({ uuid }, inputDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: UUID) {
    return this.emailService.remove({ uuid });
  }
}