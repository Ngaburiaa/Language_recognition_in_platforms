import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUser(req, res) {
  const item = await prisma.UserInfo.findMany();
  res.send(item);
}

async function getUserById(req, res) {
  const {
    params: { id },
  } = req;
  const user = await prisma.userInfo.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
}

async function deleteUserById(req, res) {
  const {
    params: { id },
  } = req;
  const user = await prisma.userInfo.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
}

async function postUser(req, res) {
  const {
    UserName,
    password,
    email,
    TextToBeTranslated = "",
    TranslatedText = "",
  } = req.body;
  const user = await prisma.userInfo.create({
    data: {
      UserName,email,password,TranslatedText,TextToBeTranslated,
    },
  });
  res.send(user);
}
async function Login(req, res) {
  const { UserName, password } = req.body;
  try {
    const user = await prisma.userInfo.findUnique({
      where: {
        UserName: UserName,
      },
    });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    if (user.password !== password) {
      res.status(401).send("Incorrect password");
      return;
    }
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Failed to login");
  }
}

async function updateUser(req, res) {
  const {
    params: { id },
    body,
  } = req;
  const user = await prisma.userInfo.update({
    data: { ...body },
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
}

export const controller = {
  getUser,
  getUserById,
  postUser,
  updateUser,
  deleteUserById,
  Login,
};
