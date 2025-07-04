import { IsUUID } from 'class-validator';

export class ContractDto {
  //   implements
  //     Pick<
  //       Contract,
  //       | 'id'
  //     >
  @IsUUID()
  id: string;
}
