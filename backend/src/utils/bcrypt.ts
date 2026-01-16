import bcrypt from 'bcrypt'

export const hashValue = (val: string, saltRounds?: number) => bcrypt.hash(val, saltRounds || 10)

export const compareValue = (val: string, hashValue: string) => bcrypt.compare(val, hashValue)