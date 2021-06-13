import { parse, isValid } from 'date-fns';

export const onlyNumbers = (value: string): string => value.replace(/[^\d]+/g, '');

export const phoneFormat = (value: string): string => {
  const onlyNums = onlyNumbers(value);
  let part1 = onlyNums.substring(0, 2);
  let part2 = '';
  let part3 = '';

  if (onlyNums.length <= 10) {
    part2 = onlyNums.substring(2, 6);
    part3 = onlyNums.substring(6, 10);
  } else {
    part2 = onlyNums.substring(2, 7);
    part3 = onlyNums.substring(7, 11);
  }

  if (part1.length > 0) {
    part1 = `(${part1}`;
  }
  if (part2.length > 0) {
    part2 = `) ${part2}`;
  }
  if (part3.length > 0) {
    part3 = `-${part3}`;
  }

  return part1 + part2 + part3;
};

export const dateFormat = (value: string): string => {
  const onlyNums = onlyNumbers(value);
  const part1 = onlyNums.substring(0, 2);
  let part2 = onlyNums.substring(2, 4);
  let part3 = onlyNums.substring(4, 8);

  if (part2.length > 0) {
    part2 = `/${part2}`;
  }
  if (part3.length > 0) {
    part3 = `/${part3}`;
  }

  return part1 + part2 + part3;
};

export const isValidDate = (value: string): boolean => {
  const parsed = parse(value, 'dd/MM/yyyy', new Date());
  return isValid(parsed);
};

export const convertBlobToFile = (blob: Blob, fileName: string) => {
  const b: any = blob;

  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return <File>blob;
};
