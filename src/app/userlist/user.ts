
export interface User {
  id: number;
  forename: string;
  surname: string;
}

export function sortByUsername(lhs: User, rhs: User) {
  const sortByForename = sortString(lhs.forename, rhs.forename);
  if (sortByForename != 0) {
    return sortByForename;
  }
  return sortString(lhs.surname, rhs.surname);
}

function sortString(lhs: string, rhs: string): number {
  if (lhs > rhs) {
    return 1;
  }
  if (lhs < rhs) {
    return -1;
  }
  return 0;
}

