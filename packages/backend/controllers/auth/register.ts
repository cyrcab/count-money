// eslint-disable-next-line
import { User as UserInterface } from '@prisma/client'
import { generatePwd } from '../utils/Pwd'

import { prisma } from '../../libs/prisma'
import { RoleName } from '../../entities/Roles'

const prismaUser = prisma.user

// regex for email validation
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export async function registerUser(data: Partial<UserInterface>) {
  const { email, firstname, lastname, password } = data

  if (!email || !firstname || !lastname || !password) {
    return { status: 400, body: { msg: 'Please enter all fields' } }
  }

  // check if email is valid
  if (!regexEmail.test(email)) {
    return { status: 400, body: { msg: 'Please enter a valid email' } }
  }
  try {
    // check if user already exists
    const user = await prismaUser.findUnique({
      where: {
        email: email,
      },
    })
    if (user) {
      return { status: 400, body: { msg: 'Email already use' } }
    }

    // hash password
    const hashPwd = await generatePwd(password)

    // create new user
    const newUser = await prismaUser.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashPwd,
        role: {
          connect: {
            name: RoleName.USER,
          },
        },
      },
    })
    return {
      status: 201,
      body: {
        user: {
          id: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          roleId: newUser.roleId,
        },
      },
    }
  } catch (err) {
    return { status: 500, body: { msg: 'Server Error' } }
  }
}
