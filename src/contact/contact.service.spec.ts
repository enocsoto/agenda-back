// import { Test, TestingModule } from '@nestjs/testing';
// import { ContactsService } from './contact.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Contacts } from './entities/contacts.entity';
// import { Phones } from './entities/phones.entity';
// import { Addresses } from './entities/addresses.entity';

// describe('ContactsService', () => {
//   let contactsService: ContactsService;

//   const contactRepositoryMock = {
//     create: jest.fn(),
//     save: jest.fn(),
//     findOne: jest.fn(),
//     find: jest.fn(),
//     createQueryBuilder: jest.fn(() => ({
//       leftJoinAndSelect: jest.fn().mockReturnThis(),
//       where: jest.fn().mockReturnThis(),
//       getMany: jest.fn(),
//     })),
//   };

//   const phoneRepositoryMock = {
//     create: jest.fn(),
//     save: jest.fn(),
//   };

//   const addressesRepositoryMock = {
//     create: jest.fn(),
//     save: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ContactsService,
//         {
//           provide: getRepositoryToken(Contacts),
//           useValue: contactRepositoryMock,
//         },
//         {
//           provide: getRepositoryToken(Phones),
//           useValue: phoneRepositoryMock,
//         },
//         {
//           provide: getRepositoryToken(Addresses),
//           useValue: addressesRepositoryMock,
//         },
//       ],
//     }).compile();

//     contactsService = module.get<ContactsService>(ContactsService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('createContact', () => {
//     it('should create a contact with addresses and phones', async () => {
//       const createContactDto = {
//         // mock createContactDto data
//       };

//       const contact = {
//         // mock created contact data
//       };

//       const createdAddress = {
//         // mock created address data
//       };

//       const createdPhone = {
//         // mock created phone data
//       };

//       contactRepositoryMock.create.mockReturnValue(contact);
//       addressesRepositoryMock.create.mockReturnValue(createdAddress);
//       phoneRepositoryMock.create.mockReturnValue(createdPhone);
//       contactRepositoryMock.save.mockResolvedValue(contact);
//       addressesRepositoryMock.save.mockResolvedValue(createdAddress);
//       phoneRepositoryMock.save.mockResolvedValue(createdPhone);

//       const result = await contactsService.createContact(createContactDto);

//       expect(contactRepositoryMock.create).toHaveBeenCalledWith(
//         expect.objectContaining(createContactDto),
//       );
//       expect(addressesRepositoryMock.create).toHaveBeenCalledWith(
//         expect.objectContaining({ contactId: contact.id }),
//       );
//       expect(phoneRepositoryMock.create).toHaveBeenCalledWith(
//         expect.objectContaining({ contactId: contact.id }),
//       );
//       expect(contactRepositoryMock.save).toHaveBeenCalledWith(contact);
//       expect(addressesRepositoryMock.save).toHaveBeenCalledWith(createdAddress);
//       expect(phoneRepositoryMock.save).toHaveBeenCalledWith(createdPhone);
//       expect(result).toEqual(contact);
//     });
//   });

//   describe('getContactByEmail', () => {
//     it('should return a contact by email', async () => {
//       const email = 'test@example.com';
//       const contact = {
//         // mock contact data
//       };

//       contactRepositoryMock.findOne.mockResolvedValue(contact);

//       const result = await contactsService.getContactByEmail(email);

//       expect(contactRepositoryMock.findOne).toHaveBeenCalledWith({
//         where: { email },
//         relations: ['addresses', 'phones', 'documentType'],
//       });
//       expect(result).toEqual(contact);
//     });

//     it('should throw NotFoundException if contact is not found', async () => {
//       const email = 'test@example.com';

//       contactRepositoryMock.findOne.mockResolvedValue(undefined);

//       await expect(contactsService.getContactByEmail(email)).rejects.toThrow(
//         NotFoundException,
//       );
//       expect(contactRepositoryMock.findOne).toHaveBeenCalledWith({
//         where: { email },
//         relations: ['addresses', 'phones', 'documentType'],
//       });
//     });
//   });

//   describe('searchByPersonalData', () => {
//     it('should return contacts matching the search term', async () => {
//       const searchTerm = 'John';
//       const contacts = [
//         // mock contacts data
//       ];

//       contactRepositoryMock.find.mockResolvedValue(contacts);

//       const result = await contactsService.searchByPersonalData(searchTerm);

//       expect(contactRepositoryMock.find).toHaveBeenCalledWith({
//         where: [
//           { firstName: expect.objectContaining({ $like: `%${searchTerm}%` }) },
//           { lastName: expect.objectContaining({ $like: `%${searchTerm}%` }) },
//           {
//             documentNumber: expect.objectContaining({
//               $like: `%${searchTerm}%`,
//             }),
//           },
//         ],
//         relations: ['addresses', 'phones', 'documentType'],
//       });
//       expect(result).toEqual(contacts);
//     });
//   });

//   describe('searchByPhoneNumber', () => {
//     it('should return contacts by phone number', async () => {
//       const phoneNumber = '123456789';
//       const contacts = [
//         // mock contacts data
//       ];

//       const queryBuilderMock = {
//         leftJoinAndSelect: jest.fn().mockReturnThis(),
//         where: jest.fn().mockReturnThis(),
//         getMany: jest.fn().mockResolvedValue(contacts),
//       };

//       contactRepositoryMock.createQueryBuilder.mockReturnValue(
//         queryBuilderMock,
//       );

//       const result = await contactsService.searchByPhoneNumber(phoneNumber);

//       expect(contactRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
//         'contact',
//       );
//       expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
//         'contact.phones',
//         'phone',
//       );
//       expect(queryBuilderMock.where).toHaveBeenCalledWith(
//         'phone.phoneNumber = :phoneNumber',
//         { phoneNumber },
//       );
//       expect(queryBuilderMock.getMany).toHaveBeenCalled();
//       expect(result).toEqual(contacts);
//     });
//   });
// });
