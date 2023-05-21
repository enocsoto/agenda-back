import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Contacts } from './contacts.entity';

@Index('fk_contact_phones', ['contactId'], {})
@Entity('phones', { schema: 'agenda' })
export class Phones {
  @Column('char', {
    primary: true,
    name: 'id',
    length: 36,
    default: () => "'uuid()'",
  })
  id: string;

  @Column('char', { name: 'contact_id', length: 36 })
  contactId: string;

  @Column('varchar', { name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column('enum', { name: 'phone_type', enum: ['fijo', 'celular'] })
  phoneType: string;

  @ManyToOne(() => Contacts, (contacts) => contacts.phones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;
}
