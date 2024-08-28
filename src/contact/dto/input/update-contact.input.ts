import { PartialType } from '@nestjs/swagger';
import { CreateContactInput } from '@weather_wise_backend/src/contact/dto/input/create-contact.input';

export class UpdateContactInput extends PartialType(CreateContactInput) {}
