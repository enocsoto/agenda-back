import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from './entities/contacts.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { Phones } from './entities/phones.entity';
import { Addresses } from './entities/addresses.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactRepository: Repository<Contacts>,
    @InjectRepository(Phones)
    private readonly phoneRepository: Repository<Phones>,
    @InjectRepository(Addresses)
    private readonly addressesRepository: Repository<Addresses>,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contacts> {
    const {
      firstName,
      lastName,
      documentType,
      documentNumber,
      birthDate,
      email,
      addresses,
      phones,
    } = createContactDto;

    const contact = new Contacts();
    contact.id = 'qqertgscs';
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.documentTypeId = 1;
    contact.documentNumber = documentNumber;
    contact.birthDate = birthDate;
    contact.email = email;

    contact.addresses = await Promise.all(
      addresses.map((addressDto) => {
        return this.addressesRepository.save({
          id: 'uiiss',
          address: addressDto.address,
          city: addressDto.city,
        });
      }),
    );

    contact.phones = await Promise.all(
      phones.map((phoneDto) => {
        return this.phoneRepository.save({
          id: 'uiiss',
          phoneNumber: phoneDto.phoneNumber,
          phoneType: 'fijo',
        });
      }),
    );

    return this.contactRepository.save(contact);
  }

  async getContactByEmail(email: string): Promise<Contacts> {
    const contact = await this.contactRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async searchContactsByPersonalData(searchTerm: string): Promise<Contacts[]> {
    const contacts = await this.contactRepository
      .createQueryBuilder('contact')
      .where('contact.firstName LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orWhere('contact.lastName LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orWhere('contact.documentNumber LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .getMany();

    return contacts;
  }
}
