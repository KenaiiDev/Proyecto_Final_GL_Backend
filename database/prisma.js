import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const prisma = prismaClient.$extends({
  name: "prisma",
  query: {
    $allModels: {
      async create({ args, model }) {
        const data = {
          ...args.data,
          deletedAt: null,
        };

        return prismaClient[model].create({
          ...args,
          data,
        });
      },

      async findMany({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        console.log(args.where);
        return prismaClient[model].findMany(args);
      },

      async findOne({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prismaClient[model].findOne(args);
      },

      async findUnique({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prismaClient[model].findUnique(args);
      },

      async findFirst({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prismaClient[model].findFirst(args);
      },

      async delete({ model, args }) {
        const data = {
          deletedAt: new Date(),
        };
        return prismaClient[model].update({
          ...args,
          data,
        });
      },
    },
  },
});

export default prisma;
