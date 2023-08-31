import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const prisma = prismaClient.$extends({
  name: "prisma",
  query: {
    $allModels: {
      async findMany({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findMany(args);
      },

      async findOne({ args, query, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findOne(args);
      },

      async findUnique({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findUnique(args);
      },

      async findFirst({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findFirst(args);
      },

      async findUnique({ args, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findUnique(args);
      },

      async delete({ model, args }) {
        const data = {
          deletedAt: new Date(),
        };
        return prisma[model].update({
          ...args,
          data,
        });
      },
    },
  },
});

export default prisma;
