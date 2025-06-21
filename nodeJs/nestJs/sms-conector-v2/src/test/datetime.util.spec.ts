import { DateTimeUtil } from "src/utils/datetime.util";

describe('DateTimeUtil', () => {
  it('should be defined', () => {
    expect(DateTimeUtil).toBeDefined();
  });

  it('Build getDateTime now zero', async () => {
    const obj = new DateTimeUtil();
    const dateTime = await obj.getDateTime(new Date('2023-10-20 11:11:11'));
    expect(dateTime).not.toBeNull();
  });

  it('Build getDateTime with zero', async () => {
    const obj = new DateTimeUtil();
    const dateTime = await obj.getDateTime(new Date('2023-06-06 06:06:06'));
    expect(dateTime).not.toBeNull();
  });

  it('Build getDateTime', async () => {
    const obj = new DateTimeUtil();
    const dateTime = await obj.getDateTime();
    expect(dateTime).not.toBeNull();
  });

});