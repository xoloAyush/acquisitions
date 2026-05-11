import logger from '#config/logger.js';
import bcrypt from 'bcrypt';
import {users} from '#models/user.model.js';
import { eq } from 'drizzle-orm';
import {db} from '#config/database.js';

export const hashPassword = async(password) =>{
  try{
    return await bcrypt.hash(password,10);
  }catch(e){
    logger.error(`Error hashing the password: ${e}`);
    throw new Error('Failed to hash password', { cause: e });
  }
};

export const findUserByEmail = async(email) => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  } catch(e) {
    logger.error(`Error finding user by email: ${e}`);
    throw new Error('Database error', { cause: e });
  }
};

export const verifyPassword = async(plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch(e) {
    logger.error(`Error verifying password: ${e}`);
    throw new Error('Failed to verify password', { cause: e });
  }
};

export const createUser = async({ name, email, password, role='user'})=>{
  try{
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if(existingUser.length > 0) throw new Error('User with his email already exists');

    const password_hash = await hashPassword(password);

    const [newUser] = await db.insert(users)
      .values({name, email,password:password_hash,role})
      .returning({ id: users.id, name:users.name, email:users.email, role: users.role, created_at:users.created_at});
    
    return newUser;

  }catch(e){
    logger.error(`Error creating the user: ${e}`);
    throw e;
  }
};
